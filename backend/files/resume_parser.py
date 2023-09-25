from pathlib import Path
from pprint import pprint
#import django settings to import configurations
from django.conf import settings
from affinda import AffindaAPI, TokenCredential
from affinda.models import WorkspaceCreate, CollectionCreate
from schema.models import Course, Experience,Education
class ResumeParser:
  def __init__(self):
    self.token = settings.AFFINDA_TOKEN
    self.client = AffindaAPI(credential=TokenCredential(token=self.token ))
    self.organisation = self.__get_organisation(settings.AFFINDA_ORGANISATION)
    self.workspace = self.__get_workspace(settings.AFFINDA_WORKSPACE)
    self.collection = self.__get_collection(settings.AFFINDA_COLLECTION)

  def __get_organisation(self,name):
    all_organizations = self.client.get_all_organizations()
    organisation = None
    for org in all_organizations:
      if org.name == name:
        organisation = org
        break
    if organisation is None:
      organisation = self.client.create_organization(name)
    return organisation

  def __get_workspace(self,name):
    all_workspaces = self.client.get_all_workspaces(organization=self.organisation.identifier)
    recruitment_workspace = None
    for work in all_workspaces:
      if work.name == name:
        recruitment_workspace = work
        break
    if recruitment_workspace is None:
      workspace_body = WorkspaceCreate(
          organization=self.organisation.identifier,
          name=name,
      )
      recruitment_workspace = self.client.create_workspace(body=workspace_body)
    return recruitment_workspace

  def __get_collection(self,name):
    all_collections = self.client.get_all_collections(workspace=self.workspace.identifier)
    resume_collection = None
    for col in all_collections:
      if col.name == name:
        resume_collection = col
        break
    if resume_collection is None:
      collection_body = CollectionCreate(
          name=name, workspace=self.workspace.identifier, extractor="resume"
      )
      resume_collection = self.client.create_workspace(body=collection_body)
    return resume_collection

  def __upload_document(self,url):
    resume = self.client.create_document(url = url, collection=self.collection.identifier,wait=True)
    return resume.as_dict()
  
  def __parse_education(self,data):
    data = data['data']['education']
    if len(data) == 0:
      return []
    
    education = []
    for edu in data:
      education.append({
        "institution" :edu['organization'],
        "degree" : edu['accreditation']['education'],
        "level" : edu['accreditation']['education_level'],
        "start_date" : edu['dates'].get('start_date',None),
        "end_date" :edu['dates'].get('end_date',None),
      })
    return education
  
  def __parse_experience(self,data):
    data = data['data']['work_experience']
    if len(data) == 0:
      return []
    
    experience = []
    for exp in data:
      experience.append({
        "title" : exp['job_title'],
        "description" : exp['job_description'],
        "company" : exp['organization'],
        "start_date" : exp['dates'].get('start_date',None),
        "end_date" : exp['dates'].get('end_date',None),
        "is_current" : exp['dates']['is_current'],
      })
    return experience
  
  def __parse_courses (self,data):
    data = data['data']['certifications']
    if len(data) == 0:
      return []
    
    courses = []
    for course in data:
      courses.append({
        "degree" : course,
      })
    return courses
  
  def parse_resume(self,url):
    data = self.__upload_document(url)
    return {
      "education" : self.__parse_education(data),
      "experience" : self.__parse_experience(data),
      "courses" : self.__parse_courses(data)
    }
