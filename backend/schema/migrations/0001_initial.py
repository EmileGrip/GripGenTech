# Generated by Django 4.1.12 on 2023-12-25 16:09

from django.conf import settings
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="GripUser",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={
                            "unique": "A user with that username already exists."
                        },
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[
                            django.contrib.auth.validators.UnicodeUsernameValidator()
                        ],
                        verbose_name="username",
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=20)),
                ("last_name", models.CharField(max_length=20)),
                ("email", models.EmailField(max_length=50, unique=True)),
                ("gender", models.CharField(max_length=10)),
                ("phone", models.CharField(max_length=20, null=True)),
                ("location", models.CharField(max_length=150, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("system_role", models.CharField(max_length=20)),
                ("person_id", models.CharField(max_length=50, null=True)),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="CareerJob",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name="Company",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=50)),
                ("description", models.CharField(max_length=200, null=True)),
                ("website", models.CharField(max_length=50, null=True)),
                ("linkedin", models.CharField(max_length=50, null=True)),
                ("industry", models.CharField(max_length=50, null=True)),
                ("address1", models.CharField(max_length=100, null=True)),
                ("address2", models.CharField(max_length=100, null=True)),
                ("state", models.CharField(max_length=20, null=True)),
                ("city", models.CharField(max_length=20, null=True)),
                ("country", models.CharField(max_length=20, null=True)),
                ("postal_code", models.CharField(max_length=10, null=True)),
                ("phone", models.CharField(max_length=20, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("status", models.CharField(max_length=255, null=True)),
                ("start_date", models.DateTimeField(null=True)),
                ("end_date", models.DateTimeField(null=True)),
                ("is_trial", models.BooleanField(default=False)),
                ("plan", models.CharField(default="trial", max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="JobProfile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=50)),
                ("job_id", models.CharField(max_length=50)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="VacancyRole",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(null=True)),
                ("hours", models.CharField(max_length=50, null=True)),
                ("salary", models.CharField(max_length=50, null=True)),
                ("description", models.CharField(max_length=700, null=True)),
                ("object_id", models.PositiveIntegerField()),
                ("role_ref_id", models.CharField(max_length=10)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contenttypes.contenttype",
                    ),
                ),
                (
                    "job_profile",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="schema.jobprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="VacancySkill",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=50)),
                ("skill_ref", models.CharField(max_length=50)),
                ("level", models.IntegerField()),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "vacancy_role",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="skills",
                        to="schema.vacancyrole",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Token",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("token", models.CharField(max_length=200)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("expire_at", models.DateTimeField()),
                ("is_active", models.BooleanField(default=True)),
                ("type", models.CharField(max_length=20)),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SkillWish",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.CharField(max_length=700, null=True)),
                ("skill_id", models.CharField(max_length=50)),
                (
                    "company_id",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schema.company",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SkillRequirement",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.CharField(max_length=700, null=True)),
                ("level", models.IntegerField()),
                ("skill_id", models.CharField(max_length=50)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "job_profile_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schema.jobprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SkillProficiency",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.CharField(max_length=700, null=True)),
                ("level", models.IntegerField()),
                ("skill_id", models.CharField(max_length=50)),
                (
                    "company_id",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schema.company",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Role",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("department", models.CharField(max_length=50, null=True)),
                ("title", models.CharField(max_length=50, null=True)),
                ("selected_role_id", models.IntegerField(null=True)),
                ("allign", models.CharField(max_length=50, null=True)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "job_profile_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="schema.jobprofile",
                    ),
                ),
                (
                    "parent_role",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="schema.role",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProjectVacancy",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=50)),
                ("department", models.CharField(max_length=50)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(null=True)),
                ("description", models.CharField(max_length=700, null=True)),
                ("status", models.CharField(max_length=50)),
                ("ref_post_id", models.CharField(max_length=50)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PaymentIntent",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("stripe_customer", models.CharField(max_length=255)),
                ("sub_id", models.CharField(max_length=255)),
                ("quantity", models.PositiveBigIntegerField()),
                ("price_id", models.CharField(max_length=255)),
                ("payment_status", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="payment_intents",
                        to="schema.company",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="payment_intents",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="JobVacancy",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("department", models.CharField(max_length=50, null=True)),
                ("ref_post_id", models.CharField(max_length=50)),
                ("status", models.CharField(max_length=50)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
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
        migrations.CreateModel(
            name="GripFile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=50)),
                ("path", models.CharField(max_length=100)),
                ("type", models.CharField(max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Experience",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=50)),
                ("description", models.CharField(max_length=500, null=True)),
                ("company", models.CharField(max_length=50)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(null=True)),
                ("is_current", models.BooleanField(default=False)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Endorsement",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("timecreated", models.DateField(auto_now=True)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "endorser",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="endorsers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "skill",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="endorsements",
                        to="schema.skillproficiency",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Education",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("degree", models.CharField(max_length=50)),
                ("level", models.CharField(max_length=50)),
                ("institution", models.CharField(max_length=50)),
                ("start_date", models.DateField(null=True)),
                ("end_date", models.DateField(null=True)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("degree", models.CharField(max_length=50)),
                ("institution", models.CharField(max_length=50, null=True)),
                ("start_date", models.DateField(null=True)),
                ("end_date", models.DateField(null=True)),
                (
                    "company_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CompanyProvider",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("active", models.BooleanField()),
                ("name", models.CharField(max_length=255)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="schema.company"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="company",
            name="logo",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="schema.gripfile",
            ),
        ),
        migrations.CreateModel(
            name="CareerLink",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="source",
                        to="schema.careerjob",
                    ),
                ),
                (
                    "target",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="target",
                        to="schema.careerjob",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="careerjob",
            name="job_profile_id",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="schema.jobprofile",
            ),
        ),
        migrations.AddField(
            model_name="careerjob",
            name="user_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="gripuser",
            name="company_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="schema.company",
            ),
        ),
        migrations.AddField(
            model_name="gripuser",
            name="groups",
            field=models.ManyToManyField(
                blank=True,
                help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                related_name="user_set",
                related_query_name="user",
                to="auth.group",
                verbose_name="groups",
            ),
        ),
        migrations.AddField(
            model_name="gripuser",
            name="profile_picture",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="profile_pictures",
                to="schema.gripfile",
            ),
        ),
        migrations.AddField(
            model_name="gripuser",
            name="resume",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="resume",
                to="schema.gripfile",
            ),
        ),
        migrations.AddField(
            model_name="gripuser",
            name="user_permissions",
            field=models.ManyToManyField(
                blank=True,
                help_text="Specific permissions for this user.",
                related_name="user_set",
                related_query_name="user",
                to="auth.permission",
                verbose_name="user permissions",
            ),
        ),
    ]
