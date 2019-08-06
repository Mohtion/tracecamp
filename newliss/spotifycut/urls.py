from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('', views.login),
    re_path(r'^callback/$', views.callback),
    path('index/', views.index)
]