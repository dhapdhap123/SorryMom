from django.contrib import admin
from .models import Fake, Diary, MarkExample, StampExample
# Register your models here.
admin.site.register(Fake)
admin.site.register(Diary)
admin.site.register(MarkExample)
admin.site.register(StampExample)