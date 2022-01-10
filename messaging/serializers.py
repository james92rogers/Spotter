from django.db import models
from rest_framework import serializers
from .models import Message
from jwt_auth.outbound_serializers import MinimalUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class PopulatedMessageSerializer(MessageSerializer):
    sender = MinimalUserSerializer()
    receiver = MinimalUserSerializer()
