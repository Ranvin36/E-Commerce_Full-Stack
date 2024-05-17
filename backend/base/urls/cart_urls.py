from django.urls import path
from base.views import cart_views as cart
urlpatterns=[
    path('add/<str:pk>',cart.addToCart, name="Add-Product"),
    path('products/',cart.getcartproducts, name="Get-Product"),
    path('recommendation/',cart.Recommendation, name="cart-recommendation"),
    path('delete/<str:pk>',cart.removeFromCart, name="Remove-Product"),
]