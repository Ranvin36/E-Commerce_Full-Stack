from django.urls import path
from base.views import reviews_views as review
urlpatterns=[
    path('update-review/<str:pk>',review.UpdateComment, name="update-review"),
    path('delete-review/<str:pk>',review.DeleteReview, name="delete-review"),
    path('review/<str:pk>',review.CreateReview, name="create-review"),
]