from rest_framework import serializers, exceptions
from schema.models import JobProfile,GripUser,Company,Role,JobTitle,CareerJob,SkillProficiency,SkillRequirement,CareerLink
from datetime import datetime
from django.forms.models import model_to_dict

class PathSerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False,allow_null=True)
    job_profile_id = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    parent_career_job_id = serializers.IntegerField(required=False,allow_null=True)
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
        #get company_id from request object
        user_id = data.get('user_id',None)
        id = data.get('id')
        
        if user_id is None:
            user_id = self.context['request'].user.id
            user = GripUser.objects.get(id=user_id)
        else:
            #get user 
            user = GripUser.objects.filter(id=user_id)
            #check if the user exists
            if user.exists() is False:
                raise exceptions.ValidationError('User does not exist')
            #check if user in the same company
            user = user.first()
            if user.company_id.id != self.context['request'].user.company_id.id:
                raise exceptions.ValidationError('You do not have permission to access this data')
        if id is not None:
            if str(id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid Career Job id')
            if CareerJob.objects.filter(id=id).exists() is False:
                raise exceptions.ValidationError('Career Job does not exist')
            carerjob = CareerJob.objects.get(id=id)
            #check if user has access to this career job
            if carerjob.user_id.id != user_id:
                raise exceptions.ValidationError('You do not have access to this career job')
            #check if career job profile is not null
            if carerjob.job_profile_id is None:
                raise exceptions.ValidationError('You are not assigned to and job profile right now, contact your admin for more info.')
            
            skills_score = []
            #get job profile related skill requirements
            skills_required = SkillRequirement.objects.filter(job_profile_id=carerjob.job_profile_id)
            #get user skills 
            user_skills = SkillProficiency.objects.filter(user_id_id=self.context['request'].user.id)
            #loop through required skills 
            for req_skill in skills_required:
                skills_score.append({
                    "title":req_skill.title,
                    "description":req_skill.description,
                    "level":0,
                    "required_level":req_skill.level,
                    "status":-req_skill.level
                    })
                    
            for user_skill in user_skills:
                for score in skills_score:
                    if score["title"] == user_skill.title:
                        score["level"] = user_skill.level
                        score["status"] += user_skill.level
            self.response={
                "success":True,
                "message":"Career Job data fetched successfully",
                "payload":{
                    "id":carerjob.id,
                    "title":carerjob.job_profile_id.title,
                    "skills":skills_score
                }
            }
            return {
                "id":carerjob.id
            }

        else:
            #get all career jobs for user
            
            
            data = CareerJob.objects.filter(user_id=user)
            links = CareerLink.objects.filter(user_id=user)
            #define return data as list of dicts
            jobs = []
            edges = []
            #convert to list of dicts
            for job in data:
                jobs.append({
                    "title":job.job_profile_id.title,
                    "id":job.id
                })
            for link in links:
                edges.append({
                    "id":f"{link.source.id}-{link.target.id}",
                    "source":link.source.id,
                    "target":link.target.id
                })

            if len(jobs)==1:
                edges = [
                    {
                        "id": f"{jobs[0]['id']}-{jobs[0]['id']}",
                        "source":jobs[0]['id'],
                        "target":jobs[0]['id']
                    }
                ]
            self.response={
                "success":True,
                "message":"Career Job data fetched successfully",
                "payload":{
                    "jobs":jobs,
                    "edges":edges
                }
            }
            return {}
    
    def validate_post(self,data):

        #get fields from request object
        company_id= self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        job_profile_id= data.get('job_profile_id')
        parent_career_job_id = data.get('parent_career_job_id')
       
        #check if user_id is valid
        if job_profile_id is not None:
            if str(job_profile_id ).isnumeric() is False:
                raise exceptions.ValidationError('Invalid job_profile_id ')
            #check if job_profile_id is valid
            if JobProfile.objects.filter(id=job_profile_id ,company_id_id=company_id).exists() is False:
                raise exceptions.ValidationError('Job profile does not exist')
        else: 
            raise exceptions.ValidationError('job_profile_id is required')
        
        #check if parent_role_id is valid
        if parent_career_job_id is not None:
            if str(parent_career_job_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid parent_career_job_id')
            #check if job_profile_id is valid
            if CareerJob.objects.filter(id=parent_career_job_id,user_id_id = user_id).exists() is False:
                raise exceptions.ValidationError('career job does not exist')
        else:
            raise exceptions.ValidationError('parent_career_job_id is required')
        #get parent career job
        parent_career_job = CareerJob.objects.get(id=parent_career_job_id)
        #check if there are more than 3 skills with the same source
        if CareerLink.objects.filter(source=parent_career_job).count() >= 3:
            raise exceptions.ValidationError('You can not have more than 3 jobs in the same stage')

        #sort all links according to target_id
        stage_num,child_mum = self.check_node_stages(parent_career_job_id)

        if child_mum>=3:
            raise exceptions.ValidationError('You can not have more than 3 stages in career job')
        if stage_num>=3:
            raise exceptions.ValidationError('You can not have more than 3 stages in career job')
        #check if there are any career job with the same job profile
        if CareerJob.objects.filter(job_profile_id_id=job_profile_id,user_id_id=user_id).exists():
            #get this career job 
            career_job = CareerJob.objects.get(job_profile_id_id=job_profile_id,user_id_id=user_id)
            #append parent career job to this career job previous jobs
            CareerLink.objects.create(source=parent_career_job,target=career_job,user_id=self.context['request'].user)
            #prepare response 
            self.response={
                "success":True,
                "message":"Career Job data saved successfully",
                "payload":model_to_dict(career_job)
            }
            return {
                "job_profile_id":job_profile_id,
                "parent_career_job_id":parent_career_job_id
            }
        else:
            #create new career job
            career_job = CareerJob.objects.create(job_profile_id_id=job_profile_id,user_id_id=user_id)
            CareerLink.objects.create(source=parent_career_job,target=career_job,user_id=self.context['request'].user)

        #prepare response
        self.response={
            "success":True,
            "message":"Career Job data saved successfully",
            "payload":model_to_dict(career_job)
        }
        return {
            "job_profile_id":job_profile_id,
            "parent_career_job_id":parent_career_job_id
        }
    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('Career job id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid career job id')
        if CareerJob.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('Career job does not exist')
        
        # get user ID from request object
        current_user = self.context['request'].user
        #get job profile
        job = CareerJob.objects.get(id=id)
        #check if job profile is in the same company
        if job.user_id.id != current_user.id:
            raise exceptions.ValidationError('You are not authorized to delete this career job')
        #get user role and check if user role has the same job profile id
        if Role.objects.filter(user_id_id=current_user.id,job_profile_id=job.job_profile_id).exists():
            raise exceptions.ValidationError('You are not authorized to delete this career job as this is your current job.')
        #check if there are any links from this career job
        if CareerLink.objects.filter(source=job).exists():
            raise exceptions.ValidationError('You are not authorized to delete this career job as there are other jobs related to this.')
        #delete job profile
        job.delete()
        self.response = {
            "success":True,
            "message":"Career job deleted successfully",
        }
        return {"id":id}
    
    def check_node_stages(self,parent_id):
        all_nodes = CareerJob.objects.filter(user_id_id=self.context['request'].user.id).values()
        all_links = CareerLink.objects.filter(user_id_id=self.context['request'].user.id)
        all_links= [{"source_id":link.source.id,"target_id":link.target.id} for link in all_links]
        source_ids = set([x['source_id'] for x in all_links])
        target_ids = set([x['target_id'] for x in all_links])
        starting_nodes = source_ids.difference(target_ids)
        parent_node_stage = None

        def trace_path(id,starting_nodes, data):
        
            #get all occurance of starting nodes in data
            occurance = []
            for node in starting_nodes:
                
                for x in data:
                    if x['source_id'] == node :
                        if x['target_id'] == id:
                            return 1
                        else:
                            occurance.append(x['target_id'])
            occurance_score = [trace_path(id,[occ], data) for occ in occurance]
            if len(occurance_score) == 0:
                return 1
            return min(occurance_score)+1
        
        for node_id in range(len(all_nodes)):
            all_nodes[node_id]['stage'] = trace_path(all_nodes[node_id]['id'],starting_nodes, all_links)
            if all_nodes[node_id]['id'] == parent_id:
                parent_node_stage = all_nodes[node_id]['stage']

        #get number of nodes with stage number = parent_node_stage +1
        parent_childerns_num = 0
        for node in all_nodes:
            if node['stage'] == parent_node_stage+1:
                parent_childerns_num += 1
        return parent_node_stage,parent_childerns_num
      