import { useNavigate } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import '../../css/imageFloating.css'; // Ensure this CSS file includes necessary styles for floating images

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";

  // Construct the full URL for the images
  const recipeImageUrl = `${backendUrl}${recipe.recipeImage}`;
  const profileImageUrl = `${backendUrl}${recipe.createdBy.profileImage}`;

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div
      className="bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden relative cursor-pointer transform hover:scale-105"
      onClick={handleCardClick}
    >
      <img 
        src={recipeImageUrl} 
        alt={recipe.title} 
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out" 
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center bg-white border-4 border-white rounded-full shadow-lg z-10">
        <img 
          src={profileImageUrl} 
          alt={recipe.createdBy.name} 
          className="w-full h-full object-cover rounded-full border-2 border-gray-200" 
        />
      </div>

      <div className="p-5 pt-16">
        <h1 className="text-gray-800 font-bold text-xl mb-2 hover:text-gray-600 transition duration-300">
          {recipe.title}
        </h1>
        <p className="text-gray-600 mb-4">{recipe.createdBy.name}</p>
        <div className="flex justify-between items-center mb-4">
          <span className={`py-1 px-3 text-sm font-medium rounded-lg text-white ${getDifficultyClass(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <div className="flex items-center text-gray-600">
            <PiTimer className="mr-2 text-lg" />
            <span>{recipe.cookingTime} min</span>
          </div>
        </div>
        <button className="absolute top-4 right-4 bg-white text-gray-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
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
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "Hard":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

export default Card;
