# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MyModelViewSet, get_weather, get_weather_interactions, clear_weather_interactions

router = DefaultRouter()
router.register(r'mymodels', MyModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_weather/', get_weather, name='get_weather'),
    path('get_weather_interactions/', get_weather_interactions, name='get_weather_interactions'),
    path('clear_weather_interactions/', clear_weather_interactions, name='clear_weather_interactions'),
]
