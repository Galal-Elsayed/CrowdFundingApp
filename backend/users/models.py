from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None  # Remove username field completely
    
    # Email field - used for login
    email = models.EmailField(
        unique=True,
        verbose_name='Email Address',
        help_text='Required. Enter a valid email address.'
    )
    
    # Phone field with Egyptian validation
    phone = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        verbose_name='Phone Number',
        help_text='Egyptian phone number (e.g., +201234567890)',
        validators=[
            RegexValidator(
                regex=r'^\+201[0-9]{9}$',
                message='Phone number must be a valid Egyptian number.'
            )
        ]
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = CustomUserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email

    def get_full_name(self):
        """Get user's full name"""
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        """Get user's first name"""
        return self.first_name

