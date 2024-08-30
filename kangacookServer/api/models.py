from django.db import models
from django.core.exceptions import ValidationError

def validate_ingredients(value):
    if len(value) > 20:
        raise ValidationError('You can only have a maximum of 20 ingredients.')

class Recipe(models.Model):
    title = models.CharField(max_length=50)
    duration = models.IntegerField()
    ingredients = models.JSONField(validators=[validate_ingredients])
    description = models.TextField()

    def __str__(self):
        return self.title
