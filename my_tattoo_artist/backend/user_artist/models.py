from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import uuid
from project.models import Studio, TattooStyle

# Create your models here.
class UserArtistManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class UserArtist(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    artist_name = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=10, blank=True)
    username = None
    email = models.EmailField(unique=True)
    studio = models.ManyToManyField(Studio, blank=True)
    profile_picture = models.ImageField(upload_to='media/', blank=True, null=True)
    biography = models.TextField(max_length=1000, blank=True)
    style_tattoo = models.ManyToManyField(TattooStyle, blank=True)
    album = models.ImageField(upload_to='media/', blank=True, null=True)
    drawing = models.ImageField(upload_to='media/', blank=True, null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserArtistManager()

    def __str__(self):
        return self.email