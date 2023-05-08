
from rest_framework import permissions

class IsManager(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is manager
        return request.user.is_manager


class IsStaff(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is staff
        return request.user.is_staff
    
class IsEmployee(permissions.BasePermission):

    def has_permission(self, request, view):
        #check if user is staff
        return not (request.user.is_staff or request.user.is_manager)

class IsNotUser(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if not request.user.is_authenticated:
            return True
