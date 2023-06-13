# Generated by Django 4.2.1 on 2023-06-13 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_artist', '0004_rename_city_userartist_studio_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userartist',
            name='album',
            field=models.ImageField(blank=True, null=True, upload_to='album/'),
        ),
        migrations.AlterField(
            model_name='userartist',
            name='drawing',
            field=models.ImageField(blank=True, null=True, upload_to='drawing/'),
        ),
        migrations.AlterField(
            model_name='userartist',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_picture/'),
        ),
    ]
