from rest_framework import serializers
from .models import Project
from users.models import CustomUser  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email']  

class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Project
        fields = '__all__'

    def to_representation(self, instance):

        data = super().to_representation(instance)
        request = self.context.get('request')
        if instance.image and request:
            data['image'] = request.build_absolute_uri(instance.image.url)
        return data
