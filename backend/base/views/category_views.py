from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from django.contrib.auth.models import User
from base.serializers import CategorySerializer, ProductSerializer
from base.models import Product,Reviews,Category
from rest_framework import status

@api_view(['GET'])
def getCategories(request):
    get_all_categories = Category.objects.all()
    serializer = CategorySerializer(get_all_categories , many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategoryProducts(request,pk):
        get_category_products = Product.objects.filter(category_id = pk)
        if(get_category_products.exists()):
            serializer = ProductSerializer(get_category_products, many=True)
            return Response(serializer.data)
        else:
            return Response({"Message" : "Category Not Found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def filterCategoryProducts(request,pk):
     print("INSIDE")
     getAllProducts = Product.objects.all()
     getCategory = getAllProducts.filter(category_id = pk)
     minPrice = request.GET.get('min',None)
     maxPrice = request.GET.get('max',None)
     if(minPrice and maxPrice):
        FilterPrice = getCategory.filter(price__gte=minPrice , price__lte=maxPrice)
     elif(minPrice):
        FilterPrice = getCategory.filter(price__gte=minPrice)
     else:
        FilterPrice = getCategory.filter(price__lte=maxPrice)

     serializer = ProductSerializer(FilterPrice, many=True)
     return Response(serializer.data)
          
