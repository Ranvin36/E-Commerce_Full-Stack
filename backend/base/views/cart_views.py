from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Cart_Product,Product
from base.serializers import CartSerializer
@permission_classes(['IsAuthenticated'])
@api_view(['POST'])  
def addToCart(request,pk):
    try:
        user = request.user
        product = Product.objects.get(_id=pk)
        ifExist = Cart_Product.objects.get(user=user , product=product)
        if(ifExist):
            return Response({"Message" : "Product Already Added To Cart"})
        createCart = Cart_Product.objects.create(
            user=user,
            product = product
        )
        return Response("Product Added To Cart Successsfully")
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