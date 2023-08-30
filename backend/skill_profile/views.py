from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from skill_profile.serializers import SkillProfileSerializer
from token_auth.permissions import *

class SkillProfileApi(APIView):
    permission_classes = [IsAuthenticated]             # <-- And here
    serializer_class = SkillProfileSerializer
    @method_permission_classes([IsAdmin, IsEmployee,IsManager])
    def get(self, request):
        return self.__handle(request)

    @method_permission_classes([IsAdmin])    
    def post(self, request):
        return self.__handle(request)

    @method_permission_classes([IsAdmin])
    def put(self, request):
        return self.__handle(request)
    
    @method_permission_classes([IsAdmin])
    def delete(self, request):
        return self.__handle(request)
    
    def __handle(self,request):
        #get query params and data in one dict
        request.data.update(request.query_params.dict())
        serializer = self.serializer_class(data=request.data, context={'request': request, 'method': request.method})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)