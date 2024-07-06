# admin.py
from django.contrib import admin
from .models import MyModel, WeatherInteraction

admin.site.register(MyModel)
admin.site.register(WeatherInteraction)
