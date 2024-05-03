from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer , UserSerializerWithToken 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        serializer= UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def Register(request):
    data= request.data
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password= make_password(data['password'])
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        return Response({"Message" : "Username Already Exists"} , status=status.HTTP_409_CONFLICT)