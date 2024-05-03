from django.urls import path
from base.views import reviews_views as review
urlpatterns=[
    path('update/<str:pk>',review.UpdateComment, name="update-review"),
    path('delete/<str:pk>',review.DeleteReview, name="delete-review"),
    path('create/<str:pk>',review.CreateReview, name="create-review"),
]