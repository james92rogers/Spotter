from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from .models import Shout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedShoutSerializer, ShoutSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound


class ShoutDetailView(APIView):

    #permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        shout = Shout.objects.get(id=pk)
        serialized_shout = PopulatedShoutSerializer(shout)
        return Response(serialized_shout.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        shout = Shout.objects.get(id=pk)
        if shout.owner != request.user:
            raise PermissionDenied()
        request.data["owner"] = request.user.id
        updated_shout = ShoutSerializer(shout, data=request.data)
        if updated_shout.is_valid():
            updated_shout.save()
            return Response(updated_shout.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_shout.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        try:
            shout = Shout.objects.get(id=pk)
        except Shout.DoesNotExist:
            raise NotFound()
        if shout.owner != request.user:
            raise PermissionDenied()

        shout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ShoutListView(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        shouts = Shout.objects.all()
        serialized_shouts = PopulatedShoutSerializer(shouts, many=True)
        return Response(serialized_shouts.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        shout = ShoutSerializer(data=request.data)
        if shout.is_valid():
            shout.save()
            return Response(shout.data, status=status.HTTP_201_CREATED)
        else:
            return Response(shout.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
