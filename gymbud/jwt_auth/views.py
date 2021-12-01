from django.shortcuts import render
from rest_framework.views import APIView
from .models import User
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedUserSerializer

# Create your views here.


class UsersListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class UsersDetailView(APIView):

    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
