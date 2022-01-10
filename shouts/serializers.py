from django.db import models
from rest_framework import serializers
from likes.serializers import LikeSerializer
from .models import Shout
from jwt_auth.outbound_serializers import UserSerializer


class ShoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shout
        fields = '__all__'


class PopulatedShoutSerializer(ShoutSerializer):
    owner = UserSerializer()
    like_set = LikeSerializer(read_only=True, many=True)
