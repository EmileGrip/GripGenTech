from schema.models import SkillProficiency,Endorsement
#import QuerySet class
from django.db.models import QuerySet
def getUserEndorsement(user_id):
    #get all skill proficiency for this user
    skill_proficiencies = SkillProficiency.objects.filter(user_id_id=user_id).all().values_list('id',flat=True)
    if len(skill_proficiencies) == 0:
        return []
    #get all endorsement for this user
    return Endorsement.objects.filter(skill_id__in=skill_proficiencies).all()

def addUserEndorsement(skill_id,user_id):
    #gt the skill proficiency
    skill_proficiency = SkillProficiency.objects.filter(id=skill_id).first()
    endorsement = Endorsement.objects.create(
        skill_id=skill_id,
        endorser_id=user_id,
        company_id=skill_proficiency.company_id.id
    )
    return endorsement

def removeUserEndorsement(endorsement_id,skill_id,user_id):
    if endorsement_id is not None:
        endorsement = Endorsement.objects.filter(id=endorsement_id)
        if endorsement.exists():
            endorsement.delete()
        
    elif skill_id is not None:
        endorsement = Endorsement.objects.filter(skill_id=skill_id,endorser_id=user_id)
        if endorsement.exists():
            endorsement.delete()

def getAction(data,context):
    endorsments = getUserEndorsement(data['user_id'])
    return {
        "success": True,
        "message": "Endorsments fetched successfully",
        "payload": endorsments.values("id","skill_id") if len(endorsments) > 0 else []
    }

def postAction(data,context):
    endorsement = addUserEndorsement(data['skill_id'],data['user_id'])
    return {
        "success": True,
        "message": "Endorsment added successfully"
    }

def deleteAction(data,context):
    removeUserEndorsement(data.get('id'),data.get('skill_id'),data.get('user_id'))
    return {
        "success": True,
        "message": "Endorsment removed successfully"
    }