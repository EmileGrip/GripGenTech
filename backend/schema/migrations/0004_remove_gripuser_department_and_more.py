# Generated by Django 4.1.9 on 2023-06-16 20:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0003_rename_title_course_degree_remove_course_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gripuser',
            name='department',
        ),
        migrations.AddField(
            model_name='skillproficiency',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='schema.company'),
        ),
        migrations.AddField(
            model_name='skillrequirement',
            name='company_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='schema.company'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='skillwish',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='schema.company'),
        ),
    ]
