from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields= ['_id','id','username','email']
    
    def get__id(self,obj):
        return obj.id
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['_id','id','username','email','token']
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
