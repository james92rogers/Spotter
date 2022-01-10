# Generated by Django 3.2.9 on 2021-12-04 15:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0003_auto_20211204_1509'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='receiver',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='jwt_auth.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]