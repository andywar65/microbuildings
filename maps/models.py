from django.db import models
from django.contrib.gis.db import models

class Category(models.Model):
    name = models.CharField("Category name",
        max_length = 50, )
    visible = models.BooleanField("Is category immediately visible", default=True)

    def __str__(self):
        return self.name

class Building(models.Model):
    name = models.CharField("Building name",
        max_length = 50, )
    location = models.PointField( srid=4326, geography=True )
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
        verbose_name = "Building's category")

    def __str__(self):
        return self.name
