from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from django.contrib.auth.models import User
from base.serializers import ReviewSerializer, CommentPatchSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from base.models import Product,Reviews
from rest_framework import status


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CreateReview(request,pk):
    print(pk , "INSIDE")
    data = request.data
    user = request.user
    getProduct = Product.objects.get(_id=pk)
    userExists = getProduct.reviews_set.filter(user=user)
    # if userExists :
    #     return Response({"Message":"You have already posted a comment"})
    createReview = Reviews.objects.create(
        user = user,
        product=getProduct,
        rating = data['rating'],
        comment= data['comment'],
        name = user.username
    )

    serializer = ReviewSerializer(createReview, many=False)
    
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def DeleteReview(request,pk):
    try:
        findReview = Reviews.objects.get(_id=pk).delete()
        return Response({"Message":"Product Deleted Succesfully"})
    except:
        return Response({"Message" :"Review Not Found"} , status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def UpdateComment(request,pk):
    findReview = Reviews.objects.get(_id=pk)
    data = request.data
    if findReview.user != request.user :
        return Response({"Message" :"You Do Not Have Permission To Edit This Content"})
    serializer = CommentPatchSerializer(instance = findReview , data=data , partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"Message", "Comment Update Successfully!!"})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)