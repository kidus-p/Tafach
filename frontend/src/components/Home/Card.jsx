import { Link } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import '../../css/imageFloating.css';

const Card = ({ recipe }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";

  // Construct the full URL for the images
  const recipeImageUrl = `${backendUrl}${recipe.recipeImage}`;
  const profileImageUrl = `${backendUrl}${recipe.createdBy.profileImage}`;

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden relative">
      <img 
        src={recipeImageUrl} 
        alt={recipe.title} 
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white border-4 border-white rounded-full shadow-lg z-10">
        <img 
          src={profileImageUrl} 
          alt={recipe.createdBy.name} 
          className="w-full h-full object-cover rounded-full" 
        />
      </div>

      <div className="p-5 pt-16">
        <Link to={`/recipe/${recipe._id}`}>
          <h1 className="text-gray-800 font-bold text-xl mb-2 hover:text-gray-600">{recipe.title}</h1>
        </Link>
        <p className="text-gray-600 mb-4">{recipe.createdBy.name}</p>
        <div className="flex justify-between items-center mb-4">
          <span className={`py-1 px-3 text-sm font-medium rounded-lg text-white ${getDifficultyClass(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <div className="flex items-center text-gray-600">
            <PiTimer className="mr-2" />
            <span>{recipe.cookingTime} min</span>
          </div>
        </div>
        <button className="absolute top-4 right-4 bg-white text-gray-600 p-2 rounded-full hover:bg-gray-100 transition duration-300">
          <AiOutlineHeart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Utility function to get difficulty level class
const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-400";
    case "Medium":
      return "bg-yellow-400";
    case "Hard":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

export default Card;
