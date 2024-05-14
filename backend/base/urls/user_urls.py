from django.urls import path
from base.views import user_views as users
urlpatterns=[
    path('login',users.MyTokenObtainPairView.as_view(),name="user-login"),
    path('register',users.Register,name="user-registration"),
    path('logout',users.LogOutUser.as_view(),name="user-logout"),
]