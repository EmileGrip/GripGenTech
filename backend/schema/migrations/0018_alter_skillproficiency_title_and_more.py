# Generated by Django 4.1.9 on 2023-07-03 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0017_alter_skillproficiency_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skillproficiency',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='skillrequirement',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='skillwish',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
