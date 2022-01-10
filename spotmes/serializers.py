from django.db import models
from rest_framework import serializers
from .models import SpotMe
from workouts.serializers import WorkoutSerializer
from jwt_auth.outbound_serializers import UserSerializer


class SpotMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotMe
        fields = '__all__'


class PopulatedSpotMeSerializer(SpotMeSerializer):
    workoutTypes = WorkoutSerializer(many=True)
    owner = UserSerializer()
