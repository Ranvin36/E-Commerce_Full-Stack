from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, Reviews,Category, Cart_Product , Favourite

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

class ProductSerializer(serializers.ModelSerializer):
    reviews= serializers.SerializerMethodField(read_only=False)
    class Meta:
        model = Product
        fields='__all__'
    def get_reviews(self,obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields='__all__'

class CommentPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reviews
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    product  = serializers.SerializerMethodField(read_only=False)
    class Meta:
        model=Cart_Product
        fields='__all__'
    def get_product(self,obj):
        product = obj.product
        serializer = ProductSerializer(product, many=False)
        return serializer.data
    
class FavouritesSertializer(serializers.ModelSerializer):
    product  = serializers.SerializerMethodField(read_only=False)
    class Meta:
        model=Favourite
        fields='__all__'
    def get_product(self,obj):
        product = obj.product
        serializer = ProductSerializer(product, many=False)
        return serializer.data