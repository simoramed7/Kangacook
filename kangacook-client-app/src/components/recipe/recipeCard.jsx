import React from 'react';
import './recipeStyles.css'


export const Recipe = ({recipes}) => {
    return(
      <div className="recipe-list">
          {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
        <h2>{recipe.title}</h2>
        <p><strong>Duration:</strong> {recipe.duration} minutes</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
        <p><strong>Description:</strong> {recipe.description}</p>
      </div>
    ))}
    </div>
    )
}
