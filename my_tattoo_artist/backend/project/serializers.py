from rest_framework import serializers
from .models import TattooStyle

class TattooStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooStyle
        fields = '__all__'