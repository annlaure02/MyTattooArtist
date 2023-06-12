from rest_framework import serializers
from .models import UserArtist
from project.serializers import StudioSerializer, TattooStyleSerializer
from project.models import Studio


class UserArtistSerializer(serializers.ModelSerializer):
    studio = StudioSerializer(many=True, required=False)
    tattoo_style = TattooStyleSerializer(many=True, required=False)
    class Meta:
        model = UserArtist
        fields = ['first_name', 'last_name', 'id', 'artist_name', 'phone', 'email', 'profile_picture', 'biography', 'album', 'drawing', 'studio', 'tattoo_style']
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'email': {'required': False},
        }


    def create(self, validated_data):
        studios_data = validated_data.pop('studio')
        user_artist = UserArtist.objects.create(**validated_data)
        for studio_data in studios_data:
            studio, created = Studio.objects.get_or_create(**studio_data)
            user_artist.studio.add(studio)
        return user_artist

    def update(self, instance, validated_data):
        studios = validated_data.pop('studio', None)
        instance = super().update(instance, validated_data)
        studio_obj = []
        if studios is not None:
            instance.studio.clear()
            for studio_data in studios:
                studio, created = Studio.objects.get_or_create(**studio_data)
                studio_obj.append(studio)
            instance.studio.set(studio_obj)
        return instance