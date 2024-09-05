import { useNavigate } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  const recipeImageUrl = `${backendUrl}${recipe.recipeImage}`;
  const profileImageUrl = `${backendUrl}${recipe.createdBy.profileImage}`;

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  useEffect(() => {
    if (!recipe || !user) return;

    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/like/countLikes/${recipe._id}`);
        setLikeCount(response.data.totalLikes);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    const fetchLikedRecipes = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(`${backendUrl}/api/like/likedrecipes/${user._id}`);
        const liked = response.data || [];
        const isCurrentlyLiked = liked.some((likedRecipe) => likedRecipe.recipeId._id === recipe._id);
        setIsLiked(isCurrentlyLiked);
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
    };

    const fetchFavorites = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(`${backendUrl}/api/savedRecipe/getsavedrecipe/${user._id}`);
        const saved = response.data || [];
        const isCurrentlySaved = saved.some((savedRecipe) => savedRecipe.recipeId._id === recipe._id);
        setIsSaved(isCurrentlySaved);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    const fetchReviews = async () => {
      if (!recipe?._id) return;
      try {
        const response = await axios.get(`${backendUrl}/api/review/getallreviews/${recipe._id}`);
        const reviews = response.data || [];
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

    fetchFavorites();
    fetchReviews();
    fetchLikeCount();
    fetchLikedRecipes();
  }, [recipe?._id, backendUrl, user?._id]);

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

  const toggleLike = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("You need to be logged in to like a recipe.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/like/addlike`, {
        likedBy: user._id,
        recipeOwner: recipe.createdBy._id,
        recipeId: recipe._id,
      });

      if (response.status === 201) {
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      } else if (response.status === 200) {
        setIsLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Failed to like the recipe. Please try again.");
    }
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

    try {
      const response = await axios.post(`${backendUrl}/api/savedRecipe/addsavedrecipe`, {
        recipeId,
        userId,
      });

      if (response.data) {
        setIsSaved(!isSaved);
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
      className="bg-white shadow-sm rounded-lg overflow-hidden relative mb-5 cursor-pointer max-w-[600px] mx-auto hover:shadow-2xl transition-shadow duration-300 transform hover:scale-110"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <img
        src={recipeImageUrl}
        alt={recipe.title}
        className="w-full h-64 object-cover"
      />

      {/* Header with Profile */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src={profileImageUrl}
          alt={recipe.createdBy.name}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div className="ml-3">
          <p className="font-semibold text-sm">{recipe.createdBy.name}</p>
          <p className="text-xs text-gray-500">{recipe.createdBy.username}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <button
            className={`text-xl ${isLiked ? "text-red-500" : "text-gray-700"}`}
            onClick={toggleLike}
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <span className="text-sm text-gray-500">{likeCount} likes</span>
        </div>
        <button
          className={`text-xl ${isSaved ? "text-[#22c55e]" : "text-gray-700"}`}
          onClick={handleSaveClick}
        >
          {isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}
        </button>
      </div>

      {/* Recipe Info */}
      <div className="px-4 pb-4">
        <h2 className="font-semibold text-lg">{recipe.title}</h2>
        <div className="flex items-center space-x-2 text-gray-600 mt-2">
          <PiTimer className="text-xl" />
          <span>{recipe.cookingTime} min</span>
        </div>
        <div className="flex items-center mt-2">
          {averageRating !== null ? (
            <div className="flex items-center text-yellow-500">
              {renderStars(parseFloat(averageRating))}
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <FaStar className="w-5 h-5" />
              <span className="ml-2">No reviews yet</span>
            </div>
          )}
          <span className="ml-2 text-sm text-gray-600">({ratingCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
