from rest_framework import serializers, exceptions
from schema.models import JobProfile,GripUser,Company,Role,JobTitle,CareerJob,SkillProficiency,SkillRequirement,GripFile
from datetime import datetime
from django.forms.models import model_to_dict
import os
from django.core.files.storage import default_storage

class GetSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    def get_response(self):
        return self.response
    def validate(self,data):
        id = data.get('id')
        #get gripfile with this id
        file = GripFile.objects.filter(id=id)
        if not file.exists():
            raise exceptions.ValidationError('File does not exist')
        else:
            file = file.first()
        #check if user has access to this file
        user_id = self.context['request'].user.id
        if file.user.id != user_id:
            raise exceptions.ValidationError('You do not have access to this file')
        full_path = os.path.join(file.path,file.name)
        if not default_storage.exists(full_path):
            raise exceptions.ValidationError('File does not exist')
        file_url = default_storage.url(full_path)
        self.response = {
            "success":True,
            "message":"File data fetched successfully",
            "payload":{
                "file_url":file_url
            }
        }
        return {'id':id}
    
class PostSerializer(serializers.Serializer):
    use_as = serializers.ChoiceField(choices=['profile_pic','resume','logo'],required=False)
    def validate(self,data):
        id = data.get('id')
        use_as = data.get('use_as',None)
        file_obj = self.context['request'].FILES.get('file',None)
        #check if file is valid
        if not file_obj:
            raise exceptions.ValidationError('File is required')
        # do your validation here e.g. file size/type check
        if file_obj.size > 1024*1024*4:
            raise exceptions.ValidationError('File too large')
        
        extention = str(file_obj.name.split('.')[-1]).lower()
        if extention not in ['pdf','doc','docx','png','jpg','jpeg']:
            raise exceptions.ValidationError('Invalid file type')
        # organize a path for the file in bucket
        if extention in ['pdf','doc','docx']:
            file_directory_within_bucket = 'resumes'
        if extention in ['png','jpg','jpeg']:
            file_directory_within_bucket = 'images'

        if use_as in ['profile_pic','logo'] and file_directory_within_bucket == 'resumes':
            raise exceptions.ValidationError('This file cannot be used as profile picture')
        if use_as == 'resume' and file_directory_within_bucket == 'images':
            raise exceptions.ValidationError('This file cannot be used as resume')
        
        file_directory_within_bucket = os.path.join(
            "uploads",
            str(self.context['request'].user.id),
            file_directory_within_bucket,
            datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        )
        full_path = os.path.join(file_directory_within_bucket,file_obj.name)
        #upload file to bucket
        default_storage.save(full_path, file_obj)
        #get file url
        file_url = default_storage.url(full_path)
        #add file to db 
        file = GripFile.objects.create(
            name=file_obj.name,
            path=file_directory_within_bucket,
            type=extention,
            user=self.context['request'].user
        )
        #check use as profile_pic or resume
        if use_as == 'profile_pic':
            user = GripUser.objects.get(id=self.context['request'].user.id)
            user.profile_picture = file
            user.save()
        if use_as == 'resume':
            user = GripUser.objects.get(id=self.context['request'].user.id)            
            user.resume = file
            user.save()
        if use_as == 'logo':
            company = Company.objects.get(id = self.context['request'].user.company_id.id)
            company.logo = file
            company.save()
        file_obj = model_to_dict(file)
        file_obj['file_url'] = file_url
        # save response
        self.response = {
            "success":True,
            "message":"File uploaded successfully",
            "payload":file_obj
        }
        
        return {}
    def get_response(self):
        return self.response
    
class DeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    def get_response(self):
        return self.response
    def validate(self,data):
        id = data.get('id')
        #get gripfile with this id
        file = GripFile.objects.filter(id=id)
        if not file.exists():
            raise exceptions.ValidationError('File with this id does not exist')
        else:
            file = file.first()
        #check if user has access to this file
        user_id = self.context['request'].user.id
        if file.user.id != user_id:
            raise exceptions.ValidationError('You do not have access to this file')
        
        if not default_storage.exists(f"{file.path}/{file.name}"):
            raise exceptions.ValidationError('File does not exist')
        default_storage.delete(file.path)
        file.delete()
        self.response = {
            "success":True,
            "message":"File deleted successfully",
       
        }
        return {'id':id}