from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.models import Cart_Product,Product , Order , OrderItem
from base.serializers import CartSerializer,ProductSerializer,OrderSerializer,OrderItemSerializer
from django.db.models.query import Q
from rest_framework import status


@permission_classes(['IsAuthenticated'])
@api_view(['POST'])  
def addToCart(request,pk):
    try:
        user = request.user
        data = request.data 
        variants = [1,3]
        print(data , "data")
        product = Product.objects.get(_id=pk)
        pro_serializer = ProductSerializer(product,many=False).data
        if(Cart_Product.objects.filter(user_id=user.id , product_id=product._id)):
            return Response({"Message" : "Product Already Added To Cart"}, status=status.HTTP_403_FORBIDDEN)
        createCart = Cart_Product.objects.create(
            user=user,
            product = product
        )
        if(product.category._id in variants):
            if(data):
                createCart.selected_color=data['selectedColor']
                createCart.selected_storage=data['selectedStorage']
                createCart.save()
            else:
                createCart.selected_color=pro_serializer['color'][0]['color_code']
                createCart.selected_storage=pro_serializer['storage'][0]['size']
                createCart.save()
        serializer = CartSerializer(createCart, many=False)
        print(serializer.data)
        return Response(serializer.data)
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
    
@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def Recommendation(request):
    categoryQuery = request.GET.get('category','')
    splitCategory = categoryQuery.split(", ")
    print(len(splitCategory) , splitCategory)
    if(len(splitCategory) ==1):
        name= splitCategory[0]
        filterProducts = Product.objects.filter(name__icontains=name)
    elif(len(splitCategory)==2):
        print("INSIDE")
        name1=splitCategory[0]
        name2=splitCategory[1]
        filterProducts = Product.objects.filter(Q(name__icontains=name1) | Q(name__icontains=name2))
    else:
        return Response({'Message','Invalid Categories'})
    serializer = ProductSerializer(filterProducts, many=True)
    return Response(serializer.data)


@permission_classes(['IsAuthenticated'])
@api_view(['POST'])
def createOrder(request,pk):
    try:
        user = request.user
        order_data = request.data
        cart_product= Cart_Product.objects.filter(user_id=user.id)

        create_order = Order.objects.create(
            user=user,
            first_name = order_data['first_name'],
            last_name = order_data['last_name'],
            shipping_address =order_data['shipping_address'],
            zip_code= order_data['zip_code'],
            city= order_data['city'],
            payment_method= order_data['payment_method'],
        )
        for products in cart_product:
            OrderItem.objects.create(
                order=create_order,
                product=products.product,
                selected_color =products.selected_color,
                selected_storage =products.selected_storage
            )
        cart_product.delete()

        return Response({"Message" : "Order placed Successsfully"})
    except(Exception):
        return Response({"Error" : Exception })


@permission_classes(['IsAuthenticated'])
@api_view(['GET'])
def getOrders(request):
    user=request.user
    order =  OrderItem.objects.filter(order__user__id=user.id)
    print(order)
    serializer= OrderItemSerializer(order, many=True)
    return Response(serializer.data)

