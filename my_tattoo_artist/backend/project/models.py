from django.db import models
import uuid

# Create your models here.

class Studio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name_studio = models.CharField(max_length=50)
    phone_studio = models.CharField(max_length=10)
    number_street = models.CharField(max_length=5)
    street = models.CharField(max_length=70)
    city = models.CharField(max_length=50)
    post_code = models.CharField(max_length=7)
    country = models.CharField(max_length=15)

    def __str__(self):
        return self.name_studio


class TattooStyle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name_style = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)

    def __str__(self):
        return self.name_style