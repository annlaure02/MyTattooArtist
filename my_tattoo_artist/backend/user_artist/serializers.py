from rest_framework import serializers
from .models import UserArtist
from project.serializers import TattooStyleSerializer
from project.models import TattooStyle


class UserArtistSerializer(serializers.ModelSerializer):
    tattoo_style = TattooStyleSerializer(many=True, required=False)
    class Meta:
        model = UserArtist
        fields = ['first_name', 'last_name', 'id', 
                  'artist_name', 'phone', 'email', 
                  'profile_picture', 'biography', 
                  'album', 'drawing', 'studio_name', 
                  'studio_number_street', 'studio_street', 
                  'studio_city', 'studio_post_code',
                  'studio_country', 'studio_state', 'tattoo_style']
        
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'email': {'required': False}}
        

    def update(self, instance, validated_data):
        tattoo_data = validated_data.pop('tattoo_style', None)
        instance = super().update(instance, validated_data)
        tattoo_obj = []
        if tattoo_data is not None:
            instance.tattoo_style.clear()
            for tattoo_style_data in tattoo_data:
                tattoo, created = TattooStyle.objects.get_or_create(**tattoo_style_data)
                tattoo_obj.append(tattoo)
            instance.tattoo_style.set(tattoo_obj)
        return instance