from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    """
    Serializer for user registration
    """
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = [
            'id', 'email', 'password', 're_password', 
            'first_name', 'last_name', 'phone'
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
        }

class CustomUserSerializer(UserSerializer):
    """
    Serializer for user profile data, used meta class to define the model and fields and extra settings like readonly
    """
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name', 
            'phone', 'date_joined' 
        ]
        # Protect fields from modification
        read_only_fields = ['id', 'date_joined']
