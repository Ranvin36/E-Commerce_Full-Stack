# Generated by Django 4.2.7 on 2024-05-20 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0025_remove_brand_storage_product_storage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color_code', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
