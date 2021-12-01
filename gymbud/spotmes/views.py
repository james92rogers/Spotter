from django.shortcuts import render
from .models import SpotMe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedSpotMeSerializer


class SpotMeDetailView(APIView):

    def get(self, request, pk):
        spotme = SpotMe.objects.get(id=pk)
        serialized_spotme = PopulatedSpotMeSerializer(spotme)
        return Response(serialized_spotme.data, status=status.HTTP_200_OK)


class SpotMeListView(APIView):

    def get(self, request):
        spotmes = SpotMe.objects.all()
        serialized_spotmes = PopulatedSpotMeSerializer(spotmes, many=True)
        return Response(serialized_spotmes.data, status=status.HTTP_200_OK)
