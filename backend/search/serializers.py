from rest_framework import serializers, exceptions
from schema.models import Company,GripUser,Skill,Role,JobProfile
from datetime import datetime
from django.forms.models import model_to_dict
from xml.etree import ElementTree as ET

''''
user ( by name ) limit : superadmin, managers, admins
skill ( by name ) any authenticated user 
job profile ( by name ) any authenticated user (same company id)
role ( by name ) for admins, superadmin

'''
class SearchSerializer(serializers.Serializer):
    
    #define the fields related to the model Search
    key = serializers.CharField(required=True)
    value = serializers.CharField(required=True,max_length=100)
    
    def __get_non_null_fields(self,**kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}
    
    def get_response(self):
        return self.response

    def validate(self, data):
        return self.validate_post(data)     
    
    def validate_post(self,data):

        #get fields from request object
        search_key = data.get('key').lower()
        value = data.get('value')
        
        if not search_key:
           raise exceptions.ValidationError('Search key is required')
        
        if not search_key in ["user","job_profile","skill","role"]:
            raise exceptions.ValidationError('Search key shoud be one of the following : [user,job_profile,skill,role]')

        if not value : 
            self.response = {
                "success":True,
                "message":"Experience data fetched successfully",
                "payload": []
            }
            return {
                "key":search_key,
                "value":""
            }

        if search_key == "user":

            self.search_user(value)
        elif search_key == "skill":
            self.search_skill(value)
        elif search_key == "role":
            self.search_role(value)
        else:
            self.search_jobprofile(value)
        
        return {
                "key":search_key,
                "value":value
            }

    def search_user(self,name):
        #check permissions 
        current_user =  self.context['request'].user
        if not (current_user.system_role == 'staff' or current_user.system_role == 'admin'):
            raise exceptions.ValidationError('You are not authorized to perform this action')
        #split search value to firstname and lastname
        name = name.split(" ")
        firstname = name[0]
        lastname = None
        if len(name) > 1:
            lastname = name[1]
        userdata  = self.__get_non_null_fields(
            first_name= firstname,
            last_name= lastname
        )
        if not current_user.system_role == 'staff':
            userdata["company_id"] = current_user.company_id.id
            
        #add _contains to each field 
        userdata = {k+"__contains":v for k,v in userdata.items()}
        #get users with firstname and lastname
        users = GripUser.objects.filter(**userdata).values('id','first_name','last_name')
        #add results to reponse 
        self.response = {
                "success":True,
                "message":"Users data fetched successfully",
                "payload": users[:10]
            }
        
    def search_skill(self,name):

        #get users with firstname and lastname
        skills = list(Skill.nodes.filter(preferredLabel__contains=name).all())
        #covnert filter results to list of dicts
        ret_skills = []
        for skill in skills:
            index = str(skill.preferredLabel).find(name)
            if index>=0:
                #add skill to the top of ret_skills list
                ret_skills.append({
                    "id":self.get_node_id(skill),
                    "name":skill.preferredLabel,
                    "index":index
                })
        #sort by index
        ret_skills = sorted(ret_skills, key=lambda k: k["index"])
        #remove index from each skill
        for i in range(len(ret_skills)):
            del ret_skills[i]["index"]                
        #add results to reponse 
        self.response = {
                "success":True,
                "message":"Skills data fetched successfully",
                "payload": ret_skills[:10]
            }

    def search_role(self,name):
        #check permissions 
        current_user =  self.context['request'].user
        if not (current_user.system_role == 'staff' or current_user.system_role == 'admin'):
            raise exceptions.ValidationError('You are not authorized to perform this action')
        role_data = {
            "title__contains":name
        }
        if not current_user.system_role == 'staff':
            role_data["company_id"] = current_user.company_id.id
        #get users with firstname and lastname
        roles = Role.objects.filter(**role_data).values('id','title')
        #add results to reponse 
        self.response = {
                "success":True,
                "message":"Role data fetched successfully",
                "payload": roles[:10]
            }

    def search_jobprofile(self,name):
        current_user =  self.context['request'].user
        jobprofile_data = {
            "title__contains":name
        }
        if not current_user.system_role == 'staff':
            jobprofile_data["company_id"] = current_user.company_id.id
        #get users with firstname and lastname
        Job_profiles = JobProfile.objects.filter(**jobprofile_data).values('id','title')
        #add results to reponse 
        self.response = {
                "success":True,
                "message":"Job profile data fetched successfully",
                "payload": Job_profiles[:10]
            }



    def get_node_id(self,node):
        #split element_id 
        return node.element_id.split(":")[-1]
  