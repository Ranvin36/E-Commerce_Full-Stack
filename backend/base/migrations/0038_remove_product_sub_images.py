# Generated by Django 4.2.7 on 2024-05-28 09:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0037_rename_subimages_product_sub_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='sub_images',
        ),
    ]
