from rest_framework import serializers, exceptions
from schema.models import JobProfile,GripUser,Company,JobTitle
from datetime import datetime
from django.forms.models import model_to_dict
from schema.utils import get_node_id
class JobProfileSerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False)
    company_id = serializers.IntegerField(required=False)
    title = serializers.CharField(required=False)
    
    def __get_non_null_fields(self,**kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}
    
    def get_response(self):
        return self.response

    def validate(self, data):
        if self.context['method'] == 'POST':
            return self.validate_post(data)
        if self.context['method'] == 'GET':
            return self.validate_get(data)
        if self.context['method'] == 'DELETE':
            return self.validate_delete(data)

    def validate_get(self,data):
        #get company_id from request object
        job_profile_id = data.get('id')
        #get company_id from request object
        company_id = self.context['request'].user.company_id.id
        #check if two parameters are null
        if job_profile_id is None and company_id is None:
            raise exceptions.ValidationError('Atleast one parameter is required')
        #check permissions
        current_user = self.context['request'].user
        #check if job_profile_id is valid
        if job_profile_id is not None:
            if str(job_profile_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid job_profile id')
            #get the job_profile by job_profile_id
            data =JobProfile.objects.filter(id=job_profile_id)
            #check if job_profile_id is valid
            if data.exists() is False:
                raise exceptions.ValidationError('Job profile does not exist')
            
            #check if user is authorized to view the job_profile
            if current_user.company_id.id != data[0].company_id.id:
                raise exceptions.ValidationError('You are not authorized to view this job_profile')
            #get the job_profile by job_profile_id
            data =data.values()
            self.response = {
                "success":True,
                "message":"Job profile data fetched successfully",
                "payload": data
            }
            return {
                "id":job_profile_id,
            }
            
        #check if company_id is valid
        if company_id is not None:
            if str(company_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid company id')
            #check if company_id is valid
            if Company.objects.filter(id=company_id).exists() is False:
                raise exceptions.ValidationError('Company does not exist')
            #get the job_profile by company_id
            data = JobProfile.objects.filter(company_id=company_id)
            #check user permissions
            if not current_user.system_role in ['admin','manager']:
                raise exceptions.ValidationError('You are not authorized to view job profiles')
            #convert queryset to list of dictionaries
            data = [model_to_dict(job_profile) for job_profile in data]
            self.response = {
                "success":True,
                "message":"Job profile data fetched successfully",
                "payload": data
            }
            return {
                "company_id":company_id,
            }
        
    
    def validate_post(self,data):

        #get fields from request object
        title = data.get('title')
        company_id = self.context['request'].user.company_id.id 
        #check if job profile title is valid
        if title is None:
            raise exceptions.ValidationError('Title is required')
            
        #check if company_id exists
        if Company.objects.filter(id=company_id).exists() is False:
            raise exceptions.ValidationError('Company does not exist')
        #check if manager has permission to create job profile for this company
        company = Company.objects.get(id=company_id)   
        #create JobTitle instance
        job_title = JobTitle.nodes.get_or_none(label=title)
        if not job_title:
            job_title = JobTitle(label=title).save()
        #create job_profile_data
        job_profile = JobProfile.objects.create(title=title,company_id=company,job_id=get_node_id(job_title))
        self.response = {
            "success":True,
            "message":"Experience created successfully",
            "payload": model_to_dict(job_profile)
        }
        return {
            "title":title,
            "company_id":company_id,
        }

    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('JobProfile id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid JobProfile id')
        if JobProfile.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('JobProfile does not exist')
        
        # get user ID from request object
        current_user = self.context['request'].user
        #check if manager has permission to delete this JobProfile
        if JobProfile.objects.get(id=id).company_id != current_user.company_id :
            raise exceptions.ValidationError('You are not authorized to delete job profile')
        #get jobproifile instance
        job_profile = JobProfile.objects.get(id=id)
        #check if JobProfile id is valid
        #delete job title
        job_title = JobTitle.nodes.get_or_none(label=job_profile.title)
        if job_title is not None:
            job_title.delete()
        #delete job profile
        JobProfile.objects.filter(id=id).delete()
        self.response = {
            "success":True,
            "message":"JobProfile deleted successfully",
        }
        return {"id":id}