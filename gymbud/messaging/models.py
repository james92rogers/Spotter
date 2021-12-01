from django.db import models

# Create your models here.


class Message(models.Model):
    sender = models.ForeignKey(
        "jwt_auth.User", related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        "jwt_auth.User", related_name='receiver', on_delete=models.CASCADE)
    headline = models.CharField(max_length=30)
    message = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
