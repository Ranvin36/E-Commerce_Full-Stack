from django.urls import path
from base.views import product_views as product
urlpatterns=[
    path('search/',product.SearchProduct, name="search-product"),
    path('<str:pk>',product.GetProductById, name="get-product-ById"),
    path('all-products/',product.GetAllProducts, name="get-all-products"),
    path('latest-products/',product.LatestProducts, name="get-latest-products"),
    path('search/price/',product.PriceFilter, name="price-filter"),
    path('recommend/<str:pk>/',product.RecommendProducts, name="recommend-Products"),
]