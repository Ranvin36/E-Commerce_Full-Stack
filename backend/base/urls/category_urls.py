from django.urls import path
from base.views import category_views as category
urlpatterns=[
        path('product/categories',category.getCategories, name="get-categories"),
]