from rest_framework import generics
from django.shortcuts import get_object_or_404

from .serializers import *
from .models import *

class CategoryListApiView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BuildingListApiView(generics.ListAPIView):
    serializer_class = BuildingSerializer

    def setup(self, request, *args, **kwargs):
        super(BuildingListApiView, self).setup(request, *args, **kwargs)
        self.cat = get_object_or_404( Category, id = self.kwargs['pk'] )

    def get_queryset(self):
        queryset = Building.objects.filter(category_id=self.cat.id)
        return queryset
