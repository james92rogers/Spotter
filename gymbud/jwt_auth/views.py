from django.core.exceptions import PermissionDenied
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import serializers, status
from .serializers import PopulatedUserSerializer, UserSerializer
# from rest_framework.permissions import AllowAny
User = get_user_model()

# Create your views here.


class UsersListView(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class UsersDetailView(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        if user.id != request.user.id:
            raise PermissionDenied()
        updated_user = UserSerializer(user, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RegisterView(APIView):
    #permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Succesful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):
    #permission_classes = (AllowAny,)

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})

    def post(self, request):
        print("********** post method reached **********")

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentials'})

        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'id': user.id, 'gender': user.gender, 'message': f'Welcome back {user.username}!'})


class AddFollowerView(APIView):
    #permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        u1 = User.objects.get(id=request.user.id)
        u2 = User.objects.get(id=pk)
        u1.following.add(u2)
        u1.save()
        serialized_u1 = PopulatedUserSerializer(u1)
        return Response(serialized_u1.data, status=status.HTTP_201_CREATED)


class DeleteFollowerView(APIView):
    #permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        u1 = User.objects.get(id=request.user.id)
        u2 = User.objects.get(id=pk)

        u1.following.remove(u2)
        u1.save()
        serialized_u1 = PopulatedUserSerializer(u1)
        return Response(serialized_u1.data, status=status.HTTP_202_ACCEPTED)
