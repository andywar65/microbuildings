from rest_framework import serializers

from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    builds = serializers.ReadOnlyField(source='get_buildings')

    class Meta:
        model = Category
        fields = ("id", "name", "visible", "builds")
