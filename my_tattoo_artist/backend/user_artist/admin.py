from django.contrib import admin
from .models import UserArtist, UserArtistAlbum, UserArtistDrawing

# Register your models here.

admin.site.register(UserArtist)
admin.site.register(UserArtistAlbum)
admin.site.register(UserArtistDrawing)