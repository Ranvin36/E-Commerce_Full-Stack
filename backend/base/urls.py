from django.urls import path
from base.views import *

urlpatterns = [
    path('login',MyTokenObtainPairView.as_view(), name="login"),
    path('register',Register, name="user-registration"),
]
