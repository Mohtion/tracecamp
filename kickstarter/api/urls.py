from django.contrib import admin
from django.urls import path, include

from api import views

urlpatterns = [
    #path('hello/', include('views.hello_world_response')),
    path('hello2/', views.hello_world_response),
    path('kickstarterdata/', views.api_list),
    path('kickstarterdata/<int:pk>', views.api_detail),
]