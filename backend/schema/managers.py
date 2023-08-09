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
        if not extra_fields.get('company_id',None) and not extra_fields.get('system_role')=="staff":
            raise ValueError(_('Users must have a company'))
        email = self.normalize_email(email)
        user = self.model(username=email,email=email,first_name=first_name,last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_staff(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('system_role', "staff")
        if extra_fields.get('system_role') != "staff":
            raise ValueError(_('Staff must have system_role = staff.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)
    
    def create_manager(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('system_role', "manager")
        if not extra_fields.get('system_role') == "manager":
            raise ValueError(_('Manager must have system_role = manager.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)
    
    def create_employee(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('system_role', "employee")
        if not extra_fields.get('system_role') == "employee":
            raise ValueError(_('Employee must have system_role = employee.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)
    
    def create_admin(self,first_name,last_name, email, password, **extra_fields):
        extra_fields.setdefault('system_role', "admin")
        if not extra_fields.get('system_role') == "admin":
            raise ValueError(_('Admin must have system_role = admin.'))
        return self.create_user(first_name,last_name,email, password, **extra_fields)
