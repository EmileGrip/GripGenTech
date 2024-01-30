import logging

from django.conf import settings
from schema.models import Company
from celery import Celery, current_app, shared_task


app = Celery('griphr-backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@shared_task
def process_new_company(company_name, company_id):
    print(f'process_new_company {company_name} {company_id}') 
    logging.info(f'process_new_company {company_name} {company_id}')
    # change company name
    Company.objects.filter(id=company_id).update(name=company_name + " Updated")
    print(f'Company {company_name} updated')
    