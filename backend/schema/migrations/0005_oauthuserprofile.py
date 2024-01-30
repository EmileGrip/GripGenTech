# Generated by Django 4.1.12 on 2024-01-03 11:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("schema", "0004_skillenhancement_price_detail"),
    ]

    operations = [
        migrations.CreateModel(
            name="OAuthUserProfile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("uid", models.CharField(max_length=255, unique=True)),
                ("provider", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255)),
                (
                    "user",
                    models.OneToOneField(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="oauth_profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]