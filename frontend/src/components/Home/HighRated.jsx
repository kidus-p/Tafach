import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const HighlightedSection = () => {
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";

  useEffect(() => {
    const fetchHighRatedRecipes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/recipe/getallrecipes`);

        console.log('Full recipe data:', response.data);

        const highRatedRecipes = response.data.filter((recipe) => {
          const reviews = Array.isArray(recipe.reviwe) ? recipe.reviwe : [];
          console.log('Reviews:', reviews);
          const avgRating = reviews.length > 0
            ? reviews.reduce((acc, review) => acc + (review.rating|| 0), 0) / reviews.length
            : 0;

          console.log('Average rating for recipe:', avgRating);

          return avgRating >= 4;  // Only include recipes with an average rating of 4 or above
        });

        console.log('High-rated recipes:', highRatedRecipes);

        setRecipes(highRatedRecipes);
      } catch (error) {
        console.error('Error fetching high-rated recipes:', error);
      }
    };

    fetchHighRatedRecipes();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4  mt-8">Highlighted Recipes</h2>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe._id} recipe={recipe} />
          ))}
        </div>
    </div>
  );
};

export default HighlightedSection;
