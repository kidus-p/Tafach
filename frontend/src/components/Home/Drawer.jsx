import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7070";
  
  // Retrieve access token from localStorage
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(user.profileImage || '');

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

          if (response.data.user && response.data.user.profileImage) {
            const updatedProfileImage = `${backendUrl}${response.data.user.profileImage}?${new Date().getTime()}`;
            setProfilePicture(updatedProfileImage);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    if (isDrawerOpen) {
      fetchUserProfile();
    }
  }, [isDrawerOpen, user, backendUrl, token]);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
    
      try {
        const response = await axios.put(
          `${backendUrl}/api/user/updateprofile/${user._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (response.status === 200 && response.data && response.data.profileImage) {
          const updatedProfileImage = `${backendUrl}${response.data.profileImage}?${new Date().getTime()}`;
          setProfilePicture(updatedProfileImage);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error.response?.data || error.message);
      }
    }
  };

  const handleLogoutAndCloseDrawer = () => {
    handleLogout();
    handleClose();
  };

  return (
    <div
      className={`fixed z-30 top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 ${
        isDrawerOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-end items-center p-4 border-b border-gray-200 bg-gray-100">
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
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

        {/* Profile Section */}
        <div className="flex flex-col items-center p-6 border-b border-gray-200">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-gray-300 overflow-hidden">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="User Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{user.name[0].toUpperCase()}</span>
              )}
            </div>

            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-300 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
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
          <p className="text-lg font-semibold mt-3">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* My Recipes Section */}
        <div className="flex-1 p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">My Recipes</h3>
          <ul className="space-y-3">
            {user.recipes && user.recipes.length > 0 ? (
              user.recipes.map((recipe, index) => (
                <li key={index} className="text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm">
                  {recipe}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No recipes found.</p>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 bg-gray-100">
          <button
            onClick={handleLogoutAndCloseDrawer}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200 w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
