from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import requests
from .models import MyModel, WeatherInteraction
from .serializers import MyModelSerializer

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

@api_view(['GET'])
def get_weather(request):
    city = request.GET.get('city')
    api_key = 'MY_API_KEY'
    if not city:
        return JsonResponse({'error': 'City not provided'}, status=400)

    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(weather_url)

    if response.status_code == 200:
        data = response.json()
        weather_info = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'latitude': data['coord']['lat'],
            'longitude': data['coord']['lon'],
        }

        WeatherInteraction.objects.create(
            city=weather_info['city'],
            temperature=weather_info['temperature'],
            description=weather_info['description'],
            latitude=weather_info['latitude'],
            longitude=weather_info['longitude']
        )

        return JsonResponse(weather_info)
    else:
        return JsonResponse({'error': 'City not found'}, status=404)

@api_view(['GET'])
def get_weather_interactions(request):
    interactions = WeatherInteraction.objects.all().values()
    return Response(interactions, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def clear_weather_interactions(request):
    WeatherInteraction.objects.all().delete()
    return Response({'message': 'All weather interactions have been cleared.'}, status=status.HTTP_204_NO_CONTENT)
