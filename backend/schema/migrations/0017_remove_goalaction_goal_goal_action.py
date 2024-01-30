# Generated by Django 4.1.13 on 2024-01-25 13:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0016_alter_goalaction_goal'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goalaction',
            name='goal',
        ),
        migrations.AddField(
            model_name='goal',
            name='action',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='goal_action', to='schema.goalaction'),
        ),
    ]
