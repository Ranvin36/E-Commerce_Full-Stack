from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True,blank=True)
    category=models.CharField(max_length=200,null=True,blank=False)
    descripton = models.TextField(null=True, blank=True)
    noReviews = models.IntegerField(null=True,blank=True,default=0)
    inStock= models.IntegerField(null=True,blank=False)
    price= models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

class Cart(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.product.name