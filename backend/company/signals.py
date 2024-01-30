from django.db import transaction
from celery import current_app
from django.db.models.signals import post_save
from django.dispatch import receiver
from schema.models import Company
from .tasks import process_new_company

        
@receiver(post_save, sender=Company)
def company_created(sender, instance, created, **kwargs):
    print(f'Signal connected for Company {instance.name}')
    if created:
        print(f'Company {instance.name} created')
        
        # Schedule the task with arguments after the current transaction is committed
        transaction.on_commit(lambda: process_new_company.delay(instance.name, instance.id))
                 