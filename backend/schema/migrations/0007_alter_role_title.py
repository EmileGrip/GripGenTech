# Generated by Django 4.1.9 on 2023-06-16 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0006_alter_role_job_profile_id_alter_role_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
