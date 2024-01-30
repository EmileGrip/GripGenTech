from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from goals.serializers import *
from .lib import (action_delete_action, actions_get_action, actions_post_action, actions_put_action, 
                  get_action, post_action, delete_action, put_action)


# Create your views here.
class GoalsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        response = get_action(request.data, request)
        return Response(response, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PostGoalSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = post_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)
    
    def put(self, request):
        serializer = PutGoalSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = put_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)

    def delete(self, request):
        serializer = DeleteGoalSerializer(data=request.query_params, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = delete_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)
    
        
# ---------------------------------------- GoalActions ----------------------------------------
class GoalActionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request): 
        serializer = GetGoalActionsSerializer(data=request.query_params, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = actions_get_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PostGoalActionsSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = actions_post_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)
    
    def put(self, request):
        serializer = PutGoalActionsSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = actions_put_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)
    
    def delete(self, request): 
        serializer = DeleteGoalActionsSerializer(data=request.query_params, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        response = action_delete_action(validated_data, request)
        return Response(response, status=status.HTTP_200_OK)