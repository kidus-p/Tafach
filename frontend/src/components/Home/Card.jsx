import { useNavigate } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
import { AiOutlineHeart, AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";

  const recipeImageUrl = `${backendUrl}${recipe.recipeImage}`;
  const profileImageUrl = `${backendUrl}${recipe.createdBy.profileImage}`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/review/getallreviews/${recipe._id}`
        );
        const reviews = response.data;

        if (Array.isArray(reviews) && reviews.length) {
          const totalRatings = reviews.reduce(
            (acc, review) => acc + review.rating,
            0
          );
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
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div
      className="bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 rounded-xl overflow-hidden relative cursor-pointer"
      onClick={handleMoreClick}
    >
      <img
        src={recipeImageUrl}
        alt={recipe.title}
        className="w-full h-56 object-cover rounded-t-xl"
      />

      <div className="absolute bottom-10 right-4 flex items-center">
        {averageRating !== null ? (
          <div className="flex items-center text-yellow-400 mr-2">
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
        className={`absolute top-3 right-3 p-2 rounded-full transition duration-300 shadow-lg ${
          isFavorite
            ? "text-red-500 animate-pulse"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        style={{
          backgroundColor: "white",
          boxShadow: isFavorite ? "0 0 10px red" : "none",
        }}
      >
        {isFavorite ? (
          <AiFillHeart className="w-6 h-6" />
        ) : (
          <AiOutlineHeart className="w-6 h-6" />
        )}
      </button>

      <button
        className={`absolute top-3 left-3 p-2 rounded-full transition duration-300 shadow-lg ${
          isSaved ? "text-yellow-500" : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={handleSaveClick}
        style={{
          backgroundColor: "white",
          transform: isSaved ? "scale(1.2)" : "scale(1)",
          boxShadow: isSaved ? "0 0 10px gold" : "none",
        }}
      >
        {isSaved ? (
          <RiBookmarkFill className="w-6 h-6" />
        ) : (
          <RiBookmarkLine className="w-6 h-6" />
        )}
      </button>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 flex items-center justify-center bg-white border-4 border-white rounded-full shadow-xl z-10">
        <img
          src={profileImageUrl}
          alt={recipe.createdBy.name}
          className="w-full h-full object-cover rounded-full border-2 border-gray-200"
        />
      </div>

      <div className="p-6 pt-24">
        <h1 className="text-gray-900 font-bold text-xl mb-1 hover:text-gray-800 transition duration-300">
          {recipe.title}
        </h1>
        <p className="text-gray-500 mb-3">{recipe.createdBy.name}</p>
        <div className="flex items-center text-gray-700 mb-4">
          <PiTimer className="mr-2 text-lg" />
          <span>{recipe.cookingTime} min</span>
        </div>
        <button
          className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          onClick={handleMoreClick}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default Card;
