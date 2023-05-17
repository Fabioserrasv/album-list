# Generated by Django 4.1.7 on 2023-05-16 00:28

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='about_me',
            field=models.CharField(default=None, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='profile_pic',
            field=models.ImageField(default=None, null=True, storage=django.core.files.storage.FileSystemStorage(location='media/profile_pictures'), upload_to=''),
        ),
    ]