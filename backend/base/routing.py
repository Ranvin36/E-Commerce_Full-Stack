from django.urls import path
from .consumers import Cart

websocket_urlpatterns=[
    path('ws/cart/',Cart.as_asgi() , name="Cart-Socket")
]