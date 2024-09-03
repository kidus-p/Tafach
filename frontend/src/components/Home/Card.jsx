import { useNavigate } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
import { AiOutlineHeart, AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../css/imageFloating.css';
import { useAuth } from "./useAuth";
const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  const recipeImageUrl = `${backendUrl}${recipe.recipeImage}`;
  const profileImageUrl = `${backendUrl}${recipe.createdBy.profileImage}`;

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/getallreviews/${recipe._id}`);
        const reviews = response.data;

        if (Array.isArray(reviews) && reviews.length) {
          const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRatings / reviews.length;
          setAverageRating(avgRating.toFixed(1));
          setRatingCount(reviews.length);
        } else {
          setAverageRating(null);
          setRatingCount(0);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setAverageRating("Error fetching rating");
        setRatingCount(0);
      }
    };

    fetchReviews();
  }, [recipe._id, backendUrl]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
  
    if (!isAuthenticated) {
      alert("You need to be logged in to save a recipe.");
      return;
    }
  
    if (!user || !user._id) {
      console.error("User information is not available. Please log in again.");
      alert("User information is not available. Please log in again.");
      return;
    }
  
    const recipeId = recipe._id;
    const userId = user._id;
    console.log("Recipe ID:", recipeId);
    console.log("User ID:", userId);
  
    try {
      const response = await axios.post(`${backendUrl}/api/savedRecipe/addsavedrecipe`, {
        recipeId,
        userId
      });
  
      if (response.data) {
        setIsSaved(true);
      } else {
        console.log("Response data is empty or not in expected format.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error.response?.data || error.message);
      alert("Failed to save recipe. Please try again.");
    }
  };
  

  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg overflow-hidden relative cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={recipeImageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="absolute bottom-9 right-2 flex items-center">
        {averageRating !== null ? (
          <div className="flex items-center text-yellow-500 mr-2">
            {renderStars(parseFloat(averageRating))}
          </div>
        ) : (
          <div className="flex items-center text-gray-500 mr-2">
            <AiOutlineStar className="w-5 h-5" />
            <span className="text-gray-600 text-xs">Not rated yet</span>
          </div>
        )}
        {ratingCount > 0 && (
          <span className="text-gray-600 text-xs">
            {averageRating} ({ratingCount})
          </span>
        )}
      </div>

      <button
        className={`absolute top-2 right-2 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? <AiFillHeart className="w-6 h-6" /> : <AiOutlineHeart className="w-6 h-6" />}
      </button>

      <button
        className={`absolute top-2 left-2 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md ${isSaved ? 'animate-save' : ''}`}
        onClick={handleSaveClick}
        style={{
          transform: isSaved ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        {isSaved ? <RiBookmarkFill className="w-6 h-6" /> : <RiBookmarkLine className="w-6 h-6" />}
      </button>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center bg-white border-4 border-white rounded-full shadow-lg z-10">
        <img
          src={profileImageUrl}
          alt={recipe.createdBy.name}
          className="w-full h-full object-cover rounded-full border-2 border-gray-200"
        />
      </div>

      <div className="p-4 pt-20">
        <h1 className="text-gray-800 font-extrabold text-lg mb-1 hover:text-gray-700 transition duration-300">
          {recipe.title}
        </h1>
        <p className="text-gray-500 mb-2">{recipe.createdBy.name}</p>
        <div className="flex items-center text-gray-600 mb-4">
          <PiTimer className="mr-2 text-lg" />
          <span>{recipe.cookingTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
