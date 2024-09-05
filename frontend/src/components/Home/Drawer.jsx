import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(user.profileImage || "");
  const [bio, setBio] = useState(user.bio || "");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [editBio, setEditBio] = useState(false);
  const [activeTab, setActiveTab] = useState("My Recipes");
  const [myRecipes, setMyRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/user/getuser/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.user) {
            const updatedProfileImage = `${backendUrl}${
              response.data.user.profileImage
            }?${new Date().getTime()}`;
            setProfilePicture(updatedProfileImage);
            setBio(response.data.user.bio || "");
            setName(response.data.user.name || "");
            setEmail(response.data.user.email || "");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    if (isDrawerOpen) {
      fetchUserProfile();
    }
  }, [isDrawerOpen, user, backendUrl, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "My Recipes") {
        await fetchMyRecipes();
      } else if (activeTab === "Liked") {
        await fetchLikedRecipes();
      } else if (activeTab === "Saved") {
        await fetchSavedRecipes();
      }
    };

    fetchData();
  }, [activeTab]);

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/recipe/getuserrecipe/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyRecipes(response.data);
    } catch (error) {
      console.error("Error fetching user's recipes:", error);
    }
  };

  const fetchLikedRecipes = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/like/likedrecipes/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/savedrecipe/getsavedrecipe/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await axios.put(
          `${backendUrl}/api/user/updateprofile/${user._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.status === 200 &&
          response.data &&
          response.data.profileImage
        ) {
          const updatedProfileImage = `${backendUrl}${
            response.data.profileImage
          }?${new Date().getTime()}`;
          setProfilePicture(updatedProfileImage);
        }
      } catch (error) {
        console.error(
          "Error uploading profile picture:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleBioUpdate = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/updateprofile/${user._id}`,
        { bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEditBio(false);
      }
    } catch (error) {
      console.error(
        "Error updating bio:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogoutAndCloseDrawer = () => {
    handleLogout();
    handleClose();
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`${backendUrl}/api/recipe/deleterecipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyRecipes(myRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleUpdateRecipe = (recipeId) => {
    // Redirect to the update recipe page or open a modal for updating
    navigate(`/update-recipe/${recipeId}`);
  };

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div
      className={`fixed z-30 top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-transform duration-300 ease-in-out transform ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="w-full max-w-15xl h-full max-h-[90vh] bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-2xl rounded-lg border border-gray-300"
        style={{ margin: "2rem" }}
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-green-900 via-green-700 to-green-900 rounded-t-lg text-white">
            <h2 className="text-lg font-semibold">Profile</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-yellow-400 focus:outline-none transition-transform duration-200 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="flex p-4 bg-gradient-to-t from-gray-200 via-white to-gray-200 border-b border-gray-200">
            <div className="flex-shrink-0 mr-4">
              <div className="relative h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-400 overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-700">
                    {user.name[0].toUpperCase()}
                  </span>
                )}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-400 shadow-md transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    onChange={handleProfilePictureUpload}
                  />
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600">{email}</p>
              <p className="text-sm text-gray-600 mt-2">
                {bio || "Click to add your bio."}
              </p>
            </div>
          </div>

          {/* Tab Bar Section */}
          <div className="flex justify-center border-b border-gray-200">
            {["My Recipes", "Liked", "Saved"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 p-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-green-700 text-green-700"
                    : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Section Based on Tab */}
          <div className="flex-grow p-8 bg-gray-50 overflow-y-auto">
            {activeTab === "My Recipes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {myRecipes.length > 0 ? (
                  myRecipes.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="group relative border rounded-lg shadow-md bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => handleCardClick(recipe._id)}
                    >
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={`${backendUrl}${recipe.recipeImage}`}
                          alt={recipe.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents card click
                              handleUpdateRecipe(recipe._id);
                            }}
                            className="bg-white p-2 rounded-full shadow-md text-green-600 hover:bg-green-100 transition-colors duration-200"
                            title="Edit Recipe"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V17h4.414l10-10a2 2 0 000-2.828l-1.586-1.586z" />
                              <path d="M12.293 7.293a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414l-1.414 1.414-2.828-2.828 1.414-1.414z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRecipe(recipe._id);
                            }}
                            className="bg-white p-2 rounded-full shadow-md text-red-600 hover:bg-red-100 transition-colors duration-200"
                            title="Delete Recipe"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 6h18M9 6v12m6-12v12M5 6l1-4h12l1 4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {recipe.title}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {recipe.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No recipes found.</p>
                )}
              </div>
            )}

            {activeTab === "Liked" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {likedRecipes.length > 0 ? (
                  likedRecipes.map((recipe) => (
                    <div
                      key={recipe.recipeId._id}
                      className="group relative border rounded-lg shadow-md bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => handleCardClick(recipe.recipeId._id)}
                    >
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={`${backendUrl}${recipe.recipeId.recipeImage}`}
                          alt={recipe.recipeId.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {recipe.recipeId.title}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {recipe.recipeId.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No liked recipes found.
                  </p>
                )}
              </div>
            )}

            {activeTab === "Saved" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe) => (
                    <div
                      key={recipe.recipeId._id}
                      className="group relative border rounded-lg shadow-md bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => handleCardClick(recipe.recipeId._id)}
                    >
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={`${backendUrl}${recipe.recipeId.recipeImage}`}
                          alt={recipe.recipeId.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {recipe.recipeId.title}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {recipe.recipeId.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No saved recipes found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Logout Section */}
          <div className="flex justify-end p-4 bg-gradient-to-r from-white to-gray-100 rounded-b-lg">
            <button
              onClick={handleLogoutAndCloseDrawer}
              className="bg-red-500 text-white text-xs py-2 px-4 font-bold rounded-lg hover:bg-red-600 transition-transform duration-200 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
