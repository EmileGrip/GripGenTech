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
        


@receiver(connection_created)
def my_function(sender, **kwargs):
    #import database credentials from settings.py
    if not cache.get('vectordb_loaded'):
        print("Database connection established, checking startup queries")
        try:
            from schema.models import Occupation
            from vectordb import vectordb
            from vectordb.models import Vector
            occupations= Occupation.nodes.all()
            num_occupations = len (occupations)
            num_vectors = Vector.objects.count()
            print(f"Number of vectors: {num_vectors}")
            print(f"Number of occupations: {num_occupations}")
            if num_vectors != num_occupations:
                for i,occ in enumerate(occupations):
                    print(f"{i+1} out of {num_occupations}")
                    try:
                        node_id = get_node_id(occ)
                        if not Vector.objects.filter(id=node_id).exists():
                            vectordb.add_text(text=f"{occ.preferredLabel} : {occ.description}" if occ.description else occ.preferredLabel ,
                                            id=node_id,
                                            metadata={"preferred_label": occ.preferredLabel, "isco_group": occ.iscoGroup})
                    except IntegrityError:
                        pass
                    except ProgrammingError as e:
                        print(f"Vector Database error, matching functionalities may not work properly : {e}")
                        break
            
            cache.set('vectordb_loaded', True, None)
        except Exception as e:
            print(f"Startup error, make sure that all models have been created first\nError : {e}")

