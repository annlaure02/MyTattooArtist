from django.db import models
import uuid

# Create your models here.

class TattooStyle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    style_name = models.CharField(max_length=50, blank=True)
    description = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return self.style_name
    