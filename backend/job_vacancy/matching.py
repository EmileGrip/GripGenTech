

from neomodel import db
from schema.models import GripUser,JobProfile,CareerJob,JobVacancy,Role,ProjectVacancy,VacancyRole
from django.core.files.storage import default_storage
from django.forms.models import model_to_dict

def formatJobVacancy(job):
    vacancy_role= job.roles.all()
    if len(vacancy_role) == 0:
        return None
    else:
        vacancy_role = vacancy_role.first()
    
    return {
        "id":job.id,
        "department":job.department,
        "status":job.status,
        "email":job.user.email,
        "role":{
            "id":vacancy_role.id,
            "title":vacancy_role.job_profile.title,
            "job_profile_id":vacancy_role.job_profile.id,
            "description":vacancy_role.description,
            "start_date":vacancy_role.start_date,
            "end_date":vacancy_role.end_date,
            "hours":vacancy_role.hours,
            "salary":vacancy_role.salary,
            "skills":vacancy_role.skills.all().values("id","title","skill_ref","level")
    }}
def formatProjectVacancy(project):
    project_reponse = {
        "id":project.id,
        "status":project.status,
        "name":project.name,
        "department":project.department,
        "start_date":project.start_date,
        "end_date":project.end_date,
        "description":project.description,
        "email":project.user.email,
        "roles":[]
    }
    for role in project.roles.all():
        project_reponse["roles"].append({
            "id":role.id,
            "title":role.job_profile.title,
            "job_profile_id":role.job_profile.id,
            "start_date":role.start_date,
            "end_date":role.end_date,
            "hours":role.hours,
            "salary":role.salary,
            "description":role.description,
            "skills":role.skills.all().values("id","title","skill_ref","level")
        })
    return project_reponse

def matchVacancy(id,matching_type,as_dict=False):
    if matching_type == 'job':
        profile_based = getProfileMatchingvacancies(id,matching_type)
        career_based = getCareerMatchingVacancies(id,matching_type)
        for i in range(len(profile_based)):
            data_item = formatJobVacancy(profile_based[i]["job"])
            data_item["percentage"] = profile_based[i]["percentage"]
            profile_based[i] = data_item
        for i in range(len(career_based)):
            data_item = formatJobVacancy(career_based[i]["job"])
            data_item["percentage"] = career_based[i]["percentage"]
            career_based[i] = data_item
        return {
            "profile_based": profile_based,
            "career_based": profile_based
        }
    if matching_type == 'project':
        profile_based = getProfileMatchingvacancies(id,matching_type)
        career_based = getCareerMatchingVacancies(id,matching_type)
        for i in range(len(profile_based)):
            data_item = formatProjectVacancy(profile_based[i]["project"])
            data_item["percentage"] = profile_based[i]["percentage"]
            profile_based[i] = data_item
        for i in range(len(career_based)):
            data_item = formatProjectVacancy(career_based[i]["project"])
            data_item["percentage"] = career_based[i]["percentage"]
            career_based[i] = data_item
        return {
            "profile_based": profile_based,
            "career_based": profile_based
        }
    if matching_type == 'job_candidate':
        jacancy_based = getMatchedUsersForVacancy(id,"job")
        return {
            "vacancy_based": jacancy_based
        }
    if matching_type == 'project_candidate':
        jacancy_based = getMatchedUsersForVacancy(id,"project")
        return {
            "vacancy_based": jacancy_based
        }
    if matching_type == 'role_candidate':
        jacancy_based = getMatchedUsersForVacancyRole(id)
        return {
            "role_based": jacancy_based
        }
    return 
    
def getProfileMatchingvacancies(user_id,data_type,as_dict=False):
    person_id,company_name,company_id = getPersonIDAndCompany(user_id)
    query = f"""
    MATCH (n:Person)-[r]-(s:Skill)
    WHERE ID(n) = '{person_id}' 
    WITH COLLECT(DISTINCT s) AS personSkills
    OPTIONAL MATCH (n:JobPosting)-[r2]-(r:JobPostingRole)-[r3]-(s:Skill)
    WHERE n.company_id = '{company_id}'
    WITH n, personSkills, COLLECT(DISTINCT s) AS jobSkills
    WITH n, jobSkills, personSkills,
        [skill IN jobSkills WHERE skill IN personSkills | skill.preferredLabel] AS overlappingSkills,
        [skill IN jobSkills WHERE NOT skill IN personSkills | skill.preferredLabel] AS skillsNotPresent
    RETURN ID(n) as job_id, CASE WHEN SIZE(jobSkills) = 0 THEN 0 ELSE (SIZE(overlappingSkills) * 1.0 / SIZE(jobSkills)) END as MatchPercentage
    ORDER BY MatchPercentage DESC LIMIT 10
    """
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    return parseResults(result,as_dict,data_type,company_id=company_id)

def getCareerMatchingVacancies(user_id,data_type,as_dict=False):
    person_id,company_name,company_id  = getPersonIDAndCompany(user_id)
    job_profile_ids = getJobProfileIDs(user_id)
    query = f"""
    MATCH (n:Occupation)-[r]-(t:JobTitle)
    WHERE ID(t) IN {job_profile_ids} AND t.company_id = '{company_id}'
    WITH COLLECT(n) AS UserOccupations
    MATCH (n:Occupation)-[r]-(s:Skill)
    WHERE n IN UserOccupations 
    WITH COLLECT(DISTINCT s) AS personSkills
    OPTIONAL MATCH (n:JobPosting)-[r2]-(r:JobPostingRole)-[r3]-(s:Skill)
    WHERE n.company_id = '{company_id}'
    WITH n, personSkills, COLLECT(DISTINCT s) AS jobSkills
    WITH n, jobSkills, personSkills,
        [skill IN jobSkills WHERE skill IN personSkills | skill.preferredLabel] AS overlappingSkills,
        [skill IN jobSkills WHERE NOT skill IN personSkills | skill.preferredLabel] AS skillsNotPresent
    RETURN ID(n) as job_id, CASE WHEN SIZE(jobSkills) = 0 THEN 0 ELSE (SIZE(overlappingSkills) * 1.0 / SIZE(jobSkills)) END as MatchPercentage
    ORDER BY MatchPercentage DESC LIMIT 10
    """
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    return parseResults(result,as_dict,data_type,company_id=company_id)


def getMatchedUsersForVacancy(vacancy_id,data_type,as_dict=False):
    #get vacancy by id 
    if data_type == "job":
        vacancy = JobVacancy.objects.filter(id = vacancy_id)
    else:
        vacancy = ProjectVacancy.objects.filter(id = vacancy_id)
    if vacancy.exists() is False:
        raise ValueError("vacancy does not exist")
    vacancy = vacancy.first()
    company_id = vacancy.company.id
    #get ref_post_id 
    ref_post_id = vacancy.ref_post_id
    query = f"""
    MATCH (j:JobPosting)-[r1]-(r:JobPostingRole)-[r3]-(s:Skill)
    WHERE j.company_id = '{company_id}' AND ID(j) = {ref_post_id}
    WITH j, COLLECT(DISTINCT s) AS jobSkills
    OPTIONAL MATCH (n:Person)-[r2:HasSkill]->(s)
    WHERE n.company_id = '{company_id}'
    WITH n, jobSkills, COLLECT(DISTINCT s) AS personSkills
    WITH n, jobSkills, personSkills,
        [skill IN jobSkills WHERE skill IN personSkills | skill.preferredLabel] AS overlappingSkills,
        [skill IN jobSkills WHERE NOT skill IN personSkills | skill.preferredLabel] AS skillsNotPresent
    RETURN ID(n) as user_id, CASE WHEN SIZE(jobSkills) = 0 THEN 0 ELSE (SIZE(overlappingSkills) * 1.0 / SIZE(jobSkills)) END as MatchPercentage, overlappingSkills
    """
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    return parseResults(result,as_dict,"user")

def getMatchedUsersForVacancyRole(role_id):
    #get vacancy by id 
    role = VacancyRole.objects.filter(id = role_id)
    if role.exists() is False:
        raise ValueError("Vacancy role does not exist")
    role = role.first()
    company_id = role.company.id
    #get ref_post_id 
    ref_post_id = role.role_ref_id
    query = f"""
    MATCH (r:JobPostingRole)-[r1]-(s:Skill)
    WHERE r.company_id = '{company_id}' AND ID(r) = {ref_post_id}
    WITH COLLECT(DISTINCT s) AS jobSkills
    OPTIONAL MATCH (n:Person)-[r2:HasSkill]->(s:Skill)
    WHERE n.company_id = '{company_id}'
    WITH n, jobSkills, COLLECT(DISTINCT s) AS personSkills
    WITH n, jobSkills, personSkills,
        [skill IN jobSkills WHERE skill IN personSkills | skill.preferredLabel] AS overlappingSkills,
        [skill IN jobSkills WHERE NOT skill IN personSkills | skill.preferredLabel] AS skillsNotPresent
    RETURN ID(n) as user_id, CASE WHEN SIZE(jobSkills) = 0 THEN 0 ELSE (SIZE(overlappingSkills) * 1.0 / SIZE(jobSkills)) END as MatchPercentage, overlappingSkills
    """
    result,_ = db.cypher_query(query, None, resolve_objects=True)
    return parseResults(result,False,"user")
    
def getPersonIDAndCompany(user_id):
    #get user  by id
    user = GripUser.objects.get(id=user_id)
    
    return user.person_id,user.company_id.name,user.company_id.id

def getJobProfileIDs(user_id):
    ids = CareerJob.objects.filter(user_id_id=user_id).values_list('job_profile_id',flat=True)
    job_ids = list(JobProfile.objects.filter(id__in=ids).values_list('job_id',flat=True))
    return job_ids

def parseResults(results,as_dict,data_type,**params):
    parsed_results = []
    if len(results) < 1:
        return parsed_results
    ids = [str(i) for i in results[:][0]]
    #get related job posting 
    if data_type == "job":
        jobs = JobVacancy.objects.filter(ref_post_id__in=ids,status="approved",company_id=params["company_id"]).all()
        #parse results :
        for item in results:
            for job in jobs:
                if job.ref_post_id == str(item[0]):
                    if item[1] == 0:
                        continue
                    parsed_results.append({
                        "job":model_to_dict(job) if as_dict else job,
                        "percentage":int(100 *item[1])
                    })
    if data_type == "project":
        projects = ProjectVacancy.objects.filter(ref_post_id__in=ids,status="approved",company_id=params["company_id"]).all()
        #parse results :
        for item in results:
            for project in projects:
                if project.ref_post_id == str(item[0]):
                    if item[1] == 0:
                        continue
                    parsed_results.append({
                        "project":model_to_dict(project) if as_dict else project,
                        "percentage":int(100 * item[1])
                    })
    if data_type == "user":
        users = GripUser.objects.filter(person_id__in=ids).all()
        #parse results 
        for item in results:
            for user in users:
                if user.person_id == str(item[0]):
                    if item[1] == 0:
                        continue
                    parsed_results.append({
                        "id":user.id,
                        "name":f"{user.first_name} {user.last_name}",
                        "title":getUserTitle(user.id),
                        "pic":getUserProfilePic(user.profile_picture),
                        "email":user.email,
                        "percentage":int(100 * item[1]),
                        "skills":[d[0] for d in item[2]]
                    })
    return parsed_results

def getUserTitle(user_id):
    #get role if exist
    role = Role.objects.filter(user_id_id=user_id)
    if role.exists():
        role = role.first()
        return role.job_profile_id.title if role.job_profile_id else None
    else:
        return ""
    
def getUserProfilePic(profile_pic):
    #get profile pic if exist
    if profile_pic is not None:
        return default_storage.url(f"{profile_pic.path}/{profile_pic.name}")
    else:
        return ""
 