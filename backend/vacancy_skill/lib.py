from schema.models import VacancyRole,VacancySkill
from neomodel import db
from schema.utils import getNodeByID

def getVacancyRoleSkills(vacancy_role_id):
    role = VacancyRole.objects.get(id = vacancy_role_id)
    skills = role.skills.all().values("id","title","skill_ref")
    return skills

def addVacancySkill(vacancy_role_id,skill_ref):
    role = VacancyRole.objects.get(id = vacancy_role_id)
    jobpost = getNodeByID("JobPosting",role.vacancy.ref_post_id)
    skill_node = getNodeByID("Skill",skill_ref)
    skill = VacancySkill.objects.create(
        title=skill_node.preferredLabel,
        company_id=role.company.id,
        vacancy_role=role,
        skill_ref = skill_ref
    )
    connectSkillToJobPost(skill_node,jobpost)
    return {
        "id":skill.id,
        "title":skill.title,
        "skill_ref":skill.skill_ref
    }
    
def deleteVacancySkill(vacancy_skill_id):
    #get vacancy skill
    vacancy_skill = VacancySkill.objects.get(id=vacancy_skill_id)
    #get the realted job posting 
    jobpost =getNodeByID("JobPosting",vacancy_skill.vacancy_role.vacancy.ref_post_id)
    #get skill node 
    skill_node = getNodeByID("Skill",vacancy_skill.skill_ref)
    #disconnect it 
    disconnectSkillFromJobPost(skill_node,jobpost)
    #delete skill
    vacancy_skill.delete()

def connectSkillToJobPost(skill,jobpost):
    jobpost.HasExtractedSkill.connect(skill)
    jobpost.save()

def disconnectSkillFromJobPost(skill,jobpost):
    jobpost.HasExtractedSkill.disconnect(skill)
    jobpost.save()
    

def getAction(data,context):
   
    return {
        "success":True,
        "message":"Vacancy skills fetched successfully",
        "payload":getVacancyRoleSkills(data["vacancy_role_id"])
    }
    
def postAction(data,context):
    return {
        "success":True,
        "message":"Vacancy skill added successfully",
        "payload":addVacancySkill(
            data["vacancy_role_id"],
            data["skill_ref"]
            )
        }


def deleteAction(data,context):
    deleteVacancySkill(data["id"])
    return {
        "success":True,
        "message":"Vacancy skill deleted successfully"
    }

