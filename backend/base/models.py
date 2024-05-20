from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Category(models.Model):
    name = models.CharField(max_length=100, null=False,blank=False)
    image=models.ImageField(null=True,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    _id= models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL , null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True,blank=True)
    descripton = models.TextField(null=True, blank=True)
    noReviews = models.IntegerField(null=True,blank=True,default=0)
    inStock= models.IntegerField(null=True,blank=False)
    price= models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # content_type = GenericForeignKey('content_type', 'object_id')
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

class Storage(models.Model):
    product = GenericForeignKey('Product','id')
    size = models.CharField(max_length=100, null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)

# class Cart(models.Model):
#     user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     def __str__(self):
#         return self.product.name
    
class Cart_Product(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return self.product.name
    
class Favourite(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return self.product.name

class Reviews(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True )
    comment= models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    _id= models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.product.name

class Brand(models.Model):
    name= models.CharField(max_length=100, blank=False,null=False)
    created_at =models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
class Variants(models.Model):
    name=models.CharField(max_length=100,null=False,blank=False)
    brand = models.ManyToManyField(Brand)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name