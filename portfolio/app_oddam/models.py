from django.db import models
from django.contrib.auth.models import User
from app_oddam.site_set import FUNDACJA, ORGANIZACJA_PZ, ZBIORKA_L

# Create your models here.
type_list = (('f', '{}'.format(FUNDACJA)),
             ('o', '{}'.format(ORGANIZACJA_PZ)),
             ('z', '{}'.format(ZBIORKA_L)))


class Category(models.Model):
    name = models.CharField(max_length=120, null=False)

    def __str__(self):
        return self.name

class Institution(models.Model):
    name = models.CharField(max_length=120, null=False)
    description = models.TextField(max_length=500, null=False)
    type = models.CharField(choices=type_list, max_length=30, default=FUNDACJA)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


class Donation(models.Model):
    quantity = models.IntegerField(null=False)
    categories = models.ManyToManyField(Category)
    institution = models.ForeignKey(Institution,on_delete=models.PROTECT)
    address = models.CharField(max_length=120, null=False)
    phone_number = models.CharField(max_length=9, null=False)
    city = models.CharField(max_length=30,null=False)
    zip_code = models.CharField(max_length=6, null=False)
    pick_up_date = models.DateField(null=False)
    pick_up_time = models.TimeField(null=False)
    pick_up_comment = models.CharField(max_length=120, null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    is_taken = models.BooleanField(default=False)