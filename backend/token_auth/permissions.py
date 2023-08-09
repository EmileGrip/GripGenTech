
from rest_framework import permissions
from rest_framework import exceptions
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