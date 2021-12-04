from django.db import models

# Create your models here.


class SpotMe(models.Model):
    owner = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE)
    headline = models.CharField(max_length=30)
    location = models.CharField(max_length=30, blank=True)
    postcode = models.CharField(max_length=10, blank=True)
    message = models.TextField(max_length=200)
    searchingFor = models.CharField(max_length=30)
    created = models.DateTimeField(auto_now_add=True)
    workoutTypes = models.ManyToManyField("workouts.Workout")
