from schema.models import VacancyRole,VacancySkill
from neomodel import db
from schema.utils import getNodeByID

def formatSkills(skills):
    ref_ids = [skill["skill_ref"] for skill in skills]
    descriptions = getSkillsDescription(ref_ids)
    for i in range(len(skills)):
        skills[i]["description"] = descriptions[skills[i]["skill_ref"]]
    return skills

def connectSkillToRole(skill,jobpost):
    jobpost.HasExtractedSkill.connect(skill)
    jobpost.save()

def disconnectSkillFromRole(skill,jobpost):
    jobpost.HasExtractedSkill.disconnect(skill)
    jobpost.save()
    
def getVacancyRoleSkills(vacancy_role_id):
    role = VacancyRole.objects.get(id = vacancy_role_id)
    skills = role.skills.all().values("id","title","skill_ref","level")
    return formatSkills(skills)

def addVacancySkill(vacancy_role_id,skill_ref,level):
    role = VacancyRole.objects.get(id = vacancy_role_id)
    rolepost = getNodeByID("JobPostingRole",role.role_ref_id)
    skill_node = getNodeByID("Skill",skill_ref)
    skill = VacancySkill.objects.create(
        title=str(skill_node.preferredLabel)[:50],
        company_id=role.company.id,
        vacancy_role=role,
        skill_ref = skill_ref,
        level=level
    )
    connectSkillToRole(skill_node,rolepost)
    return skill
    
def editVacancySkill(id,level):
    skill = VacancySkill.objects.get(id=id)
    skill.level = level
    skill.save()
def deleteVacancySkill(vacancy_skill_id):
    #get vacancy skill
    vacancy_skill = VacancySkill.objects.get(id=vacancy_skill_id)
    #get the realted job posting 
    jobpost =getNodeByID("JobPostingRole",vacancy_skill.vacancy_role.role_ref_id)
    #get skill node 
    skill_node = getNodeByID("Skill",vacancy_skill.skill_ref)
    #disconnect it 
    disconnectSkillFromRole(skill_node,jobpost)
    #delete skill
    vacancy_skill.delete()


def getSkillsDescription(skill_ref):
    data = {}
    for node_id in skill_ref:
        node = getNodeByID("Skill",node_id)
        data[node_id] = node.description
    return data
def getAction(data,context):
   
    return {
        "success":True,
        "message":"Vacancy skills fetched successfully",
        "payload":getVacancyRoleSkills(data["vacancy_role_id"])
    }
    
def postAction(data,context):
    skill = addVacancySkill(
            data["vacancy_role_id"],
            data["skill_ref"],
            data["level"]
            )
    return {
        "success":True,
        "message":"Vacancy skill added successfully",
        "payload":{
            "id":skill.id,
            "title":skill.title,
            "skill_ref":skill.skill_ref,
            "level":skill.level
        }
        }

def putAction(data,context):
    editVacancySkill(data["id"],data["level"])
    return {
        "success":True,
        "message":"Vacancy skill updated successfully"
    }
def deleteAction(data,context):
    deleteVacancySkill(data["id"])
    return {
        "success":True,
        "message":"Vacancy skill deleted successfully"
    }

