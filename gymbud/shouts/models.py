from django.db import models

# Create your models here.


class Shout(models.Model):
    owner = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE)
    message = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
