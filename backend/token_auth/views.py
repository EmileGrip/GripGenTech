from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from token_auth.serializers import *
from token_auth.permissions import IsNotUser
from token_auth.backends import RefreshToken



class Login(APIView):
    permission_classes = [IsNotUser]             # <-- And here
    serializer_class = LoginRequestSerilizer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)


class Refresh(APIView):
    permission_classes = [IsAuthenticated]            
    def post(self, request):   
        return Response({
            "success":True,
            "message":"User logged in  successfully",
            "payload": {
                'token': RefreshToken(request.user)
            }}, status=status.HTTP_200_OK)

class ForgotPassword(APIView):
    permission_classes = [IsNotUser]             # <-- And here
    serializer_class = ForgotPasswordRequestSerilizer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)


class ResetPassword(APIView):
    permission_classes = [IsNotUser]          # <-- And here
    serializer_class = ResetPasswordRequestSerilizer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]         # <-- And here
    serializer_class = ChangePasswordRequestSerilizer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.get_response(), status=status.HTTP_200_OK)