from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Cell(models.Model):
    input_value = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(9)],
    )
