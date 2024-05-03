from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from django.contrib.auth.models import User
from base.serializers import CategorySerializer
from base.models import Product,Reviews,Category
from rest_framework import status

@api_view(['GET'])
def getCategories(request):
    get_all_categories = Category.objects.all()
    serializer = CategorySerializer(get_all_categories , many=True)
    return Response(serializer.data)