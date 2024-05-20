# Generated by Django 4.2.7 on 2024-05-20 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0027_product_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='color',
            field=models.ManyToManyField(blank=True, null=True, to='base.color'),
        ),
        migrations.AlterField(
            model_name='product',
            name='storage',
            field=models.ManyToManyField(blank=True, null=True, to='base.storage'),
        ),
    ]
