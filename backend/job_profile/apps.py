from django.apps import AppConfig
from django.core.cache import cache
#import settings
from django.db.backends.signals import connection_created
from django.db import IntegrityError
from django.dispatch import receiver
from django.db.utils import ProgrammingError
def get_node_id(node):
    #split element_id 
    return node.element_id.split(":")[-1]
class JobProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'job_profile'
        