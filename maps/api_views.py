from rest_framework import generics
from django.shortcuts import get_object_or_404

from .serializers import *
from .models import *

class CategoryListApiView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
