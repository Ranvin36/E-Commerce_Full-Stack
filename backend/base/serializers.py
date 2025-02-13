from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, Reviews,Category , Favourite, Brand, Storage, Color, Cart_Product,Order,OrderItem

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
    reviews= serializers.SerializerMethodField(read_only=True)
    storage = serializers.SerializerMethodField(read_only=True)
    color= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields='__all__'
    def get_reviews(self,obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    def get_storage(self,obj):
        storage = obj.storage
        serializer =  StorageSerializer(storage,many=True)
        return serializer.data
    def get_color(self,obj):
        color = obj.color
        serializer = ColorSerializer(color, many=True)
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
class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Storage
        fields='__all__'
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Color
        fields='__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'
class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField(read_only=True)
    product = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=OrderItem
        fields='__all__'
    def get_order(self,obj):
        order =  obj.order
        serializer = OrderSerializer(order , many=False)
        return serializer.data
    def get_product(self,obj):
        product =  obj.product
        serializer = ProductSerializer(product , many=False)
        return serializer.data
        
class CartSerializer(serializers.ModelSerializer):
    product  = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Cart_Product
        fields='__all__'
    def get_product(self,obj):
        product = obj.product
        serializer = ProductSerializer(product, many=False)
        return serializer.data
    
class FavouritesSerializer(serializers.ModelSerializer):
    product  = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Favourite
        fields='__all__'
    def get_product(self,obj):
        product = obj.product
        serializer = ProductSerializer(product, many=False)
        return serializer.data