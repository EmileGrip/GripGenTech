from schema.models import JobVacancy,VacancyRole,ProjectVacancy,JobPostingRole,JobProfile
from vacancy_skill.lib import addVacancySkill,deleteVacancySkill
from schema.utils import getNodeByID,get_node_id
from vacancy_skill.lib import formatSkills
def formatVacancyRole(role):
    return {
        "id":role.id,
        "title":role.job_profile.title,
        "description":role.description,
        "start_date":role.start_date,
        "end_date":role.end_date,
        "hours":role.hours,
        "salary":role.salary,
        "skills":formatSkills(role.skills.values("id","title","skill_ref","level"))
    }
def getVacancyRoles(vacancy_id,vacancy_type):
    vacancy = None
    if vacancy_type == "job":
        vacancy = JobVacancy.objects.get(id=vacancy_id)
    elif vacancy_type == "project":
        vacancy = ProjectVacancy.objects.get(id=vacancy_id)
    else:
        raise Exception("Invalid vacancy type")
    roles = vacancy.roles.all()
    return roles

def addJobPostingRole(role_title,company_id):
    role = JobPostingRole(
        role_title=role_title,
        company_id=company_id
    )
    role.save()
    return role

def getJobProfileAndOccupation(job_id):
    job_profile = JobProfile.objects.get(id=job_id)
    job_id = job_profile.job_id
    #get jobTitle by id
    job_title = getNodeByID("JobTitle",job_id)
    occupation = job_title.SimilarTo.all()
    if len(occupation) == 0:
        occupation=None
    else:
        occupation = occupation[0]
        
    return job_profile,occupation
def connectRoleToJobPost(role,jobpost):
    if jobpost is not None:
        jobpost.HasRole.connect(role)
        jobpost.save()
        
def connectRoleToOccupation(occupation,role):
    if occupation is not None:
        role.BestMatchTitle.connect(occupation)
        role.save()

def addVacancyRole(vacancy_id,vacancy_type,job_profile_id,company_id,start_date,description,skills,end_date,hours,salary):
    vacancy = None
    if vacancy_type == "job":
        vacancy = JobVacancy.objects.get(id=vacancy_id)
    elif vacancy_type == "project":
        vacancy = ProjectVacancy.objects.get(id=vacancy_id)
    else:
        raise Exception("Invalid vacancy type")
    #get job profile by id 
    job_profile,occupation = getJobProfileAndOccupation(job_profile_id)
    #create job posting role
    job_posting_role = addJobPostingRole(
        job_profile.title,
        company_id
    ) 
    #connect role to occupation
    connectRoleToOccupation(occupation,job_posting_role)   
    #create vacancy role
    vacancy_role = VacancyRole.objects.create(
        company_id=company_id,
        job_profile_id=job_profile_id,
        start_date=start_date,
        end_date=end_date,
        hours=hours,
        salary=salary,
        description=description,
        vacancy=vacancy,
        role_ref_id=get_node_id(job_posting_role)
    )
    #add skills
    if skills is not None:
        for skill in skills : 
            addVacancySkill(vacancy_role.id,skill["skill_ref"],skill["level"])
    #connect role to job post
    jobpost = getNodeByID("JobPosting",vacancy.ref_post_id)
    connectRoleToJobPost(job_posting_role,jobpost)
    return vacancy_role

def editVacancyRole(id,job_profile_id,start_date,description,end_date,hours,salary):
    role = VacancyRole.objects.get(id=id)
    if job_profile_id is not None:
        role.job_profile_id = job_profile_id
    if start_date is not None:
        role.start_date = start_date
    if description is not None:
        role.description = description
    if end_date is not None:
        role.end_date = end_date
    if hours is not None:
        role.hours = hours
    if salary is not None:
        role.salary = salary
    role.save()
    return role

def deleteVacancyRole(id):
    #get vacancy role
    role = VacancyRole.objects.get(id=id)
    #disconnect skills
    for skill in role.skills.all():
        deleteVacancySkill(skill.id)
    #get role post
    jobpost = getNodeByID("JobPostingRole",role.role_ref_id)
    #delete role
    jobpost.delete()
    #delete vacancy role
    role.delete()   
    
def getAction(data,context):
    roles = getVacancyRoles(data["vacancy_id"],data["vacancy_type"])
    response = []
    for role in roles:
        response.append({
            "id":role.id,
            "title":role.job_profile.title,
            "description":role.description,
            "start_date":role.start_date,
            "end_date":role.end_date,
            "hours":role.hours,
            "salary":role.salary,
            "skills":role.skills.values("id","title","skill_ref","level")
        })
    return {
        "success":True,
        "message":"Job vacancies fetched successfully",
        "payload":response
    }
    
def postAction(data,context):
    vacancy_role = addVacancyRole(
            data["vacancy_id"],
            data["vacancy_type"],
            data["job_profile_id"],
            data["company_id"],
            data["status"],
            data["start_date"],
            data["description"],
            data["skills"],
            data.get("end_date"),
            data.get("hours"),
            data.get("salary")
            )
    
    return {
        "success":True,
        "message":"Vacancy role added successfully",
        "payload":{
            "id":vacancy_role.id,
            "title":vacancy_role.job_profile.title,
            "description":vacancy_role.description,
            "start_date":vacancy_role.start_date,
            "end_date":vacancy_role.end_date,
            "hours":vacancy_role.hours,
            "salary":vacancy_role.salary,
            "skills":vacancy_role.skills.all().values("id","title","skill_ref","level")
        }
        }

def putAction(data,context):
    #get vacancy job 
    vacancy_role = editVacancyRole(
        data["id"],
        data.get("job_profile_id"),
        data.get("start_date"),
        data.get("description"),
        data.get("end_date"),
        data.get("hours"),
        data.get("salary")
        )
    
    return {
        "success":True,
        "message":"Job vacancy updated successfully",
        "payload":{
            "id":vacancy_role.id,
            "title":vacancy_role.job_profile.title,
            "description":vacancy_role.description,
            "start_date":vacancy_role.start_date,
            "end_date":vacancy_role.end_date,
            "hours":vacancy_role.hours,
            "salary":vacancy_role.salary,
            "skills":vacancy_role.skills.all().values("id","title","skill_ref","level")
        }
    }

def deleteAction(data,context):
    deleteVacancyRole(data["id"])
    return {
        "success":True,
        "message":"Vacancy role deleted successfully"
    }

