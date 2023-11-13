from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from search.serializers import PostSerializer
from search.lib import postAction
from token_auth.permissions import *


class SearchApi(APIView):
    permission_classes = [IsAuthenticated]             # <-- And here 
    @method_permission_classes([IsAdmin,IsManager,IsEmployee])
    def post(self, request):
        request.data.update(request.query_params.dict())
        serializer = PostSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        response = postAction(data,{'request': request})
        return Response(response, status=status.HTTP_200_OK)
    