from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from .permissions import IsNotUser
from .backends import RefreshToken



class Login(APIView):
    permission_classes = [IsNotUser]             # <-- And here
    serializer_class = LoginRequestSerilizer
    def get(self, request):
        serializer = self.serializer_class(request.data,data=request.data)                                       
        serializer.is_valid(raise_exception=True)
        return Response({
            "success":True,
            "message":"User logged in  successfully",
            "payload": {
                'token': serializer.get_token()
            }}, status=status.HTTP_200_OK)


class Refresh(APIView):
    permission_classes = [IsAuthenticated]            
    def get(self, request):   
        return Response({
            "success":True,
            "message":"User logged in  successfully",
            "payload": {
                'token': RefreshToken(request.user.id)
            }}, status=status.HTTP_200_OK)

class ForgotPassword(APIView):
    permission_classes = [IsNotUser]             # <-- And here
    serializer_class = ForgotPasswordRequestRequestSerilizer
    def get(self, request):
        serializer = self.serializer_class(request.data,data=request.data)                                       
        serializer.is_valid(raise_exception=True)
        return Response({'detail': "confirmation token is sent to your email, check it!"}, status=status.HTTP_200_OK)

class ResetPassword(APIView):
    permission_classes = [IsNotUser]          # <-- And here
    serializer_class = ResetPasswordRequestSerilizer
    def get(self, request):
        serializer = self.serializer_class(request.data,data=request.data)                                       
        serializer.is_valid(raise_exception=True)
        return Response({'detail': "password changed!"}, status=status.HTTP_200_OK)

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]         # <-- And here
    serializer_class = ChangePasswordRequestSerilizer
    def get(self, request):
        serializer = self.serializer_class(request.data,data=request.data,context=request.user)                                       
        serializer.is_valid(raise_exception=True)
        return Response({'detail': "password changed!"}, status=status.HTTP_200_OK)