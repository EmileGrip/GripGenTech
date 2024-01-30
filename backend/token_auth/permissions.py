from datetime import datetime
from rest_framework import permissions
from rest_framework import exceptions
import logging


class IsManager(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is manager
        return request.user.system_role == 'manager'


class IsStaff(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is staff
        return request.user.system_role == 'staff'
    

class IsEmployee(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is staff
        return request.user.system_role == 'employee'

class IsNotUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return True


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.system_role == 'admin'


class IsEssentialsPlan(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user's company has the Essentials subscription plan
        company = request.user.company_id
        if company and company.plan == 'Essentials plan':
            return True
        return False 


class IsProfessionalPlan(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user's company has the Professional subscription plan
        company = request.user.company_id
        if company and company.plan ==  'Professional plan':
            return True
        return False
    

class IsFreeTrial(permissions.BasePermission):
    def has_permission(self, request, view):
        logging.info(request.user.company_id)
        company = request.user.company_id
        if company and company.plan == 'free-trial':
            return True
        return False
    
    
class IsActiveSubscription(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.system_role == 'staff':
            return True
        # check if end_date in company is less than current date
        company = request.user.company_id
        if str(datetime.now()) > str(company.end_date):
            print('end_date', company.end_date)
            # make status inactive
            company.status = 'Inactive'
            company.save()
            return False
        if company and company.status == 'Cancelled':
            print('cancelled')
            return False
        return True
    
       
def method_permission_classes(classes):
    def decorator(func):
        def decorated_func(self, *args, **kwargs):
            self.permission_classes = classes
            # this call is needed for request permissions
            for cls in classes:
                if cls().has_permission(self.request, self):
                    return func(self, *args, **kwargs)
                    
            raise exceptions.PermissionDenied()
        return decorated_func
    return decorator