import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/recipe/getrecipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    const recipeImageUrl = recipe ? `${backendUrl}${recipe.recipeImage}` : '';
    const profileImageUrl = recipe && recipe.createdBy ? `${backendUrl}${recipe.createdBy.profileImage}` : '';

    return (
        <div className="bg-gray-100 min-h-screen py-16 px-8">
            {recipe && (
                <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                    {/* Recipe Image and Profile Info */}
                    <div className="relative">
                        <img 
                            src={recipeImageUrl} 
                            alt={recipe.title} 
                            className="w-full h-96 object-cover rounded-t-2xl transition-transform duration-500 ease-in-out transform hover:scale-105"
                        />
                        {recipe.createdBy && (
                            <div className="absolute top-6 left-6 flex items-center bg-white p-4 rounded-full shadow-lg border border-gray-300">
                                <img 
                                    src={profileImageUrl} 
                                    alt={recipe.createdBy.name} 
                                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
                                />
                                <span className="ml-4 font-bold text-gray-800 text-lg">{recipe.createdBy.name}</span>
                            </div>
                        )}
                    </div>
                    {/* Recipe Content */}
                    <div className="p-12">
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">{recipe.title}</h1>
                        <p className="text-gray-700 mb-8 text-lg leading-relaxed">{recipe.description}</p>
                        <div className="flex flex-wrap gap-6 mb-10">
                            <span className="py-4 px-8 text-lg font-medium rounded-full text-white bg-teal-700 shadow-lg">
                                {recipe.cookingTime} min
                            </span>
                            <span className="py-4 px-8 text-lg font-medium rounded-full text-black bg-gold-600 shadow-lg">
                                Servings: {recipe.serving}
                            </span>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-4xl font-semibold text-gray-800 mb-6">Ingredients</h2>
                            <ul className="list-disc pl-6 space-y-3 text-gray-700">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="font-semibold text-gray-800">{ingredient.quantity} {ingredient.unit}:</span>
                                        <span className="ml-2 text-gray-600">{ingredient.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-4xl font-semibold text-gray-800 mb-6">Instructions</h2>
                            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index} className="text-gray-700">
                                        <span className="font-semibold text-gray-800">Step {index + 1}:</span> {instruction.description}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;
