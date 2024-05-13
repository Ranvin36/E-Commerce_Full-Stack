from rest_framework.decorators import permission_classes,api_view
from rest_framework.response import Response
from base.models import Favourite , Product 
from base.serializers import FavouritesSertializer

@permission_classes(['IsAuthenticated'])
@api_view(['POST'])
def addTofavourites(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    createFavourite = Favourite.objects.create(
        user=user,
        product=product
    )
    return Response({"Message" : "Product Added To Cart Successfully"})

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def getFavouriteProducts(request):
    user= request.user
    getUserCart= Favourite.objects.filter(user__id = user.id)
    serializer = FavouritesSertializer(getUserCart, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['DELETE'])
def removeFromFavourites(request,pk):
    user = request.user
    removeProduct = Favourite.objects.get(product_id = pk)
    removeProduct.delete()
    return Response({"Message" : "Product Removed From Cart Successfully"})