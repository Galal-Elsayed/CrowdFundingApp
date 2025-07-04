from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True,
        validators=[
            RegexValidator(
                regex=r'^\+201[0-9]{9}$',
                message='Phone number must be a valid Egyptian number.'
            )
        ])
