
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
# from django.contrib.auth.models import User
from base.serializers import ProductSerializer ,CartSerializer
from base.models import Product,Cart_Product
from rest_framework import status

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


@api_view(['GET'])
def RecommendProducts(request,pk):
    try:
        ExcludeProduct = Product.objects.get(_id=pk)
        Productprice = float(ExcludeProduct.price)
        category_id = ExcludeProduct.category._id
        print(category_id)
        min_price = Productprice - 200
        max_price = Productprice + 250
        FindProducts = Product.objects.filter(category_id=category_id,price__lte = max_price , price__gte=min_price).exclude(_id=ExcludeProduct._id)
        serializer = ProductSerializer(FindProducts, many=True)
        return Response(serializer.data)
    except(Exception):
        return Response({"Message" : Exception})



@api_view(['POST'])
def PriceFilter(request):
    maxQuery = request.GET.get('max',99999)
    minQuery=request.GET.get('min',0)
    productQuery = request.GET.get('query','')
    categoryQuery = request.GET.get('category','')
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
def LatestProducts(request):
    get_latest_products = Product.objects.all().order_by('created_at')[:8]
    serializer = ProductSerializer(get_latest_products, many=True)
    return Response(serializer.data)


