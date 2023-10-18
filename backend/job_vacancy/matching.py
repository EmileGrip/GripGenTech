

from neomodel import db
from schema.models import GripUser,JobProfile,CareerJob,JobVacancy
#import model to dict
from django.forms.models import model_to_dict
def getProfileMatchingvacancies(user_id,as_dict=False):
    person_id,company_name,company_id = getPersonIDAndCompany(user_id)
    query = f"""
    MATCH (n:Person)-[r]-(s:Skill)-[r2]-(o:Occupation)-[r3]-(j:JobPosting)
    WHERE ID(n) = {person_id}
    WITH n AS PersonNode,COLLECT(DISTINCT s.preferredLabel) AS UserSkills
    MATCH (p:JobPosting)-[r]-(s:Skill)
    WITH PersonNode,UserSkills, p AS JobNode,COUNT(DISTINCT s.preferredLabel) AS totalOccupationSkills
    MATCH (p:JobPosting)-[r]-(s:Skill)
    WHERE s.preferredLabel IN UserSkills AND p.company_name = '{company_name}'
    WITH PersonNode,UserSkills, JobNode, totalOccupationSkills,COUNT(DISTINCT s) AS OverlapSkills
    ORDER BY OverlapSkills DESC LIMIT 10
    RETURN  ID(JobNode), totalOccupationSkills ,OverlapSkills
    """
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    return parseResults(result,company_id,as_dict)

def getCareerMatchingVacancies(user_id,as_dict=False):
    person_id,company_name,company_id  = getPersonIDAndCompany(user_id)
    job_profile_ids = getJobProfileIDs(user_id)
    query = f"""
    MATCH (j:JobPosting)-[r]-(o:Occupation) 
    WHERE ID(o) IN {job_profile_ids} AND j.company_name = '{company_name}'
    WITH COLLECT(DISTINCT j) AS JobPostings
    MATCH (n:Person)-[r]-(s:Skill)-[r2]-(o:Occupation)-[r3]-(j:JobPosting)
    WHERE ID(n) = {person_id} AND j IN JobPostings
    WITH JobPostings,n AS PersonNode,COLLECT(DISTINCT s.preferredLabel) AS UserSkills
    MATCH (p:JobPosting)-[r]-(s:Skill)
    WHERE p IN JobPostings
    WITH JobPostings,PersonNode,UserSkills, p AS JobNode,COUNT(DISTINCT s.preferredLabel) AS totalOccupationSkills
    MATCH (p:JobPosting)-[r]-(s:Skill)
    WHERE s.preferredLabel IN UserSkills AND p IN JobPostings
    WITH PersonNode,UserSkills, JobNode, totalOccupationSkills,COUNT(DISTINCT s) AS OverlapSkills
    ORDER BY OverlapSkills DESC LIMIT 10
    RETURN ID(JobNode), totalOccupationSkills ,OverlapSkills
    """
    
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    
    
    return parseResults(result,company_id,as_dict=as_dict)

def getPersonIDAndCompany(user_id):
    #get user  by id
    user = GripUser.objects.get(id=user_id)
    
    return user.person_id,user.company_id.name,user.company_id.id

def getJobProfileIDs(user_id):
    ids = CareerJob.objects.filter(user_id_id=user_id).values_list('job_profile_id',flat=True)
    job_ids = list(JobProfile.objects.filter(id__in=ids).values_list('job_id',flat=True))
    return job_ids

def parseResults(results,company_id,as_dict):
    parsed_results = []
    if len(results) < 1:
        return parsed_results
    ids = [str(i) for i in results[:][0]]
    #get related job posting 
    jobs = JobVacancy.objects.filter(ref_post_id__in=ids,status="approved",company_id=company_id).all()
    #parse results :
    for item in results:
        for job in jobs:
            if job.ref_post_id == str(item[0]):
                parsed_results.append({
                    "job":model_to_dict(job) if as_dict else job,
                    "percentage":int(100 * (item[2]/item[1]))
                })
    return parsed_results