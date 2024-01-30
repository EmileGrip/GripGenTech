from rest_framework.response import Response
from rest_framework.views import APIView
from token_auth.permissions import IsAdmin, method_permission_classes
from .lib import getAction, postAction, coursePostAction, coursesPostAction, putAction, deleteAction, listPostAction
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import *


class MatchesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = GetRecommendationsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        response = getAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)


# --------------------------------- GET and POST providers --------------------------------
class Providers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get(self, request):
        serializer = GetProviders(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        response = listPostAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    @method_permission_classes([IsAdmin])
    def post(self, request):
        serializer = PostProvidersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = postAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)


# --------------------- start, complete or delete courses for users -----------------------
class CoursesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = GetSkilllEnhancementSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)  
        response = coursesPostAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSkillEnhancementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = coursePostAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    def put(self, request):
        serializer = PutSkillEnhancementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = putAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)
    
    def delete(self, request):
        serializer = DeleteSkillEnhancementSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        response = deleteAction(request, serializer.data, context={'request': request})
        return Response(response, status=status.HTTP_200_OK)

