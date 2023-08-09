from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from recommendations.serializers import *
from token_auth.permissions import *


class RecommandationApi(APIView):
    permission_classes = [IsAuthenticated]             # <-- And here
    @method_permission_classes([IsAdmin, IsEmployee,IsManager])
    def get(self, request):
        return self.__handle(request)
    #@method_permission_classes([IsAdmin])
    
    def __handle(self,request):
        #get query params and data in one dict
        #request.data.update(request.query_params.dict())
        if request.method == 'GET':
            serializer = GetSerializer(data=request.query_params, context={'query_params': request.query_params,'request': request, 'method': request.method})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)