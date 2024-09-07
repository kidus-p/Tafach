import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  profilePic1,
  profilePic2,
  profilePic3,
  profilePic4,
  profilePic5,
  profilePic6,
  profilePic7,
  profilePic8,
  profilePic9,
  profilePic10,
  profilePic11,
  profilePic12,
  profilePic13,
  profilePic14,
  profilePic15,
  profilePic16,
  profilePic17,
  profilePic18,
  profilePic19,
  profilePic20,
} from "../../utilitys/BackgrounPic";

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

  const profilePics = [
    profilePic1,
    profilePic2,
    profilePic3,
    profilePic4,
    profilePic5,
    profilePic6,
    profilePic7,
    profilePic8,
    profilePic9,
    profilePic10,
    profilePic11,
    profilePic12,
    profilePic13,
    profilePic14,
    profilePic15,
    profilePic16,
    profilePic17,
    profilePic18,
    profilePic19,
    profilePic20,
  ];

  const randomProfilePic =
    profilePics[Math.floor(Math.random() * profilePics.length)];

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
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      setLikedRecipes(response.data);
      console.log(likedRecipes);
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
    navigate(`/update-recipe/${recipeId}`);
  };

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div
      className={`fixed z-30 inset-0 flex justify-center items-center bg-transparent  transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full h-full mx-8 mt-5 shadow-2xl rounded-lg border border-gray-300 bg-white overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div
            className="relative flex h-64 justify-start items-end p-4 border-b border-gray-200 rounded-t-lg bg-cover bg-center text-white"
            style={{
              backgroundImage: `url(${profilePic15})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 focus:outline-none transition-transform duration-200 transform hover:scale-110"
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

            {/* User Profile Picture */}
            <div className="absolute -bottom-12 left-4">
              <div className="relative h-32 w-32 rounded-full bg-gray-300 border-4 border-white overflow-hidden shadow-lg">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-700 flex justify-center items-center h-full">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="ml-10 mb-6 mt-16">
            {/* Name and Email Section */}
            <div className="flex flex-col space-y-1">
              <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
              <p className="text-lg text-gray-600">{email}</p>
            </div>

            {/* Bio Section */}
            <div className=" flex">
              {/* Display Bio */}
              <p className="text-gray-600 text-base flex-grow  max-w-xl border-b-2 border-green-400 pb-2">
                {bio}
              </p>

              {/* Edit Icon Button */}
              {!editBio && (
                <button
                  onClick={() => setEditBio(true)}
                  className="ml-2 p-1 text-gray-500 hover:text-green-400 transition-colors duration-200"
                  aria-label="Edit Bio"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 00-3 0l-9 9v3h3l9-9z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Bio Edit Mode */}
            {editBio && (
              <div className="mt-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="4"
                  placeholder="Write something about yourself..."
                />
                <div className="flex justify-start mt-2">
                  <button
                    onClick={handleBioUpdate}
                    className="bg-yellow-400 text-white rounded-md py-1 px-3 hover:bg-green-500 transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tab Section */}
          <div className="flex justify-around p-2 border-b">
            {["My Recipes", "Liked", "Saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold py-2 px-4 ${
                  activeTab === tab
                    ? "border-b-2 border-green-500 text-green-500"
                    : "text-gray-500 hover:text-green-500 transition-colors"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="flex-grow overflow-auto p-4 bg-white">
            {activeTab === "My Recipes" && myRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handleCardClick(recipe._id)}
                  >
                    <img
                      src={`${backendUrl}${recipe.recipeImage}`}
                      alt={recipe.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {recipe.title}
                      </h2>
                      <p className="text-gray-600 mt-2">{recipe.description}</p>
                      <div className="mt-4 flex space-x-4 justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateRecipe(recipe._id);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecipe(recipe._id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "Liked" && likedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedRecipes.map((likedRecipe) => (
                  <div
                    key={likedRecipe._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handleCardClick(likedRecipe.recipeId._id)}
                  >
                    <img
                      src={
                        `${backendUrl}${likedRecipe.recipeId.recipeImage}` ||
                        "https://via.placeholder.com/400"
                      }
                      alt={likedRecipe.recipeId.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {likedRecipe.recipeId.title}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {likedRecipe.recipeId.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "Saved" && savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((savedRecipe) => (
                  <div
                    key={savedRecipe.recipeId._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handleCardClick(savedRecipe.recipeId._id)}
                  >
                    <img
                      src={
                        `${backendUrl}${savedRecipe.recipeId.recipeImage}` ||
                        "https://via.placeholder.com/400"
                      }
                      alt={savedRecipe.recipeId.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {savedRecipe.recipeId.title}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {savedRecipe.recipeId.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No content available.</p>
            )}
          </div>

          {/* Logout Button */}
          <div className="p-4 bg-gray-100">
            <button
              onClick={handleLogoutAndCloseDrawer}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors"
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
