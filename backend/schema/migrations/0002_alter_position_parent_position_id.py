# Generated by Django 4.1.9 on 2023-06-12 01:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schema', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='parent_position_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='schema.position'),
        ),
    ]
