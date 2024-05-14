from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Cart_Product,Product
from base.serializers import CartSerializer
from rest_framework import status


@permission_classes(['IsAuthenticated'])
@api_view(['POST'])  
def addToCart(request,pk):
    try:
        user = request.user
        product = Product.objects.get(_id=pk)
        if(Cart_Product.objects.filter(user_id=user.id , product_id=product._id)):
            return Response({"Message" : "Product Already Added To Cart"}, status=status.HTTP_403_FORBIDDEN)
        createCart = Cart_Product.objects.create(
            user=user,
            product = product
        )
        return Response({"Message" : "Product Added To Cart Successsfully"})
    except(Exception):
        return Response({"Message": Exception})

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def getcartproducts(request):
    user= request.user
    getUserCart= Cart_Product.objects.filter(user__id = user.id)
    serializer = CartSerializer(getUserCart, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['DELETE'])
def removeFromCart(request,pk):
    try:
        user = request.user
        removeProduct = Cart_Product.objects.get(product_id = pk)
        removeProduct.delete()
        return Response({"Message" : "Product Removed From Cart Successfully"})
    except(Exception):
         return Response({'Message' : Exception})