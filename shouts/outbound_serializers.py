from django.db import models
from rest_framework import serializers
from .models import Shout


class ShoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shout
        fields = '__all__'
