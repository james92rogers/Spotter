from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.CharField(max_length=30, unique=True)
    image = models.CharField(max_length=200, blank=True,
                             default='https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg')
    city = models.CharField(max_length=30, blank=True)
    postcode = models.CharField(max_length=30, blank=True)
    gender = models.CharField(max_length=12, blank=True)
    isSearching = models.BooleanField(default=True)
    bio = models.TextField(max_length=250, blank=True)
    allowMales = models.BooleanField(default=True)
    allowFemale = models.BooleanField(default=True)
    allowNonBinary = models.BooleanField(default=True)
    workoutTypes = models.ManyToManyField("workouts.Workout", blank=True)
    following = models.ManyToManyField(
        "jwt_auth.User", related_name="followers", blank=True)
