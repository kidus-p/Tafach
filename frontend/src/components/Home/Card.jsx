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
  const [likedRecipes, setLikedRecipes] = useState([]);

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
        setLikedRecipes(liked);
        const isCurrentlyLiked = liked.some((likedRecipe) => likedRecipe.recipeId === recipe._id);
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
        setSavedRecipes(saved);
        const isCurrentlySaved = saved.some((savedRecipe) => savedRecipe.recipeId === recipe._id);
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
        setLikeCount(likeCount + 1);
      } else if (response.status === 200) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
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
            <FaStar className="w-5 h-5" />
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
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md ${
          isLiked ? "text-red-500" : "text-gray-600"
        }`}
        onClick={toggleLike}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: isLiked
            ? "0 0 10px 5px rgba(255, 0, 0, 0.5)"
            : "0 0 5px 2px rgba(0, 0, 0, 0.1)",
          transform: isLiked ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        {isLiked ? (
          <AiFillHeart className="w-6 h-6" />
        ) : (
          <AiOutlineHeart className="w-6 h-6" />
        )}
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
          {likeCount}
        </span>
      </button>

      <button
        className={`absolute top-2 left-2 p-2 rounded-full shadow-md ${
          isSaved ? "text-yellow-500" : "text-gray-600"
        }`}
        onClick={handleSaveClick}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: isSaved
            ? "0 0 10px 5px rgba(255, 215, 0, 0.5)"
            : "0 0 5px 2px rgba(0, 0, 0, 0.1)",
          transform: isSaved ? "scale(1.2)" : "scale(1)",
        }}
      >
        {isSaved ? (
          <RiBookmarkFill className="w-6 h-6" />
        ) : (
          <RiBookmarkLine className="w-6 h-6" />
        )}
      </button>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center mb-2">
          <img
            src={profileImageUrl}
            alt={recipe.createdBy.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-700">{recipe.createdBy.name}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <PiTimer className="mr-2" />
          <span>{recipe.cookingTime} mins</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
