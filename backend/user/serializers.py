
from rest_framework import serializers, exceptions
from schema.models import GripUser,Company,GripFile,Person,Role,JobProfile
from django.forms.models import model_to_dict
from random import choices
from string import ascii_uppercase, digits
from django.core.mail import EmailMessage,send_mail
from django.conf import settings
import logging
from django.core.files.storage import default_storage

class UserSerializer(serializers.Serializer):

    #definte the fields related to the model GripUser
    id = serializers.IntegerField(required=False)
    first_name = serializers.CharField(max_length=20,required=False)
    last_name = serializers.CharField(max_length=20,required=False)
    email = serializers.EmailField(max_length=50,required=False)
    phone = serializers.CharField(max_length=20,required=False)
    location = serializers.CharField(max_length=150,required=False)
    gender = serializers.CharField(max_length=10,required=False)
    department = serializers.CharField(max_length=100,required=False)
    company_id = serializers.CharField(max_length=100,required=False)
    resume = serializers.IntegerField(required=False)
    profile_picture = serializers.IntegerField(required=False)
    system_role = serializers.CharField(max_length=20,required=False)
    
    def __get_non_null_fields(self,**kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}
    
    def get_response(self):
        return self.response

    def validate(self, data):
        
        if self.context['method'] == 'POST':
            return self.validate_post(data)
        if self.context['method'] == 'GET':
            return self.validate_get(data)
        if self.context['method'] == 'PUT':
            return self.validate_put(data)
        if self.context['method'] == 'DELETE':
            return self.validate_delete(data)

    def __create_token(self,user):
        #create token
        pass
    
    def __send_email(self,user,token):
        #send email
        pass
    
    def validate_get(self,data):
        
        id = data.get('id',None)
       
        
        #get current logged in user
        user = self.context['request'].user
        #check if company_id is valid
        if id is None:
            if user.system_role == 'staff':
                data = GripUser.objects.all().order_by('-id').values()
            if user.system_role =='admin':
                data = GripUser.objects.filter(company_id=user.company_id).order_by('-id').values()
            if user.system_role == 'manager':
                #check is user is assigned to role 
                my_role = Role.objects.filter(user_id=user)
                if my_role.exists() is False:
                    raise exceptions.ValidationError('You are not assigned to any role')
                my_role = my_role.first()
                query = f"""
                WITH RECURSIVE chained_users AS (
                SELECT *
                FROM public.schema_role
                WHERE id = {my_role.id}
                UNION
                SELECT t.*
                FROM public.schema_role t
                INNER JOIN chained_users c ON t.parent_role_id = c.id
                )
                SELECT *
                FROM chained_users;
                """
                managed_roles = Role.objects.raw(query)
                ids = []
                
                for role in managed_roles:
                    role = model_to_dict(role)
                    if role['user_id']:
                        ids.append(role['user_id'])
                #remove current logged in user id from ids
                ids.remove(self.context['request'].user.id)
                data = GripUser.objects.filter(id__in=ids).order_by('-id').values()
                
                   
            if user.system_role == 'employee':
                data = GripUser.objects.filter(id=user.id).order_by('-id').values()
        elif str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid company id')
        else:
            #check if user exists
            if GripUser.objects.filter(id=id).exists() is False:
                raise exceptions.ValidationError('User does not exist')    
            #get company data as dict
            if user.system_role == 'staff':
                data = GripUser.objects.filter(id=id).values()
            elif user.system_role in ['admin','manager','employee']:
                data = GripUser.objects.filter(id=id,company_id=user.company_id).values()
            else:
                if user.id != id:
                    raise exceptions.ValidationError('You are not authorized to view this user')
                else:
                    data = GripUser.objects.filter(id=id).values()
        #remove password from data
        for i in range(len(data)):
            data[i].pop('password')
            data[i].pop('is_superuser')
            data[i].pop('is_staff')
            data[i].pop('last_login')
            #get role if exist
            role = Role.objects.filter(user_id_id=data[i]['id'])
            if role.exists():
                role = role.first()
                data[i]['role']= {
                    'id':role.id,
                    'title': role.job_profile_id.title if role.job_profile_id else None,
                    'job_profile_id': role.job_profile_id.id if role.job_profile_id else None,
                    'department': role.department
                }
            else:
                data[i]['role'] = None
            #get profile pic if exist
            if data[i]['profile_picture_id'] is not None:
                profile_pic = GripFile.objects.filter(id=data[i]['profile_picture_id']).first()
                #get url of profile pic
                data[i]['profile_picture'] = {
                    'id': profile_pic.id,
                    "name": profile_pic.name,
                    "url": default_storage.url(f"{profile_pic.path}/{profile_pic.name}")
                }

            else:
                data[i]['profile_picture'] = None
            #get resume if exist
            if data[i]['resume_id'] is not None:
                resume = GripFile.objects.filter(id=data[i]['resume_id']).first()
                #get url of resume
                data[i]['resume'] = {
                    'id': resume.id,
                    "name": resume.name,
                    "url": default_storage.url(f"{resume.path}/{resume.name}")
                }
        #set response data in self.response
        self.response = {
            "success":True,
            "message":"User data fetched successfully",
            "payload": {
                "data": data}
        }
        #return validated data
        return {
            'id': id
        }
    
    def validate_post(self,data):
        #get all fields from data
        first_name = data.get('first_name',None)
        last_name = data.get('last_name',None)
        email = data.get('email',None)
        phone = data.get('phone',None)
        location = data.get('location',None)
        company_id = data.get('company_id',None)
        gender = data.get('gender',None)
        system_role = data.get('system_role',None)
        if first_name is None:
            raise exceptions.ValidationError('First name is required')
        if last_name is None:
            raise exceptions.ValidationError('Last name is required')
        if email is None:
            raise exceptions.ValidationError('Email is required')
        if company_id is None and system_role != 'staff':
            raise exceptions.ValidationError('Company id is required')
        if system_role is None or system_role not in ['employee','manager','admin','staff']:
            raise exceptions.ValidationError('System role is required, must be one of employee,manager,admin,staff')
        #check permissions
        if self.context['request'].user.system_role == 'staff' and not system_role in ['admin','staff']:
            raise exceptions.ValidationError('You are not authorized to create a user')
        if self.context['request'].user.system_role == 'admin' and not system_role in ['employee','manager','admin']:
            raise exceptions.ValidationError('You are not authorized to create a user with this role')
        #check if email already exists
        if GripUser.objects.filter(email=email).exists():
            raise exceptions.ValidationError('User email already exists')
        #get non null fields
        user_data = self.__get_non_null_fields(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            location=location,
            company_id=company_id,
            gender=gender,
            system_role=system_role
        )
        #print(user_data)
        #check if company exists
        if company_id is not None :
            if Company.objects.filter(id=company_id).exists() is False:
                raise exceptions.ValidationError('Company does not exist')
            #check if user has permission to create user for this company
            if self.context['request'].user.system_role == 'admin' :
                if int(self.context['request'].user.company_id.id) != int(company_id):
                    raise exceptions.ValidationError(f'You are not authorized to create a user for this company.')
            user_data["company_id"]= Company.objects.get(id=company_id)
        #genereate random password
        password = ''.join(choices(ascii_uppercase + digits, k=8))
        #create pearson
        person_id = Person(name = first_name+" "+last_name,company_id=str(company_id))
        person_id.save()
        user_data["person_id"]= self.get_node_id(person_id)
        #create new company
        if system_role == 'admin':
            new_user = GripUser.objects.create_admin(password=password,**user_data)
        elif system_role == 'manager':
            new_user = GripUser.objects.create_manager(password=password,**user_data)
        elif system_role == 'staff':
            new_user = GripUser.objects.create_staff(password=password,**user_data)
        else: 
            new_user = GripUser.objects.create_user(password=password,**user_data)
        new_user= model_to_dict(new_user)
        del [new_user['password']]
        
        try:
            #send email to user with password
            send_mail(
                'Login details for Adepti',
                """We would like to invite you to access Adepti. Please find below your login details for the platform. You can click on the link provided to access the login page, where you can create a new password using your email address.
                Login details:
                Login link: https://adepti.gen-tech.io/login
                Email: {}
                Password: {}
                We hope you enjoy using Adepti!
                Your colleagues from HR
                """.format(email,password),
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            self.response = {
            "success":True,
            "message":"User created successfully",
            "payload": new_user
            }
        except Exception as e:
            #delete user if email fails
            GripUser.objects.filter(id=new_user['id']).delete()
            logging.error(e)
            self.response = {
                "success":False,
                "message":"Error creating user, please try again later",
            }
        #return data
        return user_data
        
    def validate_put(self,data):

        #get all fields from data
        id = self.context['request'].user.id 
        first_name = data.get('first_name',None)
        last_name = data.get('last_name',None)
        phone = data.get('phone',None)
        location = data.get('location',None)
        gender = data.get('gender',None)
        resume = data.get('resume',None)
        profile_picture = data.get('profile_picture',None)
        
      
        #check if profile picture exists and valid
        if profile_picture is not None:
            if not GripFile.objects.filter(id=profile_picture).exists():
                raise exceptions.ValidationError('Profile picture does not exists')
            elif GripFile.objects.get(id=profile_picture).file_type != 'image':
                raise exceptions.ValidationError('Profile picture is not an image')
            elif GripFile.objects.get(id=profile_picture).user_id == self.context['request'].user.id:
                raise exceptions.ValidationError('Profile picture is owned by you')
        #check if resume exists and valid
        if resume is not None:
            if not GripFile.objects.filter(id=resume).exists():
                raise exceptions.ValidationError('Resume does not exists')
            elif GripFile.objects.get(id=resume).file_type != 'image':
                raise exceptions.ValidationError('Resume is not an image')
            elif GripFile.objects.get(id=resume).user_id != self.context['request'].user.id:
                raise exceptions.ValidationError('Resume is not owned by you')
            
        #get non null fields
        user_data = self.__get_non_null_fields(
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            location=location,
            gender=gender,
            resume=resume,
            profile_picture=profile_picture,
        )
        #update user
        if not GripUser.objects.filter(id=id).update(**user_data):
            raise exceptions.ValidationError('Error updating User')
        
        user =  model_to_dict(GripUser.objects.get(id=id))
        del [user['password']]
        #store response in self.response
        self.response = {
            "success":True,
            "message":"User updated successfully",
            "payload": user
        }
        #return data
        return user_data
        
    def validate_delete(self,data):
        #check id field 
        id = data.get('id')
        if id is None:
            raise exceptions.ValidationError('ID is required')
        #check if name already exists
        if not GripUser.objects.filter(id=id).exists():
            raise exceptions.ValidationError('User does not exist')
        #get user
        user = GripUser.objects.get(id=id)
        #check permission
  
        if self.context['request'].user.system_role=="admin" and self.context['request'].user.company_id.id != user.company_id.id:
            raise exceptions.ValidationError('You are not authorized to delete a company for this company')
        #delete company
        GripUser.objects.filter(id=id).delete()
        #store response in self.response
        self.response = {
            "success":True,
            "message":"User deleted successfully",
        }
        #return data
        return {
            'id': id,
        }
    
    def get_node_id(self,node):
        #split element_id 
        return node.element_id.split(":")[-1]
  