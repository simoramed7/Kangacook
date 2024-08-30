import React, { useState } from 'react';
import './addRecipeStyles.css';

export const AddNewRecipe = ({ newRecipe, handleAddRecipe, handleInputChange }) => {
  const [errors, setErrors] = useState({
    duration: '',
  });

  const validateDuration = (value) => {
    if (isNaN(value) || value <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, duration: 'Duration must be a positive number.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, duration: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);

    if (name === 'duration') {
      validateDuration(value);
    }
  };

  const isFormValid = () => {
    return (
      newRecipe.title &&
      newRecipe.duration &&
      newRecipe.ingredients &&
      newRecipe.description &&
      !errors.duration
    );
  };

  return (
    <div className="form-container">
      <input
        type="text"
        name="title"
        value={newRecipe.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        className="input"
      />
      <input
        type="number"
        name="duration"
        value={newRecipe.duration}
        onChange={handleChange}
        placeholder="Duration (minutes)"
        className="input"
      />
      {errors.duration && <div className="error-label">Duration must be a positive number.</div>}
      <input
        type="text"
        name="ingredients"
        value={newRecipe.ingredients}
        onChange={handleChange}
        placeholder="Ingredients (comma-separated)"
        className="input"
      />
      <textarea
        name="description"
        value={newRecipe.description}
        onChange={handleChange}
        placeholder="Description"
        className="textarea"
      />
      <button
        onClick={handleAddRecipe}
        className="button"
        disabled={!isFormValid()}
      >
        Add Recipe
      </button>
    </div>
  );
};
