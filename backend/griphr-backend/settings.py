"""
Django settings for griphr-backend project.

Based on 'django-admin startproject' using Django 2.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import posixpath

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Get all Needed environment variables 
env_vars = {
    "POSTGRES_DB": os.environ.get('POSTGRES_DB'),
    "POSTGRES_USER" : os.environ.get('POSTGRES_USER'),
    "POSTGRES_PASSWORD" : os.environ.get('POSTGRES_PASSWORD'),
    "POSTGRES_HOST" : os.environ.get('POSTGRES_HOST'),
    "POSTGRES_PORT" : os.environ.get('POSTGRES_PORT'),
    "NEO4J_BOLT_URL" : os.environ.get('NEO4J_BOLT_URL'),
    "EMAIL_HOST" : os.environ.get('EMAIL_HOST'),
    "EMAIL_PORT" : os.environ.get('EMAIL_PORT'),
    "EMAIL_HOST_USER" : os.environ.get('EMAIL_HOST_USER'),
    "DEFAULT_FROM_EMAIL" : os.environ.get('DEFAULT_FROM_EMAIL'),
    "EMAIL_AUTH_TYPE" :  os.environ.get('EMAIL_AUTH_TYPE'),
    "EMAIL_HOST_PASSWORD" : os.environ.get('EMAIL_HOST_PASSWORD'),
    "GRIP_HOST":os.environ.get('GRIP_HOST'),
    "AWS_ACCESS_KEY_ID":os.environ.get('AWS_ACCESS_KEY_ID'),
    "AWS_SECRET_ACCESS_KEY":os.environ.get('AWS_SECRET_ACCESS_KEY'),
    "AWS_STORAGE_BUCKET_NAME":os.environ.get('AWS_STORAGE_BUCKET_NAME'),
    "AFFINDA_TOKEN":os.environ.get('AFFINDA_TOKEN'),
    "AFFINDA_ORGANISATION":os.environ.get('AFFINDA_ORGANISATION'),
    "AFFINDA_WORKSPACE":os.environ.get('AFFINDA_WORKSPACE'),
    "AFFINDA_COLLECTION":os.environ.get('AFFINDA_COLLECTION'),
    "OPENAI_API_KEY":os.environ.get('OPENAI_API_KEY'),
    "SECRET_KEY":os.environ.get('SECRET_KEY'),
    "SITE_DOMAIN":os.environ.get('SITE_DOMAIN'),
    "DEBUG":os.environ.get('DEBUG'),
    'CLOUDFLARE_TURNSTILE_SECRET':os.environ.get('CLOUDFLARE_TURNSTILE_SECRET'),
    "STRIPE_PUBLISHABLE_KEY":os.environ.get('STRIPE_PUBLISHABLE_KEY'),
    "STRIPE_SECRET_KEY":os.environ.get('STRIPE_SECRET_KEY'),
    "STRIPE_WEBHOOK_SECRET":os.environ.get('STRIPE_WEBHOOK_SECRET'),
    "UDEMY_CLIENT_ID":os.environ.get('UDEMY_CLIENT_ID'),
    "UDEMY_CLIENT_SECRET":os.environ.get('UDEMY_CLIENT_SECRET'),
    "GOOGLE_OAUTH2_CLIENT_ID":os.environ.get('GOOGLE_OAUTH2_CLIENT_ID'),
    "GOOGLE_OAUTH2_CLIENT_SECRET":os.environ.get('GOOGLE_OAUTH2_CLIENT_SECRET'),
    "AZURE_OAUTH2_CLIENT_ID":os.environ.get('AZURE_OAUTH2_CLIENT_ID'),
    "AZURE_OAUTH2_TENANT_ID":os.environ.get('AZURE_OAUTH2_TENANT_ID'),
    "AZURE_OAUTH2_CLIENT_SECRET_VALUE":os.environ.get('AZURE_OAUTH2_CLIENT_SECRET_VALUE'),
    "AZURE_OAUTH2_CLIENT_SECRET_ID":os.environ.get('AZURE_OAUTH2_CLIENT_SECRET_ID'),
    "REDIS_HOST":os.environ.get("REDIS_HOST"),
    "REDIS_PORT":os.environ.get("REDIS_PORT")
}
#iterate through all environment variables and check if they are set
not_set = []
for key, value in env_vars.items():
    if value is None:
        not_set.append(key)
if len(not_set) > 0:
    raise Exception("Error : the following environment variables are not set : " + str(not_set))
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env_vars["SECRET_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if env_vars["DEBUG"] == "true" else False

EMAIL_INVITATION_TEMPLATE = "user/invitation_template.html"
EMAIL_PASSWORD_RESET_TEMPLATE = "token_auth/password_reset_template.html"
EMAIL_CONFIRMATION_TEMPLATE = "token_auth/confirmation_template.html"

CLOUDFLARE_TURNSTILE_SECRET= env_vars["CLOUDFLARE_TURNSTILE_SECRET"]

SITE_DOMAIN = env_vars["SITE_DOMAIN"]
GRIP_HOST= env_vars["GRIP_HOST"]
ALLOWED_HOSTS = [GRIP_HOST, SITE_DOMAIN, 'localhost', '127.0.0.1']

# Application references
# https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-INSTALLED_APPS
INSTALLED_APPS = [
    'company',
    'user',
    'schema',
    'token_auth',
    'experience',
    'education',
    'search',
    'job_profile',
    'skill_profile',
    'skill_proficiency',
    'role',
    'analytics',
    'course',
    'careerpath',
    'files',
    'skill_wish',
    'recommendations',
    'job_vacancy',
    'vacancy_role',
    'vacancy_skill',
    'project_vacancy',
    'endorsement',
    'subscription',
    'learning_matching',
    # Add your apps here to enable them
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'django_neomodel',
    'corsheaders',
    "storages",
    'oauthlogin',
]
# AUTHENTICATION_BACKENDS = (
#     'oauth2_provider.backends.OAuth2Backend',
#     'django.contrib.auth.backends.ModelBackend',
# )
# Middleware framework
# https://docs.djangoproject.com/en/2.1/topics/http/middleware/
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]
CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'griphr-backend.urls'

# Template configuration
# https://docs.djangoproject.com/en/2.1/topics/templates/
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'griphr-backend.wsgi.application'
# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
DATABASES = {
    #'default': {
    #    'ENGINE': 'django.db.backends.sqlite3',
    #    'NAME': 'postgres.sqlite3',
    #},
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env_vars["POSTGRES_DB"],
        'USER': env_vars["POSTGRES_USER"],
        'PASSWORD': env_vars["POSTGRES_PASSWORD"],
        'HOST': env_vars["POSTGRES_HOST"],
        'PORT': env_vars["POSTGRES_PORT"],
    }
}

NEOMODEL_NEO4J_BOLT_URL = env_vars["NEO4J_BOLT_URL"]

DEBUG = True
AUTH_USER_MODEL = "schema.GripUser" 
# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC' 
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['static']))


# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env_vars["GOOGLE_OAUTH2_CLIENT_ID"]
# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env_vars["GOOGLE_OAUTH2_CLEINT_SECRET"]
# OAUTH2_PROVIDER = {
#     'SCOPES': {'read', 'write', 'openid'},
# }
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'token_auth.backends.JWTAuthentication',
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        # 'token_auth.backends.start_authentication',     
    ),
    'EXCEPTION_HANDLER': 'token_auth.exceptions.core_exception_handler',
}
JWT_EXPIRATION_DAYS = 30

PASSWORD_RESET_TIMEOUT = 3600

#EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'
#EMAIL_FILE_PATH=BASE_DIR+'/tmp/django-email-dev'

EMAIL_BACKEND= 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env_vars["EMAIL_HOST"]
EMAIL_HOST_USER = env_vars["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = env_vars["EMAIL_HOST_PASSWORD"]
EMAIL_PORT = env_vars["EMAIL_PORT"]
#use tls if you use aws service, otherwise use ssl
if  env_vars["EMAIL_AUTH_TYPE"] == "ssl":
    EMAIL_USE_SSL = True
elif env_vars["EMAIL_AUTH_TYPE"] == "tls":
    EMAIL_USE_TLS = True 
else:
    raise Exception("EMAIl_AUTH_TYPE should be ssl or tls only")
DEFAULT_FROM_EMAIL = env_vars["DEFAULT_FROM_EMAIL"]


# s3 configuration
if  os.environ.get('AWS_S3_ENDPOINT_URL', None) is not None:
    AWS_S3_ENDPOINT_URL=os.environ.get('AWS_S3_ENDPOINT_URL', None)
if  os.environ.get('AWS_S3_REGION_NAME', None) is not None:
    AWS_S3_REGION_NAME=os.environ.get('AWS_S3_REGION_NAME', None)
AWS_ACCESS_KEY_ID=env_vars["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY=env_vars["AWS_SECRET_ACCESS_KEY"]
AWS_STORAGE_BUCKET_NAME=env_vars["AWS_STORAGE_BUCKET_NAME"]
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AFFINDA_TOKEN = env_vars["AFFINDA_TOKEN"]
AFFINDA_ORGANISATION = env_vars["AFFINDA_ORGANISATION"]
AFFINDA_WORKSPACE = env_vars["AFFINDA_WORKSPACE"]
AFFINDA_COLLECTION = env_vars["AFFINDA_COLLECTION"]

# CACHES = {
#     "default": {
#         "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
#         "LOCATION": "unique-snowflake",
#     }
# }
REDIS_HOST = env_vars["REDIS_HOST"]
REDIS_PORT = env_vars["REDIS_PORT"]
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
    }
}

# Cache time to live is 15 minutes.
CACHE_TTL = 60 * 15

# Celery settings
CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'
CELERY_BEAT_SCHEDULE = {
    'process-new-company-every-10-seconds': {
        'task': 'company.tasks.process_new_company',
        'schedule': 10.0,
        'args': ('default company', 0),
    },
}

OPENAI_API_KEY = env_vars["OPENAI_API_KEY"]

#search indeces in neo4j database

SEARCH_INDECES = {
    "occupation": {
        "label":"Occupation",
        "index":"occupation_list",
        "fields":["preferredLabel","description","altLabels"],
        "global":True
    },
    "skill": {
        "label":"Skill",
        "index":"skill_list",
        "fields":["preferredLabel","description","altLabels"],
        "global":True
    },
    "job_title": {
        "label":"JobTitle",
        "index":"job_title_list",
        "fields":["label"],
        "global":False
    },
    "job_posting": {
        "label":"JobPosting",
        "index":"job_posting_list",
        "fields":["job_title"],
        "global":False
    },
    "user":{
        "label":"Person",
        "index":"person_list",
        "fields":["name"],
        "global":False
    }
    
}


# Stripe settings
STRIPE_PUBLISHABLE_KEY = env_vars["STRIPE_PUBLISHABLE_KEY"]
STRIPE_SECRET_KEY = env_vars["STRIPE_SECRET_KEY"]
# DJSTRIPE_WEBHOOK_SECRET = env_vars["DJSTRIPE_WEBHOOK_SECRET"]
# DJSTRIPE_FOREIGN_KEY_TO_FIELD = "id"
STRIPE_TEST_SECRET_KEY = STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET = env_vars["STRIPE_WEBHOOK_SECRET"]


PROVIDERS = {
    "udemy":{
        "class_name": "UdemyProvider",
        "description": "Udemy is an online learning and teaching marketplace with over 213,000 courses and 62 million students, offering a wide variety of categories and subcategories from business, design, personal development, and much more, where courses are designed, created, and published by independent instructors and learners can pay for each individual course.",
        "variables":{
            "UDEMY_CLIENT_ID": env_vars["UDEMY_CLIENT_ID"],
            "UDEMY_CLIENT_SECRET": env_vars["UDEMY_CLIENT_SECRET"]
        },
        "image": "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
    }
}

# OAuth2 
OAUTH_LOGIN_PROVIDERS = {
    "google":{
        "class": "token_auth.oauth.GoogleOAuthProvider",
        "kwargs":{
            "client_id": env_vars["GOOGLE_OAUTH2_CLIENT_ID"],
            "client_secret": env_vars["GOOGLE_OAUTH2_CLIENT_SECRET"],
        }
    },
    "azure":{
        "class": "token_auth.oauth.AzureOAuthProvider",
        "kwargs":{
            "client_id": env_vars["AZURE_OAUTH2_CLIENT_ID"],
            "tenant_id": env_vars["AZURE_OAUTH2_TENANT_ID"],
            "client_secret": env_vars["AZURE_OAUTH2_CLIENT_SECRET_ID"],
            "client_value_secret": env_vars["AZURE_OAUTH2_CLIENT_SECRET_VALUE"],
        }
    }
}
