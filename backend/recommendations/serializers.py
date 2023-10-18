from rest_framework import serializers, exceptions
from schema.models import JobProfile,GripUser,Company,Role,JobTitle,CareerJob,SkillProficiency,SkillRequirement,GripFile
from datetime import datetime
from django.forms.models import model_to_dict
from neomodel import db
from role.fuzzy_matching import get_best_matched_occupation
from job_vacancy.matching import getProfileMatchingvacancies,getCareerMatchingVacancies
class GetSerializer(serializers.Serializer):
    type = serializers.ChoiceField(choices=['user_skills', 'job_skills','careerpath','occupation','job_vacancy'],required=True)
    value = serializers.CharField(required=True)
    def get_node_id(self,node):
        #split element_id 
        return node.element_id.split(":")[-1]
    def get_response(self):
        return self.response
    def validate(self,data):
        r_type = data.get('type')
        value = data.get('value')
        if r_type == 'user_skills':
            recoommendations = self.get_user_skills_reccomendations(value)
        if r_type == 'job_skills':
            recoommendations = self.get_job_skills_reccomendations(value)
        if r_type == 'careerpath':
            recoommendations = self.get_careerpath_reccomendations(value)
        if r_type == 'occupation':
            recoommendations = self.get_occupation_reccomendations(value)
        if r_type == 'job_vacancy':
            recoommendations = self.get_job_vacancy_recommendations(value)
        self.response = {
            "success":True,
            "message":"Recommendations fetched successfully.",
            'payload': recoommendations
        }
        return {
            'type':r_type,
            'value':value
        }
    
    def get_user_skills_reccomendations(self,user_id):
        recommendations = []
        #get user 
        user = GripUser.objects.filter(id=user_id)
        #check if the user exists
        if user.exists() is False:
            raise exceptions.ValidationError('User does not exist')
        #check if user in the same company
        if user[0].company_id != self.context['request'].user.company_id:
            raise exceptions.ValidationError('You are not authorized to view user skills')
        #get user
        user = GripUser.objects.get(id=user_id)
        #check if user is assigned to role
        role = Role.objects.filter(user_id=user)
        if not role.exists():
            return []
        #get role
        role = role.first()
        #get job profile
        if role.job_profile_id is None:
            return []
        
        job = role.job_profile_id
        #get skill requirements for this job
        skill_requirements = SkillRequirement.objects.filter(job_profile_id=job).values("skill_id","description","title")
        #get user skills 
        user_skills = SkillProficiency.objects.filter(user_id=user_id).values("skill_id","description","title")
        #get all skill requirements that not in user skills
        for skill_requirement in skill_requirements:
            if skill_requirement not in user_skills:
                recommendations.append(skill_requirement)

        return recommendations


    def get_job_skills_reccomendations(self,job_id):
        recommendations = []
        #check if job exists
        job = JobProfile.objects.filter(id=job_id)
        if not job.exists():
            raise exceptions.ValidationError('Job does not exist')
        #get job
        job = job.first()
        #check if related jobtitle exists
        if job.job_id is None:
            return []
        #get job title
        job_title_query,_ = db.cypher_query(f"MATCH (s:JobTitle) where ID(s) = {job.job_id} return s",None,resolve_objects=True)
        job_titles =  job_title_query[0]
        if len(job_titles) == 0:
            raise exceptions.ValidationError('Job title does not exist')
        #job_title_dict = job_title_query[0][0].__dict__
        job_title = job_titles[0]
        #check if have any connected occupations
        if len(job_title.SimilarTo.all()) == 0:
            return []
        #get all similar job titles
        occupation = job_title.SimilarTo.all()[0]
        #get occupation connected skills 
        skills = occupation.hasSkill.all()
        #get skill requirements for this job
        skill_requirements = SkillRequirement.objects.filter(job_profile_id=job).values_list("skill_id")
        skill_requirements = [skill_requirement[0] for skill_requirement in skill_requirements]
        for skill in skills:
            if self.get_node_id(skill) not in skill_requirements:
                recommendations.append({
                    "id":self.get_node_id(skill),
                    "title":skill.preferredLabel,
                    "description":skill.description
                })
        return recommendations

    def get_careerpath_reccomendations(self,job_id):
        job = CareerJob.objects.filter(id=job_id)

        if not job.exists():
            raise exceptions.ValidationError('Job does not exist')
        #get job
        job = job.first()
        #check if related jobtitle exists
        if job.job_profile_id is None:
            return []
        #get job title
        job_title_query,_ = db.cypher_query(f"""
            MATCH (n:Person)-[r]-(s:Skill)-[r2]-(o:Occupation)
            WHERE ID(n) = {self.context['request'].user.person_id}
            WITH o, COUNT(DISTINCT s) AS overlapCount, COLLECT(o.preferredLabel) AS preferredLabels
            ORDER BY overlapCount DESC
            LIMIT 10
            MATCH (s:Skill)-[r]-(o:Occupation) WHERE o.preferredLabel IN preferredLabels
            WITH o,overlapCount, COUNT(DISTINCT s) AS totalSkills,preferredLabels
            MATCH (n:JobTitle)-[r]-(o:Occupation) WHERE o.preferredLabel IN preferredLabels
            WITH n,o, preferredLabels,overlapCount, totalSkills
            RETURN n.label, overlapCount, totalSkills
            """,None,resolve_objects=True)
        
        if len(job_title_query) == 0:
            return []
        
        #get job profile that has the same title
        titles_list = [ job_title[0] for job_title in job_title_query]
        job_profiles = JobProfile.objects.filter(title__in=titles_list,company_id=self.context['request'].user.company_id).values('id','title')
        #get all career jobs for this user 
        career_jobs = CareerJob.objects.filter(user_id_id=self.context['request'].user.id).values_list('job_profile_id',flat=True)
        #return list
        ret_list = []
        for i in range(len(job_profiles)):
            for j in range(len(job_title_query)):
                if job_profiles[i]['title'] == job_title_query[j][0] and job_profiles[i]['id'] not in career_jobs:
                    job_profiles[i]['percentage'] = job_title_query[j][1]*100//job_title_query[j][2]
                    ret_list.append(job_profiles[i])
        return ret_list
        #get occupation connected skills

    def get_occupation_reccomendations(self,title):
        result = []
        occupations = get_best_matched_occupation(title,20)
        if not occupations:
            return []
        for occupation in occupations:
            result.append({
                "id":self.get_node_id(occupation),
                "title":occupation.preferredLabel,
                "description":occupation.description
            })
        return result
    
    def get_job_vacancy_recommendations(self,user_id):
        return {
            "profile_based": getProfileMatchingvacancies(user_id,as_dict=True),
            "career_based": getCareerMatchingVacancies(user_id)
        }