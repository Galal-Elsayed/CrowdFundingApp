from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Donation
from .serializers import DonationSerializer
from projects.models import Project
from projects.serializers import ProjectSerializer
from django.db.models import Sum

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

    def perform_create(self, serializer):
        donation = serializer.save()
        project = donation.project
        # Recalculate total donations for this project
        total = Donation.objects.filter(project=project).aggregate(Sum('amount'))['amount__sum'] or 0
        project.donated_amount = total
        project.save()
        return donation

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        donation_id = response.data.get('id') if hasattr(response, 'data') else None
        donation = Donation.objects.get(pk=donation_id) if donation_id else None
        project = donation.project if donation else None
        project_data = ProjectSerializer(project, context={'request': request}).data if project else None
        return Response({
            'donation': response.data,
            'project': project_data
        }, status=status.HTTP_201_CREATED)
# Create your views here.
