# Generated by Django 4.2.1 on 2023-06-16 16:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('user_artist', '0007_userartist_album_userartist_drawing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userartist',
            name='album',
        ),
        migrations.RemoveField(
            model_name='userartist',
            name='drawing',
        ),
        migrations.CreateModel(
            name='UserArtistDrawing',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('drawing_image', models.ImageField(blank=True, null=True, upload_to='drawing/')),
                ('id_user_artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserArtistAlbum',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('album_image', models.ImageField(blank=True, null=True, upload_to='album/')),
                ('id_user_artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]