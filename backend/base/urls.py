from django.urls import path
from base.views import *

urlpatterns = [
    path('login',MyTokenObtainPairView.as_view(), name="login"),
    path('register',Register, name="user-registration"),
    path('search/',SearchProduct, name="search-product"),
    path('search/price/',PriceFilter, name="price-filter"),
    path('product/categories',getCategories, name="get-categories"),
    path('recommend/<str:pk>/',RecommendProducts, name="recommend-Products"),
    path('product/update-review/<str:pk>',UpdateComment, name="update-review"),
    path('product/delete-review/<str:pk>',DeleteReview, name="delete-review"),
    path('product/<str:pk>/review',CreateReview, name="create-review"),
    path('product/<str:pk>',GetProductById, name="get-product-ById"),
    path('all-products',GetAllProducts, name="get-all-products"),
]
