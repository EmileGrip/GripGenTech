from rest_framework import serializers, exceptions
from schema.models import Experience
from schema.models import Company
from schema.models import GripUser
from datetime import datetime
from django.forms.models import model_to_dict

class ExperienceSerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False)
    company = serializers.CharField(required=False,max_length=50)
    title = serializers.CharField(required=False,max_length=50)
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    description = serializers.CharField(required=False,max_length=500)
    is_current = serializers.BooleanField(required=False)
    user_id = serializers.IntegerField(required=False)

    
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
        #get experience_id from request object
        experience_id = data.get('id')
        # get user ID from request object
        user_id = data.get('user_id',self.context['request'].user.id)

        #get user 
        user = GripUser.objects.filter(id=user_id)
        #check if the user exists
        if user.exists() is False:
            raise exceptions.ValidationError('User does not exist')
        user = user.first()
        
        #check if user in the same company
        if user.company_id.id != self.context['request'].user.company_id.id:
            raise exceptions.ValidationError('You do not have permission to access this data')
        #check permissions
        if experience_id is not None: 
            if str(experience_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid experience id')
            data = Experience.objects.filter(id=experience_id).values()
            #check if experience_id is valid
            if len(data) == 0:
                raise exceptions.ValidationError('Experience does not exist')
            # check if user owns the experience
            if self.context['request'].user.system_role == 'employee' and data[0]['user_id']["id"] != user_id:
                raise exceptions.ValidationError('You are not authorized to view this experience')
        else:
            data = Experience.objects.filter(user_id=user_id).all().values()
        #check if experience is current
        for experience in data:
            if experience['is_current'] is True:
                experience['end_date'] = None
        #set response data in self.response
        self.response = {
            "success":True,
            "message":"Experience data fetched successfully",
            "payload": data
        }

        return data
    
    def validate_post(self,data):

        #get fields from request object
        user_id = self.context['request'].user.id
        title = data.get('title')
        description = data.get('description')
        company = data.get('company')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        is_current = data.get('is_current')
        
        #check if title is valid
        if title is None:
            raise exceptions.ValidationError('Title is required')
        
        #check if company is valid
        if company is None:
            raise exceptions.ValidationError('Company is required')

        #check if start_date is valid
        if start_date is None:
            raise exceptions.ValidationError('Start date is required')
        
        if start_date > datetime.today().date():
            raise exceptions.ValidationError("Start date cannot be in the future")
        
        #check if is_current is valid
        if is_current is None:
            raise exceptions.ValidationError('Is current field is required')
        
        if is_current is True:
            end_date = None
        else:
            #check if end_date is valid
            if end_date is None:
                raise exceptions.ValidationError('End date is required')

            if end_date > datetime.today().date():
                raise exceptions.ValidationError("End date cannot be in the future")

            if end_date < start_date:
                raise exceptions.ValidationError("End date cannot be before start date")
        
        #get non null fields
        experience_data = self.__get_non_null_fields(
            title=title,
            description=description,
            company=company,
            start_date=start_date,
            end_date=end_date,
            is_current=is_current,
            user_id=user_id,
            company_id=self.context['request'].user.company_id
        )
        #get user instance
        experience_data["user_id"] = self.context['request'].user
        #create experience
        experience = Experience.objects.create(**experience_data)
        #save experience
        #experience.save()
        self.response = {
            "success":True,
            "message":"Experience created successfully",
            "payload": model_to_dict(experience)
        }
        return experience_data

    def validate_put(self,data):
        #get fields from request object
        id = data.get('id')
        title = data.get('title')
        description = data.get('description')
        company = data.get('company')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        is_current = data.get('is_current')
        
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('Experience id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid experience id')

        # get user ID from request object
        user_id = self.context['request'].user.id
        #get the experience by user_id and experience_id
        experience = Experience.objects.filter(id=id)
        #check if experience_id is valid
        if experience.exists() is False:
            raise exceptions.ValidationError('Experience does not exist')
        # check if user owns the experience
        if experience[0].user_id.id != user_id:
            raise exceptions.ValidationError('You are not authorized to update this experience')
        
        experience = experience[0]
        #check if title is valid

        if title is not None:
            experience.title = title

        #check if description is valid
        
        if description is not None:
            if len(description) > 1000 and len(description) < 3:
                raise exceptions.ValidationError('Description must be between 3 and 1000 characters')
            experience.description = description

        #check if company is valid
        
        if company is not None:
            experience.company = company

        #check if start_date is valid
        
        if start_date is not None:
            if start_date > datetime.today().date():
                raise exceptions.ValidationError("Start date cannot be in the future")
            if (end_date is None) and (experience.end_date is not None) and (start_date > experience.end_date):
                raise exceptions.ValidationError("Start date cannot be after end date")
            if (end_date is not None) and (start_date > end_date):
                raise exceptions.ValidationError("Start date cannot be after end date")
            experience.start_date = start_date
        #check if is_current is valid
        
        if is_current is not None:
            #check if is_current is true
            if is_current is True:
                #check if end_date is set
                if end_date is not None:
                    raise exceptions.ValidationError("End date cannot be set if is_current is true")
                #set end_date to null
                experience.end_date = None
            experience.is_current = is_current
        
        #check if end_date is valid
        
        if end_date is not None and is_current is False:
            if end_date > datetime.today().date():
                raise exceptions.ValidationError("End date cannot be in the future")
            if end_date < experience.start_date:
                raise exceptions.ValidationError("End date cannot be before start date")
            if is_current is True:
                raise exceptions.ValidationError("End date cannot be set if is_current is true")
            experience.end_date = end_date

        #get non null fields
        experience_data = self.__get_non_null_fields(
            title=experience.title,
            description=experience.description,
            company=experience.company,
            start_date=experience.start_date,
            end_date=experience.end_date,
            is_current=experience.is_current,
            user_id=experience.user_id
        )
        #save experience
        experience.save()
        self.response = {
            "success":True,
            "message":"Experience updated successfully",
            "payload": model_to_dict(experience)
        }
        return experience_data
        
    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('Experience id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid experience id')
        if Experience.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('Experience does not exist')
        
        # get user ID from request object
        user_id = self.context['request'].user.id
        #get the experience experience_id
        experience = Experience.objects.filter(id=id)

        # check if user owns the experience
        if experience.exists() is False:
            raise exceptions.ValidationError('You are not authorized to delete this experience')
        #check if user owns the experience
        if experience[0].user_id.id != user_id:
            raise exceptions.ValidationError('You are not authorized to delete this experience')
        #check if experience_id is valid
        #delete experience
        experience.delete()
        self.response = {
            "success":True,
            "message":"Experience deleted successfully",
        }
        return {"id":id}