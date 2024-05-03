from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer , UserSerializerWithToken , ProductSerializer , ReviewSerializer, CommentPatchSerializer , CategorySerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from base.models import Product,Reviews,Category
from rest_framework import status
# from django.views.decorators.http import require_GET

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




@api_view(['GET'])
def SearchProduct(request):
    query = request.GET.get('query','')
    if query:
            findProduct =  Product.objects.filter(name__icontains=query)
            serializer = ProductSerializer(findProduct,many=True)
            return Response(serializer.data)
    else:
        return Response({"Message" : "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def GetProductById(request,pk):
    try:
        getProduct = Product.objects.get(_id=pk)
        serializer = ProductSerializer(getProduct)
        return Response(serializer.data)
    except:
        return Response({"Message":"Product Not Found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def GetAllProducts(request):
    getProducts = Product.objects.all()
    serializer = ProductSerializer(getProducts ,  many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CreateReview(request,pk):
    print(pk)
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

@api_view(['POST'])
def PriceFilter(request):
    maxQuery = request.GET.get('max',None)
    minQuery=request.GET.get('min',None)
    productQuery = request.GET.get('query','')
    if(maxQuery and minQuery):
        maxPrice = float(maxQuery)
        minPrice = float(minQuery)
        findproduct = Product.objects.filter(name__icontains=productQuery , price__lte=maxPrice , price__gte=minPrice)
    elif(maxQuery):
        maxPrice = float(maxQuery)
        findproduct = Product.objects.filter(name__icontains=productQuery , price__lte=maxPrice)
    elif(minQuery):
        minPrice = float(minQuery)
        findproduct = Product.objects.filter(name__icontains=productQuery , price__gte=minPrice)
    else:
        return Response({"Message":"No Data Posted"} , status=status.HTTP_400_BAD_REQUEST)

    serializer = ProductSerializer(findproduct,  many=True)
    return Response(serializer.data)

@api_view(['GET'])
def RecommendProducts(request,pk):
    try:
        ExcludeProduct = Product.objects.get(_id=pk)
        Productprice = request.GET.get('query',None)
        min_price = float(Productprice) - 200
        max_price = float(Productprice) + 250
        FindProducts = Product.objects.filter(price__lte = max_price , price__gte=min_price).exclude(_id=ExcludeProduct._id)
        serializer = ProductSerializer(FindProducts, many=True)
        return Response(serializer.data)
    except(Exception):
        return Response({"Message" : Exception})


@api_view(['GET'])
def getCategories(request):
    get_all_categories = Category.objects.all()
    serializer = CategorySerializer(get_all_categories , many=True)
    return Response(serializer.data)