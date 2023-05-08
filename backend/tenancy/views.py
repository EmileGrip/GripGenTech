from django.shortcuts import render

# Create your views here.
from .schema import Student
from .factory import multiModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import  AllowAny
from .utils import getModel


class CreateTable(APIView):
    permission_classes = [AllowAny]             # <-- And here
    def get(self, request):
        #log the request
        print(request.data)
        #get json data from request
        data = request.data
        #get table name from json data
        table_name = data.get('table')

        #get model from schema
        model = multiModel(Student,table_name)
        model.__create_model__()
        return Response({'detail': "table created!"}, status=status.HTTP_200_OK)
        
class AddEntryToTable(APIView):
    permission_classes = [AllowAny]             # <-- And here
    def get(self, request):
        #log the request
        print(request.data)
        #get json data from request
        data = request.data
        #get table name from json data
        table_name = data.get('table')
        first_name = data.get('first_name')
        second_name = data.get('second_name')
        #get model from schema
        model = getModel(table_name,Student)
        model.objects.create(first_name=first_name, second_name=second_name).save()
        return Response({'detail': "record created!"}, status=status.HTTP_200_OK)
        
class GetEntryFromTable(APIView):
    permission_classes = [AllowAny]             # <-- And here
    def get(self, request):
        #log the request
        print(request.data)
        #get json data from request
        data = request.data
        #get table name from json data
        table_name = data.get('table')
        id = data.get('id')

        model = getModel(table_name,Student)
        result = model.objects.filter(registration_no=id).values()
        return Response({'data': result}, status=status.HTTP_200_OK)