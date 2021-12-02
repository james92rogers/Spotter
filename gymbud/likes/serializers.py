from django.db import models
from rest_framework import serializers
from shouts.outbound_serializers import ShoutSerializer
from jwt_auth.outbound_serializers import MinimalUserSerializer
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class PopulatedSerializer(LikeSerializer):
    owner = MinimalUserSerializer(read_only=True)
    shout = ShoutSerializer(read_only=True)
