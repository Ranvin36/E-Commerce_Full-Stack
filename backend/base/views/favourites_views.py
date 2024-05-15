from rest_framework.decorators import permission_classes,api_view
from rest_framework.response import Response
from base.models import Favourite , Product 
from base.serializers import FavouritesSerializer
from rest_framework import status
@permission_classes(['IsAuthenticated'])
@api_view(['POST'])
def addTofavourites(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    if(Favourite.objects.filter(user_id=user.id, product_id=product._id)):
        return Response({"Message ":"Already Added In Favourites"}, status=status.HTTP_403_FORBIDDEN)
    createFavourite = Favourite.objects.create(
        user=user,
        product=product
    )
    serializer = FavouritesSerializer(createFavourite,many=False)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def getFavouriteProducts(request):
    user= request.user
    getUserCart= Favourite.objects.filter(user__id = user.id)
    serializer = FavouritesSerializer(getUserCart, many=True)
    return Response(serializer.data)

@permission_classes(['IsAuthenticated'])
@api_view(['DELETE'])
def removeFromFavourites(request,pk):
    user = request.user
    removeProduct = Favourite.objects.filter(product_id = pk)
    removeProduct.delete()
    return Response({"Message" : "Product Removed From Cart Successfully"})