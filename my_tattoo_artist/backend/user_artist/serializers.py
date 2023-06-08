from rest_framework import serializers
from .models import UserArtist


class UserArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtist
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'email': {'required': False}
        }
        
