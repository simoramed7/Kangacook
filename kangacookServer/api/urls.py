from django.urls import path
from .views import get_recipes, create_recipe, recipe_detail

urlpatterns = [
    path('recipes/', get_recipes, name='get_recipes'),
    path('recipes/create/', create_recipe, name='create_recipe'),
    path('recipes/<int:pk>', recipe_detail, name='recipe_detail')
]