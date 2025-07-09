from django.db import models
from projects.models import Project
from users.models import CustomUser

class Donation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    donor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        donor_name = str(self.donor) if self.donor else None
        project_title = str(self.project) if self.project else 'Unknown Project'
        if donor_name:
            return f"{donor_name} donated {self.amount} to {project_title}"
        else:
            return f"{self.name or self.email or 'Anonymous'} donated {self.amount} to {project_title}"

# Create your models here.
