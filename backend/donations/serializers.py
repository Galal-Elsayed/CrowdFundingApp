from rest_framework import serializers
from .models import Donation

class DonationSerializer(serializers.ModelSerializer):
    donor_name = serializers.SerializerMethodField()
    donor_email = serializers.SerializerMethodField()

    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('donor_name', 'donor_email')

    def get_donor_name(self, obj):
        if obj.donor:
            return str(obj.donor)
        return obj.name or 'Anonymous'

    def get_donor_email(self, obj):
        if obj.donor and hasattr(obj.donor, 'email'):
            return obj.donor.email
        return obj.email or ''