from rest_framework import serializers
from rest_framework_gis import serializers as gis_serializers

from .models import Category, Building

class BuildingSerializer(gis_serializers.GeoFeatureModelSerializer):
    """Building GeoJSON serializer."""

    class Meta:
        fields = ("id", "name", "category",)
        geo_field = "location"
        model = Building

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ("id", "name", "visible", )
