from django.db import models

# Create your models here.


class Like(models.Model):
    owner = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE)
    shout = models.ForeignKey("shouts.Shout", on_delete=models.CASCADE)
