from django.urls import path
from base.views import user_views as users
urlpatterns=[
    path('login',users.MyTokenObtainPairView.as_view(),name="user-login"),
    path('register',users.Register,name="user-registration"),
    path('change-username/<str:pk>',users.changeUsername,name="change-username"),
    path('reset-password',users.resetPassword,name="reset-password"),
    path('reset-password/confirmation/',users.resetPasswordConfirmation,name="reset-password-confirmation"),
    path('logout',users.LogOutUser.as_view(),name="user-logout"),
]