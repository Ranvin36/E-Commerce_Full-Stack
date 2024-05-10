from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Cart_Product
@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def AddProduct(request):
    user = request.user
    # add_product = Cart_Product.objects.create([

    # ])
    return Response({"MESSAGE" :"GET"})