import { useParams } from "react-router-dom";
import { useAuth } from "../components/Home/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaClock, FaStar } from "react-icons/fa";
import format from "date-fns/format";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
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

      setReviews((prev) => [updatedReview, ...prev]);
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

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {recipe ? (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Recipe Image */}
          <div className="relative">
            <img
              src={recipeImageUrl}
              alt={recipe.title}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 left-4 bg-white bg-opacity-75 px-4 py-2 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800">
                {recipe.title}
              </h1>
            </div>
          </div>
          {/* Recipe Content */}
          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-md">
                  <FaClock className="mr-2" /> {recipe.cookingTime} min
                </span>
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full shadow-md">
                  Servings: {recipe.serving}
                </span>
              </div>
              <Link to="/" className="text-indigo-600 hover:underline">
                &larr; Back to Recipes
              </Link>
            </div>
            <p className="text-gray-600 mb-8">{recipe.description}</p>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ingredients
              </h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="font-medium">
                      {ingredient.quantity} {ingredient.unit}:
                    </span>{" "}
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Instructions
              </h2>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction.description}</li>
                ))}
              </ol>
            </div>
            {/* Reviews Section */}
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Reviews List */}
              <div className="flex-1 mb-12 lg:mb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={
                              review.userId?.profileImage
                                ? `${backendUrl}${review.userId.profileImage}`
                                : "default-profile.png"
                            }
                            alt={review.userId?.name || "Anonymous"}
                            className="w-12 h-12 object-cover rounded-full border border-gray-300"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">
                              {review.userId?.name || "Anonymous"}
                            </span>
                            <div className="flex items-center text-yellow-500">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={`text-xl ${
                                    index < review.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <span className="text-xs text-gray-500 block mt-2">
                            {format(
                              new Date(review.createdAt),
                              "MMM d, yyyy h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      No reviews yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
              {/* Add Review Form */}
              {user && (
                <form
                  onSubmit={handleSubmitReview}
                  className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Add Your Review
                  </h3>
                  <textarea
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    placeholder="Write your review..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                    required
                  ></textarea>
                  <div className="flex items-center mb-4">
                    <label className="mr-4 text-gray-700 font-medium">
                      Rating:
                    </label>
                    <div className="flex space-x-1">
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
                  {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                  )}
                  <button
                    type="submit"
                    className="py-2 px-4 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-700">Loading recipe details...</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
