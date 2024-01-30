from schema.models import JobVacancy,VacancySkill,JobPosting,JobProfile,Company
from schema.utils import get_node_id,getNodeByID
from vacancy_role.lib import addVacancyRole, getVacancyRoles,deleteVacancyRole,formatVacancyRole

def formatJobVacancy(job):
    vacancy_role= getVacancyRoles(job.id,'job')
    if vacancy_role.exists():
        vacancy_role = vacancy_role.first()
    else:
        return None
    
    return {
        "id":job.id,
        "department":job.department,
        "status":job.status,
        "email":job.user.email,
        "role":formatVacancyRole(vacancy_role)
        }

def formatJobVacancies(jobs):
    response = []
    for job in jobs:
        formatted_job= formatJobVacancy(job)
        if formatted_job is None:
            continue
        response.append(formatted_job)
    return response
    
def getJobVacancies(company_id,status):
    if status == 'all':
        jobs = JobVacancy.objects.filter(company_id=company_id)
    else:
        jobs = JobVacancy.objects.filter(company_id=company_id,status=status)
    
    return jobs
        
def addSkillsToRole(skills,vacancy_role,company_id):
    created_skills = []
    #add skills 
    for skill in skills:
        created_skills.append(
            VacancySkill.objects.create(
                title=skill.preferredLabel,
                company_id=company_id,
                vacancy_role=vacancy_role,
                skill_ref = get_node_id(skill)
                )
            )
    return created_skills

def connectOccupationToJobPost(occupation,jobpost):
    if occupation is not None:
        jobpost.BestMatchTitle.connect(occupation)
        jobpost.save()
    
def deleteJobVacancy(job_id):
    #get vacancy job 
    job = JobVacancy.objects.get(id=job_id)
    for role in job.roles.all():
        deleteVacancyRole(role.id)
    #get ref post id
    jobpost = getNodeByID("JobPosting",job.ref_post_id)
    jobpost.delete()
    job.delete()

def getSkillNodes(skill_ids):
    skills = []
    for skill in skill_ids:
        skill_node = getNodeByID("Skill",skill)
        if skill_node is not None:
            skills.append(skill_node)
    return skills

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

def addJobVacancy(job_profile_id,company_id,user_id,status,department,start_date,description,skills,end_date,hours,salary):
    #get job profile by id 
    job_profile,occupation = getJobProfileAndOccupation(job_profile_id)
    #get company by id
    company = Company.objects.get(id=company_id)
    #create job posting
    jobpost = JobPosting(
        job_title=job_profile.title,
        company_name=company.name,
        company_id=company_id
    )
    jobpost.save()
    #connect occupation if not None
    #connectOccupationToJobPost(occupation,jobpost)
    #create vacancy    
    vacancy = JobVacancy.objects.create(
        company_id=company_id,
        user_id=user_id,
        status= status,
        department=department,
        ref_post_id=get_node_id(jobpost)
        )
    #create vacancy role
    
    vacancy_role = addVacancyRole(vacancy.id,"job",job_profile_id,company_id,start_date,description,skills,end_date,hours,salary)
    
    return {
        "id":vacancy.id,
        "department":vacancy.department,
        "role":{
            "id":vacancy_role.id,
            "title":vacancy_role.job_profile.title,
            "start_date":vacancy_role.start_date,
            "end_date":vacancy_role.end_date,
            "hours":vacancy_role.hours,
            "salary":vacancy_role.salary,
            "description":vacancy_role.description,
            "skills":vacancy_role.skills.all().values("id","title","skill_ref","level")
        }
    }

def editJobVacancy(job_id,department,status):
    #get vacancy job
    job = JobVacancy.objects.get(id=job_id)
    if department:
        job.department = department
    if status:
        job.status = status
    job.save()
def getAction(data,context):
    if data["system_role"]=="employee":
        data["filter"] = "approved"
    jobs = getJobVacancies(data["company_id"],data["filter"])
    return {
        "success":True,
        "message":"Job vacancies fetched successfully",
        "payload":formatJobVacancies(jobs)
    }
    
def postAction(data,context):
    return {
        "success":True,
        "message":"Job vacancies added successfully",
        "payload":addJobVacancy(
            data["job_profile_id"],
            data["company_id"],
            data["user_id"],
            data["status"],
            data.get("department"),
            data["start_date"],
            data.get("description"),
            data.get("skills"),
            data.get("end_date"),
            data.get("hours"),
            data.get("salary")
            )
        }

def putAction(data,context):
    #get vacancy job   
    editJobVacancy(data["id"],data.get("department"),data.get("status"))
    return {
        "success":True,
        "message":"Job vacancy updated successfully"
    }

def deleteAction(data,context):
    deleteJobVacancy(data["id"])
    return {
        "success":True,
        "message":"Job vacancy deleted successfully"
    }
