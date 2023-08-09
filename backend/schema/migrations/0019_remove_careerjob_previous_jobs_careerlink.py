# Generated by Django 4.1.9 on 2023-07-09 17:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0018_alter_skillproficiency_title_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='careerjob',
            name='previous_jobs',
        ),
        migrations.CreateModel(
            name='CareerLink',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source', to='schema.careerjob')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target', to='schema.careerjob')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
