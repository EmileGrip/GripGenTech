# Generated by Django 4.1.12 on 2024-01-10 18:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("schema", "0007_merge_20240110_1415"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gripuser",
            name="first_name",
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name="gripuser",
            name="last_name",
            field=models.CharField(max_length=50),
        ),
    ]