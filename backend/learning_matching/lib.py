from rest_framework import exceptions
from django.utils import timezone
from django.conf import settings
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404
from schema.models import Company, GripUser, SkillProficiency, CompanyProvider, SkillEnhancement
from learning_matching.providers import *
from django.core.cache import cache



def getEnabledProviders(company_id: int) -> list:
    #TODO : get all enabled providers as a list of strings,
    # each string must be a key in settings.PROVIDERS
    enabled_providers = CompanyProvider.objects.filter(company=company_id, active=True). values_list('name', flat=True)
    return enabled_providers


def enableDisableProviders(company_id: int, provider_name: str, active: bool) -> CompanyProvider:
    """ Enables or disables a provider for a given company. """
    provider = CompanyProvider.objects.filter(company=company_id, name=provider_name)
    if provider:
        provider = provider.first()
        provider.active = active
        provider.save()
        return provider
    

def postAction(request, data, context):
    try:
        company_id    = context["request"].user.company_id.id
        active        = data["active"]
        provider_name = data["name"]
        
        return {
            "success": True,
            "payload": model_to_dict(enableDisableProviders(company_id, provider_name, active))
        }
    except Exception as e:
        print(e.args[0]) 
        return {
            "success": False,
            "message": str(e.args[0]), # e.args[0] is the message
        }


def listProviders(filter_param: bool, company_id: int):
    # Define the base queryset
    providers = CompanyProvider.objects.filter(company=company_id).values()

    # Apply additional filters based on the 'filter' parameter
    if filter_param:
            providers = providers.filter(active=True)
            
    result = []
    for provider in providers:
        provider_name = provider['name']
        provider['image'] = settings.PROVIDERS.get(provider_name, {}).get('image')
        result.append(provider)
        
    return providers
    
    
def listPostAction(request, data, context):
    filter_param = request.GET.get('filter', None)
    company_id   = context["request"].user.company_id
    
    providers = listProviders(filter_param, company_id)

    return({
        "success": True,
        "payload": providers
    })
  
    
def get_provider_courses(skill_title, level, page, page_size, course_id=None, enabled_providers=None):
    """
    Retrieves courses from enabled providers based on the specified 
    skill title, level, page, and optional course ID.
    """
    all_results = []
    
    for provider in enabled_providers:
        prov_data = settings.PROVIDERS.get(provider)
        if not prov_data:
            continue

        prov = globals()[prov_data["class_name"]](**prov_data["variables"])
        results = prov.get(skill_title=skill_title, level=level, page_size=page_size, page=page, course_id=course_id)
        all_results.extend(results)
    return all_results


def getRecommendations(skill_id: int, page: int, page_size: int, level: int, 
                       user_id: int, company_id: int) -> list:
    """
    Retrieves recommendations based on a given skill ID, skill level and page number.
    """
    # Create a cache key based on function parameters
    cache_key = f"recommendations_{skill_id}_{page}_{page_size}_{level}_{user_id}_{company_id}"

    # Check if the result is already in the cache
    cached_result = cache.get(cache_key)
    if cached_result is not None:
        print("Result found in cache")
        return cached_result
    
    # If not in the cache, fetch the data
    skill_obj = get_object_or_404(SkillProficiency, id=skill_id, user_id=user_id)
    skill_title = skill_obj.title

    enabled_providers = getEnabledProviders(company_id)
    all_results = get_provider_courses(skill_title, page, page_size, level,
                                       enabled_providers=enabled_providers)
    cache.set(cache_key, all_results)

    return all_results


def getCourseProviderById(course_id: int, provider: str, company_id: int, 
                          skill: int, level: int, page: int):
    """ Retrieves a course provider by its ID. """
    # Check if the result is already in the cache
    cache_key = f"course_provider_{course_id}_{provider}_{company_id}_{skill}_{level}_{page}"
    cached_result = cache.get(cache_key)
    
    if cached_result is not None:
        print("Result found in cache") 
        return cached_result
    
    enabled_providers = CompanyProvider.objects.filter(
        company=company_id, name=provider).values_list('name', flat=True)
    course = get_provider_courses(skill, level=level, page=page, page_size=1,
                                  course_id=course_id, enabled_providers=enabled_providers)
    cache.set(cache_key, course)
    return course


def getAction(request, data, context):
    skill_id   = data.get("skill_id")
    level      = data.get("level", 1)
    page       = request.query_params.get("page", 5)
    user_id    = context["request"].user.id
    company_id = context["request"].user.company_id.id
    course_id  = request.query_params.get("course_id")
    provider   = request.query_params.get("provider")
    page_size  = request.query_params.get("page_size", 8)
    
    if course_id:
        if not provider:
            raise exceptions.ValidationError({'provider': ['provider is required']})
        course  = getCourseProviderById(course_id, provider, company_id, skill_id, level, page)
        payload = {
            "course_id": course[0].get("id"),
            "title": course[0].get("title"),
            "url": course[0].get("url"),
            "description": course[0].get("description"),
            "image_240x135": course[0].get("image_240x135"),
            "provider": course[0].get("provider"),
            "price_detail": course[0].get("price_detail"),
            "is_paid": course[0].get("is_paid"),
            "url": course[0].get("url"),             
        }
        return {
            "success": True,
            "message": "Course retrieved successfully",
            "payload": payload,
        }
    
    return {
        "success": True,
        "message": "Courses retrieved successfully",
        "payload": getRecommendations(skill_id, level, page, page_size, user_id, company_id),
    }


def getCourses(user_id: int) -> list:
    courses = SkillEnhancement.objects.filter(user=user_id).values()
    return courses


def coursesPostAction(request, data, context):
    user_id = context["request"].user.id
    
    return {
        "success": True,
        "payload": getCourses(user_id),
    }
    
    
def editCourse(id: int, user_id: int, level: int) -> None:
    # check if this course belongs to the user
    if not SkillEnhancement.objects.filter(id=id).exists():
        raise exceptions.ValidationError({'id': ['Course not found']})
    course = SkillEnhancement.objects.get(id=id)
    if course.user.id != user_id:
        raise exceptions.ValidationError({'user_id': ['You don\'t have permission to edit this course']})
    
    # check if level is valid
    if level not in [1, 2, 3]:
        raise exceptions.ValidationError({'level': ['Invalid level']})
    
    # update course
    course.status = 'completed'
    course.level = level
    course.end_date = timezone.now()
    course.save()


def putAction(request, data, context):
    user_id    = context["request"].user.id
    id         = data["id"]
    level      = data["level"]
    
    editCourse(id, user_id, level)
    
    return {
        "success": True,
        "message": "Course Completed",
    }
   
        
def deleteCourse(id: int, user_id: int) -> None:
    course = SkillEnhancement.objects.filter(id=id)
    
    if not course.exists():
        raise exceptions.ValidationError({'id': ['Course not found']})
    
    if course.values('user_id')[0]['user_id'] != user_id:
        raise exceptions.ValidationError({'user_id': ['You don\'t have permission to delete this course']})
    
    course.delete()


def deleteAction(request, data, context):
    user_id    = context["request"].user.id
    id         = request.query_params.get("id")
    
    deleteCourse(id, user_id)
    
    return {
        "success": True,
        "message": "Course deleted",
    }


def startCourse(course_id: int, user_id: int, company_id: int, 
                skill_id: int, level: int, page: int, provider_name: str) -> object:
    if SkillEnhancement.objects.filter(course_id=course_id).exists():
        raise exceptions.ValidationError({'course_id': ['Course already started']})
    
    skill_obj = SkillProficiency.objects.filter(id=skill_id, user_id=user_id).first()
    if not skill_obj:
        raise exceptions.ValidationError({'skill_id': ['Skill not found']})
    skill_title = skill_obj.title
    course      = get_provider_courses(skill_title, course_id=course_id, page_size=1,
                                   level=level, page=page, enabled_providers=[provider_name])

    course_obj = SkillEnhancement.objects.create(
        course_id=course_id,
        user=GripUser.objects.get(id=user_id),
        company=Company.objects.get(id=company_id),
        reference_id=course[0]["image_240x135"],
        title=course[0]["title"],
        description=course[0]["description"],
        image=course[0]["image_240x135"],
        provider=provider_name,
        start_date=timezone.now(),
        skill=skill_obj,
        status="started",
        level=level,
        price_detail=course[0]["price_detail"],
    )
    return course_obj


def coursePostAction(request, data, context):
    company_id    = context["request"].user.company_id.id
    user_id       = context["request"].user.id
    course_id     = data["course_id"]
    skill_id      = data["skill"]    
    level         = data["level"]
    page          = data.get("page", 1)
    provider_name = data["provider"]

    # check if provider_name exist in settings.PROVIDERS
    if provider_name not in settings.PROVIDERS:
        raise exceptions.ValidationError({'provider': ['Invalid provider']})
    
    return {
        "success": True,
        "payload": model_to_dict(startCourse(course_id, user_id, company_id, 
                                        skill_id, level, page, provider_name))
    }
