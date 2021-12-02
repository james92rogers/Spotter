from django.shortcuts import render
from .models import SpotMe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedSpotMeSerializer, SpotMeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from django.core.exceptions import PermissionDenied


class SpotMeDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        spotme = SpotMe.objects.get(id=pk)
        serialized_spotme = PopulatedSpotMeSerializer(spotme)
        return Response(serialized_spotme.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        spotme = SpotMe.objects.get(id=pk)
        if spotme.owner != request.user:
            raise PermissionDenied()
        request.data["owner"] = request.user.id
        updated_spotme = SpotMeSerializer(spotme, data=request.data)
        if updated_spotme.is_valid():
            updated_spotme.save()
            return Response(updated_spotme.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_spotme.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        try:
            spotme = SpotMe.objects.get(id=pk)
        except SpotMe.DoesNotExist:
            raise NotFound()
        if spotme.owner != request.user:
            raise PermissionDenied()

        spotme.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SpotMeListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        spotmes = SpotMe.objects.all()
        serialized_spotmes = PopulatedSpotMeSerializer(spotmes, many=True)
        return Response(serialized_spotmes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        spotme = SpotMeSerializer(data=request.data)
        if spotme.is_valid():
            spotme.save()
            return Response(spotme.data, status=status.HTTP_201_CREATED)
        else:
            return Response(spotme.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
