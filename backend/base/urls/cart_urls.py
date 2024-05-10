from django.urls import path
from base.views import cart_views as cart
urlpatters=[
    path('add/',cart.AddProduct, name="Add Product" )
]