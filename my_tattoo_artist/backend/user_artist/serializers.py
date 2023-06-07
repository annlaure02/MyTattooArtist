from rest_framework import serializers
from .models import UserArtist


class UserArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtist
        fields = ['first_name', 'last_name', 'id', 'email', 'phone']
        extra_kwargs = {'password': {'write_only': True}}
        

class MaPageArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtist
        fields = ['artist_name', 'profile_picture', 'biography', 'studio', 'album', 'drawing', 'style_tattoo', 'first_name', 'last_name', 'phone', 'id']