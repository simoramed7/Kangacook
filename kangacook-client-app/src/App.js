import React, { useState, useEffect } from 'react';
import { Recipe } from './components/recipe/recipeCard';
import { AddNewRecipe } from './components/addRecipe/addRecipe';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    duration: '',
    ingredients: '',
    description: ''
  });

  useEffect(() => {
    // Fetch existing recipes from your server
    fetch('http://127.0.0.1:8000/api/recipes/')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRecipe = () => {
    const ingredientsArray = newRecipe.ingredients.split(',').map(item => item.trim());

    const recipeToAdd = {
      ...newRecipe,
      ingredients: ingredientsArray,
      duration: parseInt(newRecipe.duration),
    };

    // Send the new recipe to the server
    fetch('http://127.0.0.1:8000/api/recipes/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes([...recipes, data]); // Update the recipe list
        setNewRecipe({ title: '', duration: '', ingredients: '', description: '' }); // Clear the input fields
      })
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <div className="container">
      <div>
      <h1 className="heading">Recipe List</h1>
      {recipes.length ?
      <Recipe recipes={recipes} />
      :
       <div className="no-recipe">
        Please Add a new recipe to the list &#62;&#62;
        </div>
       }
      </div>
      <div>
      <h1 className="heading">Add New Recipe</h1>
      <AddNewRecipe newRecipe={newRecipe} handleAddRecipe={handleAddRecipe} handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default RecipeApp;