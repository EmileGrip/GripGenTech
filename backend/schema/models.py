from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import GUserManager
#from neo4django.db import models as neo_models
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
    #forien key to company model
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    #phone number
    phone = models.CharField(max_length=20, null=True)
    #country
    country = models.CharField(max_length=20, null=True)
    #city
    city = models.CharField(max_length=20, null=True)
    #address
    address = models.CharField(max_length=100, null=True)
    #postal code
    postal_code = models.CharField(max_length=10, null=True)
    #created at 
    created_at = models.DateTimeField(auto_now_add=True)
    #profile picture, foriegn key to file model
    profile_picture = models.ForeignKey(GripFile, on_delete=models.CASCADE, null=True, related_name='profile_pictures')
    #resume, foriegn key to file model, allow null
    resume = models.ForeignKey(GripFile, on_delete=models.CASCADE, null=True, related_name='resume')
    #is manager
    is_manager = models.BooleanField(default=False)
    #is staff
    is_staff = models.BooleanField(default=False)
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
    description = models.CharField(max_length=200, null=True)
    #company (just name)
    company = models.CharField(max_length=50, null=False)
    #experience start date
    start_date = models.DateField(null=False)
    #experience end date
    end_date = models.DateField(null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
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
    #education description
    description = models.CharField(max_length=200, null=True)
    #institution (just name)
    institution = models.CharField(max_length=50, null=False)
    #education start date
    start_date = models.DateField(null=False)
    #education end date
    end_date = models.DateField(null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    def __str__(self):
        return f"{self.level} of {self.degree} at {self.institution}"
    
#define course model

class Course(models.Model):
    #course id
    id = models.AutoField(primary_key=True)
    #course title
    title = models.CharField(max_length=50, null=False)
    #course description
    description = models.CharField(max_length=200, null=True)
    #institution (just name)
    institution = models.CharField(max_length=50, null=False)
    #course start date
    start_date = models.DateField(null=False)
    #course end date
    end_date = models.DateField(null=True)
    #user id
    user_id = models.ForeignKey(GripUser, on_delete=models.CASCADE, null=False)
    #set app label
    def __str__(self):
        return self.title
    
'''

##########################################
##              Neo4j Models            ##
##########################################
#documentation: https://neo4django.readthedocs.io/en/latest/writing-models.html

#define skill group model on neo4j
class SkillGroup(neo_models.NodeModel):
    #skill group id
    conceptUri = neo_models.IntegerProperty(primary_key=True)
    #skill group preferred label
    preferredLabel = neo_models.StringProperty(unique_index=True, null=False)
    #skill group description
    description = neo_models.StringProperty(null=True)
    def __str__(self):
        return self.preferredLabel
    
#define ISCOGroup model on neo4j

class ISCOGroup(neo_models.NodeModel):
    #skill ISCOGroup id
    conceptUri = neo_models.IntegerProperty(primary_key=True)
    #skill ISCOGroup preferred label
    preferredLabel = neo_models.StringProperty(unique_index=True, null=False)
    #skill ISCOGroup description
    description = neo_models.StringProperty(null=True)
    def __str__(self):
        return self.preferredLabel
    
#define skill model on neo4j
class Skill(neo_models.NodeModel):
    #skill id
    conceptUri = neo_models.IntegerProperty(primary_key=True)
    #skill preferred label
    preferredLabel = neo_models.StringProperty(unique_index=True, null=False)
    #skill description
    description = neo_models.StringProperty(null=True)
    #skill type 
    type = neo_models.StringProperty(null=False)
    #skill alternative labels
    altLabels = neo_models.StringProperty(null=True)
    #skill relationships
    #related skills
    RelatedTo = neo_models.Relationship('self', 'RelatedTo')
    #part of groups
    PartOfGroup = neo_models.Relationship(SkillGroup, 'PartOfGroup')
    def __str__(self):
        return self.preferredLabel
    
#define occupation model on neo4j

class Occupation(neo_models.NodeModel):
    #Occupation id
    conceptUri = neo_models.IntegerProperty(primary_key=True)
    #Occupation preferred label
    preferredLabel = neo_models.StringProperty(unique_index=True, null=False)
    #Occupation description
    description = neo_models.StringProperty(null=True)
    #Occupation alternative labels
    altLabels = neo_models.StringProperty(null=True)
    #relationship
    #occupation skills
    HasSkill = neo_models.Relationship(Skill, 'HasSkill')
    #occupation experiences
    PartOfGroup = neo_models.Relationship(ISCOGroup, 'PartOfGroup')
    
    def __str__(self):
        return self.preferredLabel
    
#define jobTitle model on neo4j

class JobTitle(neo_models.NodeModel):
    #jobTitle id
    id = neo_models.IntegerProperty(primary_key=True)
    #jobTitle label
    label = neo_models.StringProperty(unique_index=True, null=False)
    #relationship
    #jobTitle relation to occupation
    SimilarTo = neo_models.Relationship(Occupation, 'SimilarTo')
    def __str__(self):
        return self.label

#define person model on neo4j

class Person(neo_models.NodeModel):
    #person id
    id = neo_models.IntegerProperty(primary_key=True)
    #person name
    name = neo_models.StringProperty(null=False)
    #person reference id
    reference_id = neo_models.IntegerProperty(unique_index=True, null=False)
    #person company id 
    company_id = neo_models.IntegerProperty(null=False)
    #relationship
    #person skills
    HasSkill = neo_models.Relationship(Skill, 'HasSkill')
    #person experiences
    HasJob = neo_models.Relationship(JobTitle, 'HasJob')
    
    def __str__(self):
        return self.name
    

    
    
'''