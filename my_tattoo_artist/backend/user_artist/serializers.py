from rest_framework import serializers
from .models import UserArtist
from project.serializers import TattooStyleSerializer


class UserArtistSerializer(serializers.ModelSerializer):
    tattoo_style = TattooStyleSerializer(many=True, required=False)
    class Meta:
        model = UserArtist
        fields = ['first_name', 'last_name', 'id', 'artist_name', 'phone', 'email', 'profile_picture', 'biography', 'album', 'drawing', 'studio_name', 'studio_number_street', 'studio_street', 'studio_city', 'studio_post_code', 'studio_country', 'studio_state', 'tattoo_style']
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'email': {'required': False},
        }