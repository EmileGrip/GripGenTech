# Generated by Django 4.1.13 on 2024-01-18 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0013_rename_precentage_goalaction_percentage'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='skills',
            field=models.JSONField(null=True),
        ),
        migrations.DeleteModel(
            name='GoalSkill',
        ),
    ]