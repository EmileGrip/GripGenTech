from schema.models import ProjectVacancy,JobPosting,JobProfile,Company
from schema.utils import get_node_id,getNodeByID
from vacancy_role.lib import addVacancyRole

def getProjectVacancies(company_id,status):
    if status == 'all':
        projects = ProjectVacancy.objects.filter(company_id=company_id)
    else:
        projects = ProjectVacancy.objects.filter(company_id=company_id,status=status)
    return projects
        
def connectOccupationToJobPost(occupation,jobpost):
    if occupation is not None:
        jobpost.BestMatchTitle.connect(occupation)
        jobpost.save()
    
def deleteProjectVacancy(job_id):
    #get vacancy job 
    job = ProjectVacancy.objects.get(id=job_id)
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

def addProjectVacancy(name,company_id,user_id,status,department,start_date,description,roles,end_date):
    #get company by id
    company = Company.objects.get(id=company_id)
    #create job posting
    jobpost = JobPosting(
        job_title=name,
        company_name=company.name
    )
    jobpost.save()
    #create vacancy    
    vacancy = ProjectVacancy.objects.create(
        company_id=company_id,
        user_id=user_id,
        status= status,
        name=name,
        start_date=start_date,
        end_date=end_date,
        description=description,
        department=department,
        ref_post_id=get_node_id(jobpost)
        )
    for role in roles:
        #get job profile by id 
        job_profile,occupation = getJobProfileAndOccupation(role["job_profile_id"])
        #connect occupation if not None
        connectOccupationToJobPost(occupation,jobpost)
        #create vacancy role
        vacancy_role = addVacancyRole(
            vacancy.id,
            "project",
            role["job_profile_id"],
            company_id,
            role["start_date"],
            role["description"],
            role.get("skills"),
            role.get("end_date"),
            role.get("hours"),
            role.get("salary")
            )
    return vacancy

def editProjectVacancy(job_id,department,name,description,start_date,end_date):
    #get vacancy job
    project = ProjectVacancy.objects.get(id=job_id)
    if name is not None:
        project.name = name
    if description is not None:
        project.description = description
    if start_date is not None:
        project.start_date = start_date
    if end_date is not None:
        project.end_date = end_date
    if department is not None:
        project.department = department
    project.save()
    
def getAction(data,context):
    if data["system_role"]=="employee":
        data["filter"] = "approved"
    projects = getProjectVacancies(data["company_id"],data["filter"])
    response = []
    for project in projects:
        project_reponse = {
            "id":project.id,
            "status":project.status,
            "name":project.name,
            "department":project.department,
            "start_date":project.start_date,
            "end_date":project.end_date,
            "description":project.description,
            "roles":[]
        }
        for role in project.roles.all():
            project_reponse["roles"].append({
                "id":role.id,
                "title":role.job_profile.title,
                "start_date":role.start_date,
                "end_date":role.end_date,
                "hours":role.hours,
                "salary":role.salary,
                "description":role.description,
                "skills":role.skills.all().values("id","title","skill_ref","level")
            })
        response.append(project_reponse)
    return {
        "success":True,
        "message":"Project vacancies fetched successfully",
        "payload":response
    }
    
def postAction(data,context):
    vacancy = addProjectVacancy(
            data["name"],
            data["company_id"],
            data["user_id"],
            data["status"],
            data["department"],
            data["start_date"],
            data["description"],
            data["roles"],
            data.get("end_date")
            )
    roles = []
    for role in vacancy.roles.all():
        role_response = {
            "id":role.id,
            "title":role.job_profile.title,
            "start_date":role.start_date,
            "end_date":role.end_date,
            "hours":role.hours,
            "salary":role.salary,
            "description":role.description,
            "skills":role.skills.all().values("id","title","skill_ref","level")
        }
        roles.append(role_response)
    return {
        "success":True,
        "message":"Project vacancies added successfully",
        "payload":{
            "id":vacancy.id,
            "name":vacancy.name,
            "description":vacancy.description,
            "department":vacancy.department,
            "roles":roles,
            "start_date":vacancy.start_date,
            "end_date":vacancy.end_date,
            "status":vacancy.status
        }
        }

def putAction(data,context):
    #get vacancy job 
    editProjectVacancy(
        data["id"],
        data.get("department"),
        data.get("name"),
        data.get("description"),
        data.get("start_date"),
        data.get("end_date")
        )
    return {
        "success":True,
        "message":"Project vacancy updated successfully"
    }

def deleteAction(data,context):
    deleteProjectVacancy(data["id"])
    return {
        "success":True,
        "message":"Project vacancy deleted successfully"
    }
