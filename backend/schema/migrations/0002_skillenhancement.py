# Generated by Django 4.1.12 on 2023-12-26 14:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("schema", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SkillEnhancement",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.CharField(max_length=1000, null=True)),
                ("status", models.CharField(max_length=50)),
                ("level", models.IntegerField()),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(null=True)),
                ("image", models.FileField(null=True, upload_to="")),
                ("reference_id", models.CharField(max_length=100, null=True)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "provider",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schema.companyprovider",
                    ),
                ),
                (
                    "skill",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schema.skillproficiency",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
