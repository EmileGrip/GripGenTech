# Generated by Django 4.1.9 on 2023-07-31 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0020_course_company_id_education_company_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gripuser',
            name='location',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
