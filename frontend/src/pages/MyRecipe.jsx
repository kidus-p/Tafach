// src/pages/MyRecipes.jsx

import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7070';
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  useEffect(() => {
    const fetchRecipes = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${backendUrl}/api/recipe/getallrecipes/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRecipes(response.data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    };

    fetchRecipes();
  }, [userId, backendUrl]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleRecipeClick(recipe._id)}
            >
              <img
                src={`${backendUrl}${recipe.recipeImage}`}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.cookingTime} min</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no recipes yet.</p>
      )}
    </div>
  );
};

export default MyRecipes;
