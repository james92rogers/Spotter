from django.shortcuts import render
from .models import Shout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedShoutSerializer


class ShoutDetailView(APIView):

    def get(self, request, pk):
        shout = Shout.objects.get(id=pk)
        serialized_shout = PopulatedShoutSerializer(shout)
        return Response(serialized_shout.data, status=status.HTTP_200_OK)


class ShoutListView(APIView):

    def get(self, request):
        shouts = Shout.objects.all()
        serialized_shouts = PopulatedShoutSerializer(shouts, many=True)
        return Response(serialized_shouts.data, status=status.HTTP_200_OK)
