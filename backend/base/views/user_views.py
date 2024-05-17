from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer , UserSerializerWithToken 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode ,urlsafe_base64_decode
from django.utils.encoding import force_bytes , force_str
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

@permission_classes(['IsAuthenticated'])
@api_view(['PATCH'])
def changeUsername(request,pk):
    print("Inside")
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance = user, data=request.data ,  partial=True) 
    if(serializer.is_valid()):
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def resetPassword(request):
    data= request.data
    user = User.objects.get(email=data['email'])
    token = default_token_generator.make_token(user)
    encode_token  = urlsafe_base64_encode(force_bytes(user.id))
    reset_link = f"http://localhost:3000/password/reset/?uidb64={encode_token}&token={token}"
    subject = "Fleexy - Password Reset Link"
    message = f"Password Reset Link - {reset_link}"
    send_mail(subject ,message,"ranvin.789@gmail.com",[user.email])
    return Response({"Message":"Password Reset Email Sent Successfully"})

@api_view(['POST'])
def resetPasswordConfirmation(request):
    data=request.data
    print(data)
    uibd64= request.GET.get('uidb64',None)
    token= request.GET.get('token',None)
    uid= force_str(urlsafe_base64_decode(uibd64))
    user = User.objects.get(id=uid)
    if not (default_token_generator.check_token(user, token)):
        return Response({"Invalid Token "}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(data['New_Password'])
    user.save()
    print(user.password)
    return Response({'Message : ' : 'Password Updated Successfully'})


class LogOutUser(APIView):
    def post(self,request):
        print(request.data["refresh_token"])
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()