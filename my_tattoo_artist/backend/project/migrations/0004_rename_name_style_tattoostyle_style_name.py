# Generated by Django 4.2.1 on 2023-06-08 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_rename_name_studio_studio_studio_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tattoostyle',
            old_name='name_style',
            new_name='style_name',
        ),
    ]
