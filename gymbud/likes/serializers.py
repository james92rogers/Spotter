from django.db import models
from rest_framework import serializers
from shouts.outbound_serializers import ShoutSerializer
from jwt_auth.outbound_serializers import UserSerializer
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'owner')


class PopulatedSerializer(LikeSerializer):
    owner = UserSerializer(read_only=True)
    shout = ShoutSerializer(read_only=True)
