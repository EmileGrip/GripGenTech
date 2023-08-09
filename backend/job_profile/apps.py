from django.apps import AppConfig
from django.core.cache import cache
import pandas as pd
#import settings
from django.db.backends.signals import connection_created
from django.dispatch import receiver

class JobProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'job_profile'
        


@receiver(connection_created)
def my_function(sender, **kwargs):
    #import database credentials from settings.py
    if not cache.get('occupations'):
        print("Database connection established!")
        occupation_list = []
        from schema.models import Occupation
        occupations= Occupation.nodes.all()
        target_keys = ["preferredLabel","description","altLabels","conceptUri"]
        for occupation in occupations:
            occ = occupation.__dict__
            occupation_list.append({k:occ[k] for k in target_keys})
        occupation_list=pd.DataFrame([r.values() for r in occupation_list], columns=occupation_list[0].keys())
        occupation_list = (
        occupation_list[["conceptUri", "preferredLabel", "altLabels"]]
            .set_index(["conceptUri", "preferredLabel"])
            .apply(lambda x: x.str.split("\n").explode())
            .reset_index()
        )

        altlabels = occupation_list.altLabels.unique()
        preferredlabels = occupation_list.preferredLabel.unique()
        cache.set('occupations', {'altlabels':list(altlabels),'preferredlabels':list(preferredlabels)}, None)

