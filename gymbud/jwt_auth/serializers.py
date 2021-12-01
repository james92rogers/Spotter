from django.db import models
from rest_framework import serializers
from spotmes.serializers import SpotMeSerializer
from shouts.serializers import ShoutSerializer
from .models import User
from workouts.serializers import WorkoutSerializer
from messaging.serializers import MessageSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MinimalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PopulatedUserSerializer(UserSerializer):
    workout_types = WorkoutSerializer(many=True)
    shout_set = ShoutSerializer(read_only=True, many=True)
    spotme_set = SpotMeSerializer(read_only=True, many=True)
    sender = MessageSerializer(many=True)
    receiver = MessageSerializer(many=True)
    followers = MinimalUserSerializer(many=True)
    following = MinimalUserSerializer(many=True)
