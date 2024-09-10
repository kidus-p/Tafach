import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./MyrecipeCard";
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
        `${backendUrl}/api/like/likedrecipes/${user._id}`
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
      className={`font-sans fixed z-30 inset-0 flex justify-center items-center bg-transparent transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full h-full mx-8 mt-5 shadow-2xl rounded-lg border border-gray-300 bg-white overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div
  className="relative flex h-1/4 justify-start items-end p-6 border-b border-gray-200 rounded-t-lg bg-cover bg-center text-white"
  style={{
    backgroundImage: `url(${profilePic1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "12px 12px 0 0",
  }}
>
  <button
    onClick={handleClose}
    className="absolute top-6 right-6 text-white hover:text-yellow-400 focus:outline-none transition-transform duration-200 transform hover:scale-110"
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
  <div className=" absolute -bottom-16 left-6">
    <div className=" relative h-36 w-36 rounded-full bg-gray-300 border-4 border-white overflow-hidden shadow-lg z-50">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="User Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-4xl font-bold text-gray-700 flex justify-center items-center h-full">
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

          {/* User Information Section */}
          <div className="flex-1 overflow-y-auto p-6">
  {/* Profile Information */}
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
    <p className="text-sm text-gray-600">{email}</p>
    <div className="mt-2">
      {editBio ? (
        <>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows="3"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleBioUpdate}
              className="text-sm text-white bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={() => setEditBio(false)}
              className="text-sm text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-800">{bio}</p>
          <button
            onClick={() => setEditBio(true)}
            className="text-sm text-green-500 hover:text-green-700 focus:outline-none"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Tabs Navigation */}
  <div className="mt-6 w-full flex ">
  {["My Recipes", "Liked", "Saved"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-3 mx-3 rounded-lg font-semibold text-sm focus:outline-none transition-all duration-300 ease-in-out transform 
        ${
          activeTab === tab
            ? "bg-green-600 text-white shadow-lg scale-105 hover:scale-110 hover:shadow-xl"
            : "bg text-gray-800 hover:shadow-md hover:scale-105"
        }`}
    >
      {tab}
    </button>
  ))}
</div>


  {/* Conditional Rendering Based on Active Tab */}
  <div className="mt-4">
    {activeTab === "My Recipes" && (
      <div>
        <h3 className="text-lg font-semibold text-gray-800">My Recipes</h3>
        <ul className="mt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              handleCardClick={handleCardClick}
              handleUpdateRecipe={handleUpdateRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
              tab={activeTab} // Pass the active tab
            />
          ))}
        </ul>
      </div>
    )}

    {activeTab === "Liked" && (
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Liked Recipes</h3>
        <ul className="mt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {likedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe.recipeId}
              handleCardClick={handleCardClick}
              tab={activeTab} // Pass the active tab
            />
          ))}
        </ul>
      </div>
    )}

    {activeTab === "Saved" && (
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Saved Recipes</h3>
        <ul className="mt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe.recipeId}
              handleCardClick={handleCardClick}
              tab={activeTab} // Pass the active tab
            />
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogoutAndCloseDrawer}
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
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
