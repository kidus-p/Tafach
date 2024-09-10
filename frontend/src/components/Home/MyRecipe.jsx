import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7070';
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;
  const token = JSON.parse(localStorage.getItem('user'))?.token;

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
  }, [userId, backendUrl, token]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`${backendUrl}/api/recipe/deleterecipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      alert('Recipe deleted successfully.');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" id='recipes'>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-700 mb-4">{recipe.description}</p>
            <button
              onClick={() => handleRecipeClick(recipe._id)}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              View Details
            </button>
            <button
              onClick={() => handleDelete(recipe._id)}
              className="w-full py-2 mt-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
