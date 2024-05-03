from django.urls import path
from base.views import category_views as category
urlpatterns=[
        path('',category.getCategories, name="get-categories"),
        path('products/<str:pk>/',category.getCategoryProducts, name="get-products"),
        path('filter/<str:pk>/',category.filterCategoryProducts, name="filter-products"),
]