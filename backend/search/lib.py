import re
from neomodel import db as neo4j_db
from schema.models import GripUser,JobProfile,Role
from schema.utils import get_node_id
from django.conf import settings
from rest_framework.exceptions import ValidationError

def search_neo4j(search_term,label,company_id,limit=10):
    #sanitize input
    if not label in settings.SEARCH_INDECES.keys():
        assert ValidationError("Invalid label")
    if settings.SEARCH_INDECES[label]['global'] is False:
        query = f'CALL db.index.fulltext.queryNodes("{settings.SEARCH_INDECES[label]["index"]}", "{search_term}") YIELD node, score WHERE node.company_id = "{str(company_id)}" RETURN node LIMIT {limit}'
    else:
        query = f'CALL db.index.fulltext.queryNodes("{settings.SEARCH_INDECES[label]["index"]}", "{search_term}") YIELD node, score RETURN node LIMIT {limit}'
    results,_ = neo4j_db.cypher_query(query, None, resolve_objects=True)
    if len(results) == 0:
        return []
    return [result[0] for result in results]

def search_user(name,company_id,limit):
    persons = search_neo4j(name,"user",company_id,limit)
    if len(persons) < 1:
        return []
    ids = [get_node_id(person) for person in persons]
    #get users with firstname and lastname
    users = GripUser.objects.filter(person_id__in=ids).values('id','first_name','last_name')
    #add results to reponse 
    return users

def search_skill(name,limit):
    skills = search_neo4j(name,"skill",None,limit)
    #covnert filter results to list of dicts
    ret_skills = []
    for skill in skills:
        ret_skills.append({
            "id":get_node_id(skill),
            "name":skill.preferredLabel,
            "description":skill.description
        })
    return ret_skills

def search_jobprofile(name,company_id,limit):
    jobtitles = search_neo4j(name,"job_title",company_id,limit)
    if len(jobtitles) < 1:
        return []
    ids = [get_node_id(jobtitle) for jobtitle in jobtitles]
    #get users with firstname and lastname
    Job_profiles = JobProfile.objects.filter(job_id__in=ids).values('id','title')
    return Job_profiles

def search_role(name,company_id,limit):
    #get job profiles results with the same title
    jobprofiles = search_jobprofile(name,company_id,limit)
    if len(jobprofiles) < 1:
        return []
    ids = [jobprofile['id'] for jobprofile in jobprofiles]
    role_data = {
        "job_profile_id_id__in":ids,
        "company_id_id":company_id
    }
    #get users with firstname and lastname
    roles = Role.objects.filter(**role_data).values('id','title')
    if len(roles) < limit:
        return roles
    return roles[:limit]

def search_department(name,company_id,limit):
    #get users with firstname and lastname
    departments = Role.objects.filter(department__icontains=name,company_id_id=company_id).values_list('department',flat=True).distinct()
    return departments

def postAction(data,context):
        search_key = data.get('key').lower()
        value = data.get('value')
        limit = data.get('limit')
        company_id = data.get('company_id')
                
        if value == "":
            return {
                "success":True,
                "message":"Search results fetched successfully",
                "payload": []
            }
        if search_key == "user":
            results= search_user(value,company_id,limit)
        elif search_key == "skill":
            results= search_skill(value,limit)
        elif search_key == "role":
            results= search_role(value,company_id,limit)
        elif search_key == "department":
            results= search_department(value,company_id,limit)
        else:
            results= search_jobprofile(value,company_id,limit)
        return {
            "success":True,
            "message":"Search results fetched successfully",
            "payload":results
        }