from django.db import models
from django.contrib.gis.db import models

class Category(models.Model):
    name = models.CharField("Category name",
        max_length = 50, )
    visible = models.BooleanField("Is category immediately visible", default=True)

    def get_buildings(self):
        list = []
        for build in self.category_building.all():
            list.append({
                'id': build.id,
                'name': build.name,
                'latLng': (build.location.coords[1], build.location.coords[0])
            })
        return list

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'

class Building(models.Model):
    name = models.CharField("Building name",
        max_length = 50, )
    location = models.PointField( srid=4326, geography=True )
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
        related_name='category_building',
        verbose_name = "Building's category")

    def __str__(self):
        return self.name
