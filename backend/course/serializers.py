from rest_framework import serializers, exceptions
from schema.models import GripUser, Company, Course
from datetime import datetime
from django.forms.models import model_to_dict


class CourseSerializer(serializers.Serializer):
    
    #defining the filed related to the model Course
    id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    level = serializers.CharField(required=False)
    institution = serializers.CharField(required=False)
    degree = serializers.CharField(required=False)
    user_id = serializers.IntegerField(required=False)
    


    def __get_non_null_fields(self, **kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}

    def check_string_length(self, value,min_length, max_length):
        if value is None:
            return False
        elif len(value) < min_length or len(value) > max_length:
            return False
        else:
            return True
    
    def get_response(self):
        return self.__response
    
    def validate(self, data):
        if self.context['method'] == 'POST':
            return self.validate_post(data)
        if self.context['method'] == 'GET':
            return self.validate_get(data)
        if self.context['method'] == 'PUT':
            return self.validate_put(data)
        if self.context['method'] == 'DELETE':
            return self.validate_delete(data)
        
    def validate_get(self, data):
        #get the course_id from the request
        course_id = data.get('id', None)
        #get the user_id from the request
        user_id = data.get('user_id',self.context['request'].user.id)

        #get user 
        user = GripUser.objects.filter(id=user_id)
        #check if the user exists
        if user.exists() is False:
            raise exceptions.ValidationError('User does not exist')
        user = user.first()
        #check if user in the same company
        if user.company_id.id != self.context['request'].user.company_id.id:
            raise exceptions.ValidationError('You do not have permission to access this data')
        
        #check permissions
        if course_id is not None:
            if str(course_id).isnumeric() is False:
                raise exceptions.ValidationError('course_id must be a number')
            #check if course exists
            if Course.objects.filter(id=course_id).exists() is False:
                raise exceptions.ValidationError('Course does not exist')
             # check if the user owns the course
            course = Course.objects.filter(id=course).first() 
            if course.user_id.id != self.context['request'].user.id:
                raise exceptions.ValidationError('You do not have permission to access this course')
            
            data = model_to_dict(Course.objects.get(id=course_id, user_id=user_id))
        else:
            data = Course.objects.filter(user_id=user_id).all().values()
        
        #set response data in self.response
        self.__response = {
            'status': 'success',
            'message': 'Course fetched successfully',
            'payload': data
        }
        return data

    def validate_post(self, data):
        #get the data from the request
        user_id = self.context['request'].user.id
        start_date = data.get('start_date', None)
        end_date = data.get('end_date', None)
        institution = data.get('institution', None)
        degree = data.get('degree', None)
        

        
        # check if the user exists
        user = GripUser.objects.filter(id=user_id)
        if user.exists() is False:
            raise exceptions.ValidationError('User does not exist')
        user = user.first()
        if user.company_id.id != self.context['request'].user.company_id.id:
            raise exceptions.ValidationError('You do not have permission to add course for this user')


        
        
        #check if the start_date is valid
        if start_date is None:
            raise exceptions.ValidationError('start_date is required')
        if start_date > datetime.today().date():
            raise exceptions.ValidationError("Start date cannot be in the future")
        

        #check if the end_date is valid
        if end_date is None:
            raise exceptions.ValidationError('end_date is required')

        

        if end_date < start_date:    
            raise exceptions.ValidationError('end_date cannot be before start_date')
        
        #check if the rest of the fields are valid
        #check if institution
        if institution is None:
            raise exceptions.ValidationError('institution is required')
        if degree is None:
            raise exceptions.ValidationError('degree is required')
        
        if self.check_string_length(institution, 1, 50) == False:
            raise exceptions.ValidationError('institution must be between 1 and 50 characters')
        if self.check_string_length(degree, 1, 50) == False:
            raise exceptions.ValidationError('degree must be between 1 and 50 characters')
        
     
        
        course_data = self.__get_non_null_fields(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date,
            institution=institution,
            degree=degree,
            company_id=self.context['request'].user.company_id
        )
        
        #create the course
        course_data["user_id"] = user
        course = Course.objects.create(**course_data)

        #save the course
        # course.save()

        #set response data in self.response
        self.__response = {
            'status': 'success',
            'message': 'Course added successfully',
            'payload': model_to_dict(course)
        }
        return course_data


    def validate_put(self, data):
        #get the data from the request
        course_id = data.get('id', None)
        start_date = data.get('start_date', None)
        end_date = data.get('end_date', None)
        institution = data.get('institution', None)
        degree = data.get('degree', None)
        
        #check if the course_id is valid
        if course_id is None:
            raise exceptions.ValidationError('course_id is required')
        if str(course_id).isnumeric() == False:
            raise exceptions.ValidationError('course_id must be a number')

        # get user ID from request object
        user_id = self.context['request'].user.id
        #check if the user_id is valid
        if user_id is None:
            raise exceptions.ValidationError('user_id is required')
        if str(user_id).isnumeric() == False:
            raise exceptions.ValidationError('user_id must be a number')

        # check if the course exists
        course = Course.objects.filter(id=course_id).first()
        if course is None:
            raise exceptions.ValidationError('Course does not exist')
        if Course.objects.filter(id=course_id, user_id=user_id).first() is None:
            raise exceptions.ValidationError('You do not have permission to update this course')




        #check if the start_date is valid
        if start_date is not None and start_date > datetime.today().date():
            raise exceptions.ValidationError("Start date cannot be in the future")
        
        if start_date is not None:
            course.start_date = start_date
                    
        #check if the end_date is valid
        if end_date is not None and start_date > end_date:
            raise exceptions.ValidationError('start_date cannot be greater than end_date')


        if end_date is not None:
            course.end_date = end_date
        

        if institution is not None:
            if self.check_string_length(institution, 1, 50) == False:
                raise exceptions.ValidationError('institution must be between 1 and 50 characters')
            else:
                course.institution = institution
        if degree is not None:
            if self.check_string_length(degree, 1, 50) == False:
                raise exceptions.ValidationError('degree must be between 1 and 50 characters')
            else:
                course.degree = degree

        
        course.save()
        course_data = model_to_dict(course)
        self.__response = {
            'success': True,
            'message': 'Course updated successfully',
            'payload': course_data
        }
        return course_data

    
    def validate_delete(self, data):
        #get the data from the request
        course_id = data.get('id', None)
        
        #check if the course_id is valid
        if course_id is None:
            raise exceptions.ValidationError('course_id is required')
        if str(course_id).isnumeric() == False:
            raise exceptions.ValidationError('course_id must be a number')

        #get the user id from request object
        user_id = self.context['request'].user.id
        # check if the course exists
        course = Course.objects.filter(id=course_id).first()
        if course is None:
            raise exceptions.ValidationError('Course does not exist')
        if course.user_id.id != self.context['request'].user.id:
            print(course.user_id.id)
            raise exceptions.ValidationError('You do not have permission to delete this course')
    
        course.delete()
        self.__response = {
            'success': True,
            'message': 'Course deleted successfully',
            'payload': None
        }
        return {'id': course_id}