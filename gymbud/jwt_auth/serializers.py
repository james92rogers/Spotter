from django.db import models
from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from spotmes.serializers import SpotMeSerializer
from shouts.serializers import ShoutSerializer
from workouts.serializers import WorkoutSerializer
from inbox.serializers import MessageSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'


class MinimalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'image',)


class PopulatedUserSerializer(UserSerializer):
    workoutTypes = WorkoutSerializer(many=True)
    shout_set = ShoutSerializer(read_only=True, many=True)
    spotme_set = SpotMeSerializer(read_only=True, many=True)
    sender = MessageSerializer(read_only=True, many=True)
    receiver = MessageSerializer(read_only=True, many=True)
    followers = MinimalUserSerializer(read_only=True, many=True)
    following = MinimalUserSerializer(read_only=True, many=True)
