from rest_framework import serializers, exceptions
from schema.models import JobProfile,GripUser,Company,Role,JobTitle,Person,CareerJob,CareerLink,SkillRequirement
from datetime import datetime
from django.forms.models import model_to_dict
from neomodel import db
from role.fuzzy_matching import get_best_matched_occupation
from django.core.files.storage import default_storage

class RoleSerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False,allow_null=True)
    company_id = serializers.IntegerField(required=False,allow_null=True)
    job_profile_id = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    user_id = serializers.IntegerField(required=False,allow_null=True)
    department = serializers.CharField(required=False,allow_blank=True,allow_null=True,max_length=50)
    title = serializers.CharField(required=False,allow_blank=True,allow_null=True,max_length=50)
    parent_role_id = serializers.IntegerField(required=False,allow_null=True)
    selected_role_id = serializers.IntegerField(required=False,allow_null=True)
    position = serializers.ChoiceField(choices=["bottom","left","right"],required=False,allow_null=True)
    reset = serializers.ChoiceField(choices=["all","user","job"],required=False,allow_null=True)
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

    def validate_get(self,data):
        #get company_id from request object
        company_id = self.context['request'].user.company_id.id
        id = data.get('id')
        
        if id is not None:
            if str(id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid role id')
            if Role.objects.filter(id=id).exists() is False:
                raise exceptions.ValidationError('Role does not exist')
            data = Role.objects.filter(id=id).first()
        else:
            #get all poisitions for this company
            data = Role.objects.filter(company_id=company_id)
        #convert to list of dicts
        returnData = data.values('id','department','title','parent_role', 'selected_role_id','allign')
        parent_role_ids = []
        for i in range(len(returnData)):
            parent_role_ids.append(returnData[i]['parent_role'])
            if data[i].user_id is not None:
                returnData[i]['user'] = {key:data[i].user_id.__getattribute__(key) for key in ['id','first_name','last_name','email','phone','created_at','location','system_role','profile_picture','gender']}
            else:
                returnData[i]['user'] = None
            if data[i].job_profile_id is not None:
                returnData[i]['job_profile'] = {key:data[i].job_profile_id.__getattribute__(key) for key in ['id','title']}
            else:
                returnData[i]['job_profile'] = None

        for i in range (len(returnData)):
            #get image url if profile_picture is not null
            if returnData[i]['user'] is not None:
                if returnData[i]['user']['profile_picture'] is not None:
                    profile_pic = returnData[i]['user']['profile_picture']
                    #get url of profile pic
                    returnData[i]['user']['profile_picture'] = default_storage.url(f"{profile_pic.path}/{profile_pic.name}")
                
        returnData = list(returnData) 
        sorted_returnData = []
        parent_role_ids = list(set(parent_role_ids))
        if None in parent_role_ids:
            parent_role_ids.remove(None)
            parent_role_ids.append(0)
        parent_role_ids.sort()
        
        #filter all roles that has none parent role
        for parent_id in parent_role_ids:
            n_lst = []
            if parent_id == 0:
                comp = None
            else:
                comp  = parent_id
            #get all returnData with parent role == comp
            level_roles = list(filter(lambda x: x['parent_role'] == comp,returnData))
            #find the parent role with allignment[position]= bottom
            for i in range(len(level_roles)):
                if level_roles[i]['allign'] == "bottom":
                    n_lst.append(level_roles[i])
                    continue
            for i in range(len(level_roles)):
                if len(n_lst) == len(level_roles):
                    break
                for i in range(len(level_roles)):
                    if level_roles[i] in n_lst:
                        continue
                    if level_roles[i]['selected_role_id'] in [p['id'] for p in n_lst]:
                        #get index for selected role
                        e = list(filter(lambda x: x["id"] == level_roles[i]['selected_role_id'],n_lst))
                        index = n_lst.index(e[0])
                        #if position is left, insert before selected role, else insert after selected role
                        if level_roles[i]['allign'] == "left":
                            n_lst.insert(index,level_roles[i])
                            continue
                        if level_roles[i]['allign'] == "right":
                            n_lst.insert(index+1,level_roles[i])
                            continue
          
        
            sorted_returnData.extend(n_lst)
        
        for node in range(len(sorted_returnData)):
            if sorted_returnData[node]['parent_role'] == 0:
                sorted_returnData[node]['parent_role'] = None
                
                
        returnData = sorted_returnData

        edges = []
        for i in range(len(returnData)):
            if not returnData[i]["parent_role"]is None:
                edges.append({
                    "id": f"{returnData[i]['parent_role']}-{returnData[i]['id']}",
                    "source":returnData[i]["parent_role"],
                    "target":returnData[i]['id']
                })
            else:
                if len(returnData) == 1:
                    edges.append({
                        "id": f"{returnData[i]['id']}-{returnData[i]['id']}",
                        "source":returnData[i]['id'],
                        "target":"0"
                    })

        
        self.response = {
            "success":True,
            "message":"Role data fetched successfully",
            "payload": {
                "roles":returnData,
                "edges":edges
                        }
        }
        return {
            "company_id":company_id,
        }
         
        
    
    def validate_post(self,data):

        #get fields from request object
        user_id = data.get('user_id')
        company_id = self.context['request'].user.company_id.id
        department = data.get('department')
        title = data.get('title')
        parent_role_id = data.get('parent_role_id')
        selected_role_id = data.get('selected_role_id')
        position = data.get('position')
        #check if user_id is valid
        if user_id is not None:
            if str(user_id ).isnumeric() is False:
                raise exceptions.ValidationError('Invalid user_id ')
            #check if job_profile_id is valid
            if GripUser.objects.filter(id=user_id ).exists() is False:
                raise exceptions.ValidationError('user does not exist')

        #check if parent_role_id is valid
        if parent_role_id is not None:
            if str(parent_role_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid parent_role_id')
            #check if job_profile_id is valid
            if Role.objects.filter(id=parent_role_id).exists() is False:
                raise exceptions.ValidationError('parent role does not exist')
            #check if parent role is in the same company
            if Role.objects.get(id=parent_role_id).company_id.id != company_id:
                raise exceptions.ValidationError('parent role is not in the same company')
        
        #get company instance
        company_id = Company.objects.get(id=company_id)
        if title is not None:
            #check if job profile with the same title exists
            if JobProfile.objects.filter(title=title,company_id=company_id).exists():
                job_profile_id = JobProfile.objects.filter(title=title,company_id=company_id).first()
            else:
                #create JobTitle instance
                job_title = JobTitle(label=title,company_id=company_id.id)
                job_title.save()
                #create job_profile_data
                job_profile_id = JobProfile.objects.create(title=title,company_id=company_id,job_id=self.get_node_id(job_title))
                #connect to the best match for job title
                occupation = get_best_matched_occupation(job_title.label)
                if occupation is not None:
                    #generate similar to relationship between jobtitle and occupation
                    job_title.SimilarTo.connect(occupation)
                #add relationship between person and job title
                person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {self.context["request"].user.person_id} RETURN s', None, resolve_objects=True)
                person = person[0][0]
                person.HasJob.connect(job_title)
                
        else:
            job_profile_id = None
        if user_id is not None:
            #get user instance
            user_id = GripUser.objects.get(id=user_id)
            #check if user id is staff 
            if user_id.system_role == 'staff':
                raise exceptions.ValidationError('User is staff, cannot be assigned')
            if user_id.company_id is None:
                raise exceptions.ValidationError('User does not belong to any company')
            #check if user id is in the same company
            if user_id.company_id.id != company_id.id:
                raise exceptions.ValidationError('User is not in the same company')
            #check if user is assigned to another role
            if Role.objects.filter(user_id=user_id,company_id=company_id).exists():
                alt_role = Role.objects.filter(user_id=user_id,company_id=company_id).first()
                if alt_role.user_id is not None and alt_role.job_profile_id is not None:
                    #get user person from cypher query
                    person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {user_id.person_id} RETURN s', None, resolve_objects=True)
                    person = person[0][0]
                    person.HasJob.disconnect_all()
                alt_role.user_id = None
                alt_role.save()
        
        #check seleceted role id
        if selected_role_id is not None:
            #check if selected role id is valid
            if str(selected_role_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid selected role id')
            #check if selected role id is in the same company
            if Role.objects.filter(id=selected_role_id).exists() is False:
                raise exceptions.ValidationError('selected role does not exist')
            #check if selected role is in the same company
            if Role.objects.get(id=selected_role_id).company_id.id != company_id.id:
                raise exceptions.ValidationError('selected role is not in the same company')
        else:
            raise exceptions.ValidationError('Please select a role')
        
        #check position
        if position is None:
            raise exceptions.ValidationError('Please select a position')

            
        #get non null fields
        fields = self.__get_non_null_fields(
            user_id = user_id,
            company_id = company_id,
            job_profile_id = job_profile_id,
            department = department,
            title = title,
            parent_role_id = parent_role_id,
            allign= position,
            selected_role_id=selected_role_id
        )
        
        #create position
        role = Role.objects.create(**fields)
        #update first node in career job with new values for the user
        if role.user_id != None and role.job_profile_id != None:
            #check if career job exitst with previous role = []
            job =  CareerJob.objects.filter(user_id=role.user_id,previous_jobs__isnull=True)
            if job.exists():
                #change job profile id with new one
                job.first().job_profile_id = job_profile_id
                job.first().save()
            else:
                #create new career job
                CareerJob.objects.create(user_id=role.user_id,job_profile_id=role.job_profile_id)
        self.response = {
            "success":True,
            "message":"position created successfully",
            "payload": model_to_dict(role)
        }
        return {
            "company_id":company_id.id,
            "department":department,
            "title":title,
        }

    def validate_put(self,data):
        #get fields from request object
        user_id = data.get('user_id')
        id = data.get('id')
        department = data.get('department')
        title = data.get('title')
        reset = data.get('reset')

        company_id = Company.objects.get(id=self.context['request'].user.company_id.id)
        #check if two parameters are null
        if  id is None:
            raise exceptions.ValidationError('role id is required')
        if Role.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('role does not exist')
        #get role instance
        role = Role.objects.get(id=id)

        if reset is not None:
            if role.user_id is not None:
                    #get user person from cypher query
                    person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
                    person = person[0][0]
                    person.HasJob.disconnect_all()
            if reset == 'all':
                role.user_id = None
                role.job_profile_id = None
                role.department = None
                role.title = None
            if reset== 'user':
                role.user_id = None
            if reset == 'job':
                role.job_profile_id = None
                role.department= None
                role.title = None
            role.save()
            self.response = {
                "success":True,
                "message":"role reset successfully",
                "payload": model_to_dict(role)
            }
            return {
                "reset" : reset
            }
        if user_id is not None:
            #check if user_id is valid
            if str(user_id ).isnumeric() is False:
                raise exceptions.ValidationError('Invalid user_id ')
            #check if job_profile_id is valid
            if GripUser.objects.filter(id=user_id ).exists() is False:
                raise exceptions.ValidationError('user does not exist')
            #get user instance
            user_id = GripUser.objects.get(id=user_id)
            #check if user id is staff 
            if user_id.system_role == 'staff':
                raise exceptions.ValidationError('User is staff, cannot be assigned')
            #check if user id is in the same company
            if user_id.company_id.id != role.company_id.id:
                raise exceptions.ValidationError('User is not in the same company')
            #check if user is assigned to another role
            if Role.objects.filter(user_id=user_id,company_id=company_id).exists():
                alt_role = Role.objects.filter(user_id=user_id,company_id=company_id).first()
                if alt_role.user_id is not None and alt_role.job_profile_id is not None:
                    #get user person from cypher query
                    person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {alt_role.user_id.person_id} RETURN s', None, resolve_objects=True)
                    person = person[0][0]
                    person.HasJob.disconnect_all()
                alt_role.user_id = None
                alt_role.save()
            
            if role.user_id is not None:
                #get old person instance
                old_person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
                old_person = old_person[0][0]
                #remove relationship between person and job title
                old_person.HasJob.disconnect_all()
            
        
        if title is not None:
            #check if job profile with the same title exists
            if JobProfile.objects.filter(title=title,company_id=company_id).exists():
                job_profile_id = JobProfile.objects.get(title=title,company_id=company_id)
            else:
                #create JobTitle instance
                job_title = JobTitle.get_or_create({"label":title,"company_id":company_id.id})[0]
                #job_title=JobTitle.get_or_create(title=title)
                #job_title.save()
                #create job_profile_data
                job_profile_id = JobProfile.objects.create(title=title,company_id=company_id,job_id=self.get_node_id(job_title))
                #connect to the best match for job title
                occupation = get_best_matched_occupation(job_title.label)
                if occupation is not None:
                    #generate similar to relationship between jobtitle and occupation
                    job_title.SimilarTo.connect(occupation)
                    
            if role.user_id is not None:
                #get old person instance
                old_person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
                old_person = old_person[0][0]
                #remove relationship between person and job title
                old_person.HasJob.disconnect_all()
        else:
            job_profile_id = role.job_profile_id
        #get non null fields
        role_data = self.__get_non_null_fields(
            user_id=user_id,
            department=department,
            title=title,
            job_profile_id=job_profile_id
        )
        #update role
        if user_id is not None:
            role.user_id = user_id
            role.save()
        if job_profile_id is not None:
            role.job_profile_id = job_profile_id
            role.save()
        
        if department is not None:
            role.department = department
            role.save()

        if title is not None:
            role.title = title
            role.save()
        role = Role.objects.get(id=id)
        #update person relationship with job title
        #get current person
        if role.user_id is not None and role.job_profile_id is not None:
            person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
            person = person[0][0]
            #get job title instance
            job_title,_ = db.cypher_query(f'MATCH (s:JobTitle) WHERE ID(s) = {role.job_profile_id.job_id} RETURN s', None, resolve_objects=True)
            job_title = job_title[0][0]
            #add relationship between person and job title
            if not person.HasJob.is_connected(job_title):
                person.HasJob.connect(job_title)
            #update first node in career job with new values for the user
            if  role.job_profile_id != None:
                #check if career job exitst with previous role = []
                job =  CareerJob.objects.filter(user_id=role.user_id,job_profile_id=role.job_profile_id)
                if job.exists():
                    #change job profile id with new one
                    job.first().job_profile_id = job_profile_id
                    job.first().save()
                else:
                    #create new career job
                    CareerJob.objects.create(user_id=role.user_id,job_profile_id=role.job_profile_id)
        self.response = {
            "success":True,
            "message":"position created successfully",
            "payload": model_to_dict(role)
        }
        return {
            "id":id,
        }
    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('Role id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid role id')
        if Role.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('Role does not exist')
        
        # get user ID from request object
        current_user = self.context['request'].user
        #get job profile
        role = Role.objects.get(id=id)
        #check if job profile is in the same company
        if role.company_id.id != current_user.company_id.id:
            raise exceptions.ValidationError('You are not authorized to delete position')
        #remove relation if user_id and job_profile_id is not none
        if role.user_id != None and role.job_profile_id != None:
            #get person 
            person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
            person = person[0][0]
            #remove relationship between person and job title
            person.HasJob.disconnect_all()
            #update first node in career job with new values for the user
            #check if career job exitst with previous role = []
            job =  CareerJob.objects.filter(user_id=role.user_id,job_profile_id=role.job_profile_id,previous_jobs__isnull=True)
            if job.exists():
                #change job profile id with new one
                job.first().job_profile_id = None
                job.first().save()
            else:
                #create new career job
                CareerJob.objects.create(user_id=role.user_id)
        #check if there any role that has this id as parent_role_id
        if role.user_id is not None and role.job_profile_id is not None:
            person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {role.user_id.person_id} RETURN s', None, resolve_objects=True)
            person = person[0][0]
            person.HasJob.disconnect_all()
        if Role.objects.filter(parent_role=role).exists():
            role.user_id = None
            role.job_profile_id = None
            role.title = None
            role.department = None
            role.save()
        else:
            #get selected role 
            selected_roles = Role.objects.filter(selected_role_id=role.id)
            if len(selected_roles) != 0:
                if role.allign != "bottom":
                    for selected_role in selected_roles:
                        if selected_role.allign in ["left","right"]:
                            selected_role.selected_role_id = role.selected_role_id
                            selected_role.allign = role.allign
                            selected_role.save()
                else:
                    root = selected_roles.first()
                    root.selected_role_id = role.parent_role.id
                    root.allign = "bottom"
                    root.save()
                    for selected_role in selected_roles:
                        if selected_role.allign in ["left","right"]:
                            selected_role.selected_role_id = root.id
                            selected_role.allign = role.allign
                            selected_role.save()
                
            #delete role
            role.delete()
        self.response = {
            "success":True,
            "message":"Role deleted successfully",
        }
        return {"id":id}
    
    def get_node_id(self,node):
        #split element_id 
        return node.element_id.split(":")[-1]
  