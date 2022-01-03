from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from .models import (Building, Category, )

@admin.register(Building)
class BuildingAdmin(GISModelAdmin):
    list_display = ('name', 'category', )

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'visible', )
