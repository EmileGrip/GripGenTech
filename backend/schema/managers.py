#define the manager for the user model

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext as _

class GUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_superuser(self,first_name,last_name, email, password, **extra_fields):
        return self.create_staff(first_name,last_name,email, password, **extra_fields)
        
    def create_user(self,first_name,last_name, email, password, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        if not first_name:
            raise ValueError(_('Users must have a first name'))
        if not last_name:
            raise ValueError(_('Users must have a last name'))
        if not extra_fields.get('company_id',None) and not extra_fields.get('is_staff'):
            raise ValueError(_('Users must have a company'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_staff(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)
    
    def create_manager(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('is_manager', True)
        if extra_fields.get('is_manager') is not True:
            raise ValueError(_('Superuser must have is_manager=True.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)

