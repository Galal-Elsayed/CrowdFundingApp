from django.db import models
from projects.models import Project
from users.models import CustomUser

class Donation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    donor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.username} donated {self.amount} to {self.project.title}"

# Create your models here.
