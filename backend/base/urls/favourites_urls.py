from django.urls import path
from base.views import favourites_views as favourites
urlpatterns=[
    path('add/<str:pk>',favourites.addTofavourites, name="Add-Product"),
    path('products/',favourites.getFavouriteProducts, name="Get-Product"),
    path('delete/<str:pk>',favourites.removeFromFavourites, name="Remove-Product"),
]