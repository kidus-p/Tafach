import React, { useState, useEffect } from "react";
import axios from "axios";

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

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
      console.log(response.data);
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

  return (
    <div
      className={`fixed z-30 top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-transform duration-300 ease-in-out transform ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="w-full max-w-5xl h-full max-h-[90vh] bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-2xl rounded-lg border border-gray-300"
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
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-400 overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
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
              </div>
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
          <div className="flex-grow p-4 bg-white overflow-y-auto">
            {activeTab === "My Recipes" && (
              <div>
                {myRecipes.length > 0 ? (
                  myRecipes.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="mb-4 p-4 border rounded-lg shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {recipe.description}
                      </p>
                      {/* Add more recipe details as needed */}
                    </div>
                  ))
                ) : (
                  <p>No recipes found.</p>
                )}
              </div>
            )}
            {activeTab === "Liked" && (
              <div>
                {likedRecipes.length > 0 ? (
                  likedRecipes.map((recipe) => (
                    <div
                      key={recipe.recipeId}
                      className="mb-4 p-4 border rounded-lg shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {recipe.title}
                      </h3>
                      {/* Add more recipe details as needed */}
                    </div>
                  ))
                ) : (
                  <p>No liked recipes found.</p>
                )}
              </div>
            )}
            {activeTab === "Saved" && (
              <div>
                {savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="mb-4 p-4 border rounded-lg shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {recipe.recipeId.title}
                      </h3>
                      {/* Add more recipe details as needed */}
                    </div>
                  ))
                ) : (
                  <p>No saved recipes found.</p>
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
