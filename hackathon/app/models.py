from django.db import models

# Create your models here.
class Fake(models.Model):
    title = models.CharField(max_length = 20)
    content = models.TextField()
    sign = models.CharField(max_length = 20)
    created_dt = models.DateTimeField(auto_now_add = True)
    base_img = models.TextField()
    honered = models.BooleanField(default=False)

class Diary(models.Model):
    title = models.CharField(max_length = 20)
    content = models.TextField()
    created_dt = models.DateTimeField(auto_now_add = True)
    base_img = models.TextField()
    honered = models.BooleanField(default=False)