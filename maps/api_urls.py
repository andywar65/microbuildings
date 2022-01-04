from django.urls import path

from .api_views import *

app_name = 'maps_api'
urlpatterns = [
    path('categories/', CategoryListApiView.as_view(), ),
    path('build-by-cat/<pk>/', BuildingListApiView.as_view(), ),
]
