from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import GUserManager
from neomodel import StructuredNode, StringProperty, UniqueIdProperty,IntegerProperty, RelationshipTo
from django.contrib.contenttypes.fields import GenericForeignKey,GenericRelation
from django.contrib.contenttypes.models import ContentType
# Create your models here.

##########################################
##              Postgres Models            ##
##########################################
#define file model

class GripFile(models.Model):
    #file id
    id = models.AutoField(primary_key=True)
    #file name
    name = models.CharField(max_length=50, null=False)
    #file path
    path = models.CharField(max_length=100, null=False)
    #file type
    type = models.CharField(max_length=20, null=False)
    #file created at
    created_at = models.DateTimeField(auto_now_add=True)
    #user id
    user = models.ForeignKey('GripUser', on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name
    

#define the company model
class Company(models.Model):
    #company id
    id = models.AutoField(primary_key=True)
    #company name
    name = models.CharField(max_length=50, null=False)
    #company description
    description = models.CharField(max_length=200, null=True)
    #company logo, foriegn key to file model
    logo = models.ForeignKey(GripFile, on_delete=models.CASCADE, null=True)
    #company website
    website = models.CharField(max_length=50, null=True)
    #linkedin
    linkedin = models.CharField(max_length=50, null=True)
    #industry
    industry = models.CharField(max_length=50, null=True)
    #company address1
    address1 = models.CharField(max_length=100, null=True)
    #company address2
    address2 = models.CharField(max_length=100, null=True)
    #state
    state = models.CharField(max_length=20, null=True)
    #company city
    city = models.CharField(max_length=20, null=True)
    #company country
    country = models.CharField(max_length=20, null=True)
    #company postal code
    postal_code = models.CharField(max_length=10, null=True)
    #company phone number
    phone = models.CharField(max_length=20, null=True)
    #company created at
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    

#create user model inheriting from django's user model
class GripUser(AbstractUser):
    #add additional fields to user
    #user id
    id = models.AutoField(primary_key=True)
    #first name
    first_name = models.CharField(max_length=20, null=False)
    #last name
    last_name = models.CharField(max_length=20, null=False)
    #email
    email = models.EmailField(max_length=50, null=False, unique=True)
    #gender
    gender = models.CharField(max_length=10, null=False)
    #forien key to company model
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    #phone number
    phone = models.CharField(max_length=20, null=True)
    #country
    location = models.CharField(max_length=150, null=True)
    #created at 
    created_at = models.DateTimeField(auto_now_add=True)
    #profile picture, foriegn key to file model
    profile_picture = models.ForeignKey(GripFile, on_delete=models.CASCADE, null=True, related_name='profile_pictures')
    #resume, foriegn key to file model, allow null
    resume = models.ForeignKey(GripFile, on_delete=models.CASCADE, null=True, related_name='resume')
    #role
    system_role = models.CharField(max_length=20, null=False)
    #person id 
    person_id = models.CharField(max_length=50, null=True)
    #define username field
    USERNAME_FIELD = 'email'
    #define required fields
    REQUIRED_FIELDS = ['first_name', 'last_name']
    #define manager
    objects = GUserManager()
    def __str__(self):
        return self.email
    
    

#define token model

class Token(models.Model):
    #token id
    id = models.AutoField(primary_key=True)
    #token
    token = models.CharField(max_length=200, null=False)
    #token created at
    created_at = models.DateTimeField(auto_now_add=True)
    #expire at
    expire_at = models.DateTimeField(null=False)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #is active
    is_active = models.BooleanField(default=True)
    #type
    type = models.CharField(max_length=20, null=False)
    def __str__(self):
        return self.token
    
#define experience model

class Experience(models.Model):
    #experience id
    id = models.AutoField(primary_key=True)
    #experience title
    title = models.CharField(max_length=50, null=False)
    #experience description
    description = models.CharField(max_length=500, null=True)
    #company (just name)
    company = models.CharField(max_length=50, null=False)
    #experience start date
    start_date = models.DateField(null=False)
    #experience end date
    end_date = models.DateField(null=True)
    #experience is current
    is_current = models.BooleanField(default=False)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    def __str__(self):
        return f"{self.title} at {self.company}"
    
#define education model

class Education(models.Model):
    #education id
    id = models.AutoField(primary_key=True)
    #education degree
    degree = models.CharField(max_length=50, null=False)
    #education level
    level = models.CharField(max_length=50, null=False)
    #institution (just name)
    institution = models.CharField(max_length=50, null=False)
    #education start date
    start_date = models.DateField(null=True)
    #education end date
    end_date = models.DateField(null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    def __str__(self):
        return f"{self.level} of {self.degree} at {self.institution}"
    
#define course model

class Course(models.Model):
    #course id
    id = models.AutoField(primary_key=True)
    #course title
    degree = models.CharField(max_length=50, null=False)
    #institution (just name)
    institution = models.CharField(max_length=50, null=True)
    #course start date
    start_date = models.DateField(null=True)
    #course end date
    end_date = models.DateField(null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #set app label
    def __str__(self):
        return self.title
    
#define skill proficiency model
class SkillProficiency(models.Model):
    #skill proficiency id
    id = models.AutoField(primary_key=True)
    #skill title
    title = models.CharField(max_length=100, null=False)
    #skill description
    description = models.CharField(max_length=700, null=True)
    #skill proficiency level
    level = models.IntegerField(null=False)
    #skill id
    skill_id = models.CharField(max_length=50, null=False)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return f"{self.skill_id} at level {self.level}"
    
#define skill proficiency model
class SkillWish(models.Model):
    #skill proficiency id
    id = models.AutoField(primary_key=True)
    #skill title
    title = models.CharField(max_length=100, null=False)
    #skill description
    description = models.CharField(max_length=700, null=True)
    #skill id
    skill_id = models.CharField(max_length=50, null=False)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return f"{self.skill_id}"
    
#define job profile model 

class JobProfile(models.Model):
    #job profile id
    id = models.AutoField(primary_key=True)
    #job profile title
    title = models.CharField(max_length=50, null=False)
    #job id
    job_id = models.CharField(max_length=50, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #set app label
    def __str__(self):
        return self.title
    
#define skill requirement model

class SkillRequirement(models.Model):
    #skill requirement id
    id = models.AutoField(primary_key=True)
    #skill title 
    title = models.CharField(max_length=100, null=False)
    #skill description
    description = models.CharField(max_length=700, null=True)
    #skill requirement level
    level = models.IntegerField(null=False)
    #skill id
    skill_id = models.CharField(max_length=50, null=False)
    #job profile id
    job_profile_id = models.ForeignKey(JobProfile, on_delete=models.CASCADE, null=False)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    def __str__(self):
        return f"{self.skill_id} at level {self.level}"
        
#define career job model 

class CareerJob(models.Model):
    #career job id
    id = models.AutoField(primary_key=True)
    #career job profile id
    job_profile_id = models.ForeignKey(JobProfile, on_delete=models.CASCADE, null=True,blank=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    
    def __str__(self):
        return f"{self.user_id} at {self.job_profile_id}"
    
class CareerLink(models.Model):
    id = models.AutoField(primary_key=True)
    #source careerjob
    source = models.ForeignKey(CareerJob, on_delete=models.CASCADE, null=False,related_name='source')
    #target careerjob
    target = models.ForeignKey(CareerJob, on_delete=models.CASCADE, null=False,related_name='target')
    #user_id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    def __str__(self):
        return f"{self.source} -> {self.target}"
    
#define role model
class Role(models.Model):
    #role id
    id = models.AutoField(primary_key=True)
    #company id
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #job profile id
    job_profile_id = models.ForeignKey(JobProfile, on_delete=models.SET_NULL, null=True, blank=True)
    #department
    department = models.CharField(max_length=50, null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=True, blank=True)
    #title
    title = models.CharField(max_length=50, null=True)
    #parend role id
    parent_role = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    #selected role id 
    selected_role_id = models.IntegerField(null=True)
    allign = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.title} at {self.company_id}"
 
#define vacancy role
class VacancyRole(models.Model):
    #role id
    id = models.AutoField(primary_key=True)
    #company id
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #job profile id
    job_profile = models.ForeignKey(JobProfile, on_delete=models.SET_NULL, null=True, blank=True)
    #start_date
    start_date = models.DateField(null=False)
    #end_date
    end_date = models.DateField(null=True)
    #hours (full time or part time)
    hours = models.CharField(max_length=50, null=True)
    #salary
    salary = models.IntegerField(null=True)
    #description
    description = models.CharField(max_length=700, null=True)
    #content_type
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    #object_id
    object_id = models.PositiveIntegerField()
    #content_object
    vacancy = GenericForeignKey('content_type', 'object_id')
    
    
    def __str__(self):
        return f"{self.job_profile.title} at {self.company}"
    
#define vacancy skill
class VacancySkill(models.Model):
    #role id
    id = models.AutoField(primary_key=True)
    #title
    title = models.CharField(max_length=50, null=False)
    #company id
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #vacancy_role
    vacancy_role = models.ForeignKey(VacancyRole, on_delete=models.CASCADE, null=False, related_name='skills')
    #skill
    skill_ref = models.CharField(max_length=50, null=False)
        
    def __str__(self):
        return f"{self.title} at {self.company}"   
#define job_post model
class JobVacancy(models.Model):
    #role id
    id = models.AutoField(primary_key=True)
    #company id
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #department
    department = models.CharField(max_length=50, null=False)
    #user id
    user = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #ref_post_id
    ref_post_id = models.CharField(max_length=50, null=False)
    #status
    status = models.CharField(max_length=50, null=False)
    #role relationship
    roles = GenericRelation(VacancyRole)
    def __str__(self):
        return f"Job Post in {self.job_profile.title} department at {self.company.name}"
    
#define project model

class ProjectVacancy(models.Model):
    #role id
    id = models.AutoField(primary_key=True)
    #company id
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    #user id
    user = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #placeholder1
    placeholder1 = models.CharField(max_length=50, null=False)
    #placeholder2
    placeholder2 = models.CharField(max_length=50, null=False)
    #start_date
    start_date = models.DateField(null=False)
    #end_date
    end_date = models.DateField(null=True)
    #description
    description = models.CharField(max_length=700, null=True)
    #status
    status = models.CharField(max_length=50, null=False)
    #role relationship
    roles = GenericRelation(VacancyRole)
    def __str__(self):
        return f"Project \"{self.placeholder1}\" at {self.company.name}"
    

##########################################
##              Neo4j Models            ##
##########################################
#documentation: https://neo4django.readthedocs.io/en/latest/writing-models.html

#define skill group model on neo4j
class SkillGroup(StructuredNode):
    #skill group id
    conceptUri = UniqueIdProperty()
    #skill group preferred label
    preferredLabel = StringProperty(null=False)
    #skill group description
    description = StringProperty(null=True)
    def __str__(self):
        return self.preferredLabel
    
#define ISCOGroup model on neo4j

class ISCOGroup(StructuredNode):
    #skill ISCOGroup id
    conceptUri = UniqueIdProperty()
    #skill ISCOGroup preferred label
    preferredLabel = StringProperty(null=False)
    #skill ISCOGroup description
    description = StringProperty(null=True)
    def __str__(self):
        return self.preferredLabel
    
#define skill model on neo4j
class Skill(StructuredNode):
    #skill id
    conceptUri =StringProperty(null=False)
    #skill preferred label
    preferredLabel = StringProperty(null=False)
    #skill description
    description = StringProperty(null=True)
    #skill type 
    type = StringProperty(null=False)
    #skill alternative labels
    altLabels = StringProperty(null=True)
    #skill relationships
    #related skills
    RelatedTo = RelationshipTo('Skill', 'RelatedTo')
    #part of groups
    PartOfGroup = RelationshipTo("SkillGroup", 'PartOfGroup')
    def __str__(self):
        return self.preferredLabel
    
#define occupation model on neo4j

class Occupation(StructuredNode):
    #Occupation id
    conceptUri =StringProperty(null=False)
    #Occupation preferred label
    preferredLabel = StringProperty(null=False)
    #Occupation description
    description = StringProperty(null=True)
    #Occupation alternative labels
    altLabels = StringProperty(null=True)
    iscoGroup = StringProperty(null=True)
    #relationship
    #occupation skills
    hasSkill = RelationshipTo("Skill", 'hasSkill')
    #occupation experiences
    PartOfGroup = RelationshipTo("ISCOGroup", 'PartOfGroup')
    
    def __str__(self):
        return self.preferredLabel
    
#define jobTitle model on neo4j

class JobTitle(StructuredNode):

    #jobTitle label
    label = StringProperty( null=False)
    #relationship
    #jobTitle relation to occupation
    SimilarTo = RelationshipTo("Occupation", 'SimilarTo')
    def __str__(self):
        return self.label

#define person model on neo4j

class Person(StructuredNode):
    #person name
    name = StringProperty(null=False)
    #person company id 
    company = StringProperty(null=True)
    #relationship
    #person skills
    HasSkill = RelationshipTo("Skill", 'HasSkill')
    #person experiences
    HasJob = RelationshipTo("JobTitle", 'HasJob')
    
    def __str__(self):
        return self.name
    
class JobPosting(StructuredNode):
    
    #company_name
    company_name = StringProperty(null=False)
    #job_title
    job_title = StringProperty(null=False)
    #HasExtractedSkill
    HasExtractedSkill = RelationshipTo("Skill", 'HasExtractedSkill')
    #BestMatchTitle
    BestMatchTitle = RelationshipTo("Occupation", 'BestMatchTitle')
    
    
