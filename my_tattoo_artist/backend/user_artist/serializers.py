from rest_framework import serializers
from .models import UserArtist, UserArtistAlbum, UserArtistDrawing
from project.serializers import TattooStyleSerializer
from project.models import TattooStyle


class UserArtistAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtistAlbum
        fields = '__all__'

class UserArtistDrawingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtistDrawing
        fields = '__all__'

class UserArtistSerializer(serializers.ModelSerializer):
    tattoo_style = TattooStyleSerializer(many=True, required=False)
    album = UserArtistAlbumSerializer(many=True, required=False, read_only=True, source='userartistalbum_set')
    uploaded_images_album = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True, required=False)
    drawing = UserArtistDrawingSerializer(many=True, required=False, read_only=True, source='userartistdrawing_set')
    uploaded_images_drawing = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True, required=False)

    class Meta:
        model = UserArtist
        fields = ['first_name', 'last_name', 'id', 
                  'artist_name', 'phone', 'email', 
                  'profile_picture', 'biography', 
                  'studio_name', 'studio_number_street',
                  'studio_street', 'studio_city',
                  'studio_post_code', 'studio_country',
                  'studio_state','tattoo_style', 'album', 'drawing', 
                  'uploaded_images_album', 'uploaded_images_drawing'
                  ]
        
        extra_kwargs = {
            'password': {'required': False, 'read_only': True},
            'email': {'required': False}
                        }
        

    def create(self, validated_data):
        tattoo_data = validated_data.pop('tattoo_style', [])
        uploaded_images_album = validated_data.pop("uploaded_images_album", [])
        uploaded_images_drawing = validated_data.pop("uploaded_images_drawing", [])

        user_artist = UserArtist.objects.create(**validated_data)

        tattoo_obj = []
        for tattoo_style_data in tattoo_data:
            tattoo, created = TattooStyle.objects.get_or_create(**tattoo_style_data)
            tattoo_obj.append(tattoo)
        user_artist.tattoo_style.set(tattoo_obj)

        for image in uploaded_images_album:
            UserArtistAlbum.objects.create(user_artist=user_artist, image=image)

        for image in uploaded_images_drawing:
            UserArtistDrawing.objects.create(user_artist=user_artist, image=image)

        return user_artist

    def update(self, instance, validated_data):
        tattoo_data = validated_data.pop('tattoo_style', [])
        uploaded_images_album = validated_data.pop('uploaded_images_album', [])
        uploaded_images_drawing = validated_data.pop('uploaded_images_drawing', [])

        instance = super().update(instance, validated_data)
        tattoo_obj = []

        instance.tattoo_style.clear()
        for tattoo_style_data in tattoo_data:
            tattoo, created = TattooStyle.objects.get_or_create(**tattoo_style_data)
            tattoo_obj.append(tattoo)
        instance.tattoo_style.set(tattoo_obj)

        for image in uploaded_images_album:
            UserArtistAlbum.objects.create(user_artist=instance, image=image)

        for image in uploaded_images_drawing:
            UserArtistDrawing.objects.create(user_artist=instance, image=image)

        return instance