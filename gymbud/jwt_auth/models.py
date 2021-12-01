from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.CharField(max_length=30, unique=True)
    image = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=30, blank=True)
    postcode = models.CharField(max_length=5, blank=True)
    gender = models.CharField(max_length=12, blank=True)
    is_searching = models.BooleanField(default=True)
    bio = models.TextField(max_length=250, blank=True)
    allow_males = models.BooleanField(default=True)
    allow_female = models.BooleanField(default=True)
    allow_non_binary = models.BooleanField(default=True)
    workout_types = models.ManyToManyField("workouts.Workout", blank=True)
    following = models.ManyToManyField(
        "jwt_auth.User", related_name="followers", blank=True)
