import { useEffect, useState } from 'react';
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
  
        const highRatedRecipes = await Promise.all(
          response.data.map(async (recipe) => {
            const reviewIds = recipe.reviwe;
            const reviews = await axios.get(`${backendUrl}/api/review/getallreviews/${recipe._id}`, {
              params: {
                reviewIds: JSON.stringify(reviewIds),
              },
            });
  
            const avgRating =
              reviews.data.length > 0
                ? reviews.data.reduce((acc, review) => acc + review.rating, 0) / reviews.data.length
                : 0;
  
            console.log('Average rating for recipe:', avgRating);
  
            return { ...recipe, avgRating };
          })
        );
  
        const filteredRecipes = highRatedRecipes.filter((recipe) => recipe.avgRating >= 4);
  
        console.log('High-rated recipes:', filteredRecipes);
  
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error('Error fetching high-rated recipes:', error);
      }
    };
  
    fetchHighRatedRecipes();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="bg-white">
      <h2 className="text-5xl font-extrabold mb-16 mt-16 text-black "><span className='text-green-500'>Highlighted</span> Recipes</h2>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HighlightedSection;
