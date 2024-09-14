import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../components/Home/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaClock, FaStar, FaArrowLeft } from "react-icons/fa"; // Import FaArrowLeft
import format from "date-fns/format";
import { differenceInHours } from "date-fns";
import TestimonialCard from "../components/Home/Comments";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/recipe/getrecipe/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/review/getallreviews/${id}`
        );
        setReviews(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchRecipe();
    fetchReviews();
  }, [id, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.comment.trim() || !newReview.rating) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/review/addreview`, {
        recipeId: id,
        comment: newReview.comment,
        rating: newReview.rating,
        userId: user._id,
      });
      const updatedReview = {
        ...response.data,
        userId: {
          _id: user._id,
          name: user.name,
          profileImage: user.profileImage,
        },
      };

      setReviews((prev) => [updatedReview, ...prev]); // Update reviews with user data included
      setNewReview({ comment: "", rating: 5 });
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to add review:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to submit review. Please try again later.");
      }
    }
  };

  const recipeImageUrl = recipe ? `${backendUrl}${recipe.recipeImage}` : "";

  const timeAgo = (date) => {
    const hours = differenceInHours(new Date(), new Date(date));
    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    return format(new Date(date), "MMM d, yyyy");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-12 px-6">
        {recipe ? (
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Back Arrow Button */}
            <button
              className="fixed top-18 left-52 text-gray-700 hover:text-gray-900 text-2xl z-50"
              onClick={() => navigate("/#recipes")} 
            >
              <FaArrowLeft />
            </button>

            {/* Recipe Image */}
            <div className="relative">
              <img
                src={recipeImageUrl}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-t-lg"
              />
            </div>
            {/* Recipe Content */}
            <div className="p-6">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-gray-700 mb-6 text-lg">{recipe.description}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md">
                  <FaClock className="mr-2" /> {recipe.cookingTime} min
                </span>
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow-md">
                  Servings: {recipe.serving}
                </span>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-medium">
                        {ingredient.quantity} {ingredient.unit}:
                      </span>{" "}
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Instructions
                </h2>
                <ol className="list-decimal pl-5 text-gray-700">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">
                      {instruction.description}
                    </li>
                  ))}
                </ol>
              </div>
              {/* Reviews Section */}

              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <TestimonialCard
                        key={review._id}
                        name={review.userId?.name || "Anonymous"}
                        rating={review.rating}
                        comment={review.comment}
                        profileImage={review.userId?.profileImage}
                        role={review.userId?._id === user?._id ? "You" : ""}
                        timeAgo={timeAgo(review.createdAt)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-600">
                      No reviews yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
                {/* Add Review Form */}
                {user && (
                  <form
                    onSubmit={handleSubmitReview}
                    className="mt-8 bg-white p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Add Your Review
                    </h3>
                    <textarea
                      name="comment"
                      value={newReview.comment}
                      onChange={handleInputChange}
                      placeholder="Write your review here..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                      required
                    ></textarea>
                    <div className="flex items-center mb-4 w-full justify-between">
                      <div className="flex items-center">
                        <label className="mr-4 text-gray-700 font-medium">
                          Rating:
                        </label>
                        <div className="flex space-x-1 justify-space-between">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-2xl cursor-pointer ${
                                newReview.rating >= star
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              onClick={() => handleStarClick(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                      >
                        Submit Review
                      </button>
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-700 text-xl">Loading recipe details...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
