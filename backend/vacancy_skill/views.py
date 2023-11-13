from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from vacancy_skill.serializers import GetSerializer, PostSerializer, DeleteSerializer, PutSerializer
from token_auth.permissions import method_permission_classes,IsAdmin, IsEmployee,IsManager
from vacancy_skill.lib import getAction, postAction, deleteAction, putAction

class VacancySkillApi(APIView):
    permission_classes = [IsAuthenticated]             # <-- And here
    @method_permission_classes([IsAdmin, IsEmployee,IsManager])
    def get(self, request):
        request.data.update(request.query_params.dict())
        serializer = GetSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        response = getAction(data,{'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    @method_permission_classes([IsManager,IsAdmin])
    def post(self, request):
        request.data.update(request.query_params.dict())
        serializer = PostSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        response = postAction(data,{'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    @method_permission_classes([IsManager])
    def put(self, request):
        request.data.update(request.query_params.dict())
        serializer = PutSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        response = putAction(data,{'request': request})
        return Response(response, status=status.HTTP_200_OK)
    @method_permission_classes([IsAdmin,IsManager])
    def delete(self, request):
        request.data.update(request.query_params.dict())
        serializer = DeleteSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        response = deleteAction(data,{'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    