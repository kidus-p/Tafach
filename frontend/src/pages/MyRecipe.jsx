import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7070';
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
        } else {
          console.error('Error: Recipes data is not an array');
          setRecipes([]);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [backendUrl, token]);

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>{recipe.name}</li>
          ))}
        </ul>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default MyRecipes;
