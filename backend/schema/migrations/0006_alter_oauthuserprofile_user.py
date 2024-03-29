# Generated by Django 4.1.12 on 2024-01-03 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("schema", "0005_oauthuserprofile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="oauthuserprofile",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="oauth_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
