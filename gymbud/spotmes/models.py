from django.db import models

# Create your models here.


class SpotMe(models.Model):
    owner = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE)
    headline = models.CharField(max_length=30)
    location = models.CharField(max_length=30, blank=True)
    postcode = models.CharField(max_length=10, blank=True)
    message = models.TextField(max_length=200)
    searching_for = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    workout_types = models.ManyToManyField("workouts.Workout")
