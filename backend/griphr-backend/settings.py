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
    "EMAIL_HOST_PASSWORD" : os.environ.get('EMAIL_HOST_PASSWORD'),
    "GRIP_HOST":os.environ.get('GRIP_HOST'),
    "AWS_ACCESS_KEY_ID":os.environ.get('AWS_ACCESS_KEY_ID'),
    "AWS_SECRET_ACCESS_KEY":os.environ.get('AWS_SECRET_ACCESS_KEY'),
    "AWS_STORAGE_BUCKET_NAME":os.environ.get('AWS_STORAGE_BUCKET_NAME'),
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
SECRET_KEY = 'a86af676-b476-42a4-9946-0d0ec3715613'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [env_vars["GRIP_HOST"], 'localhost', '127.0.0.1']

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
]

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


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
               'token_auth.backends.JWTAuthentication',
    ),
    'EXCEPTION_HANDLER': 'token_auth.exceptions.core_exception_handler',

}
JWT_EXPIRATION_DAYS = 30

PASSWORD_RESET_TIMEOUT = 300

#EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'
#EMAIL_FILE_PATH=BASE_DIR+'/tmp/django-email-dev'

EMAIL_BACKEND= 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env_vars["EMAIL_HOST"]
EMAIL_HOST_USER = env_vars["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = env_vars["EMAIL_HOST_PASSWORD"]
EMAIL_PORT = env_vars["EMAIL_PORT"]
EMAIL_USE_SSL = True
DEFAULT_FROM_EMAIL = 'GripHR'

# s3 configuration
if  os.environ.get('AWS_S3_ENDPOINT_URL', None) is not None:
    AWS_S3_ENDPOINT_URL=os.environ.get('AWS_S3_ENDPOINT_URL', None)
if  os.environ.get('AWS_S3_REGION_NAME', None) is not None:
    AWS_S3_REGION_NAME=os.environ.get('AWS_S3_REGION_NAME', None)
AWS_ACCESS_KEY_ID=env_vars["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY=env_vars["AWS_SECRET_ACCESS_KEY"]
AWS_STORAGE_BUCKET_NAME=env_vars["AWS_STORAGE_BUCKET_NAME"]
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'


CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
    }
}