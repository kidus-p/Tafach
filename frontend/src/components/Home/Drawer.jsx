import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7070';
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

  const [profilePicture, setProfilePicture] = useState(user.profileImage || '');
  const [bio, setBio] = useState(user.bio || '');
  const [editBio, setEditBio] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`${backendUrl}/api/user/getuser/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.user) {
            const updatedProfileImage = `${backendUrl}${response.data.user.profileImage}?${new Date().getTime()}`;
            setProfilePicture(updatedProfileImage);
            setBio(response.data.user.bio || '');
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
        const response = await axios.put(`${backendUrl}/api/user/updateprofile/${user._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data && response.data.profileImage) {
          const updatedProfileImage = `${backendUrl}${response.data.profileImage}?${new Date().getTime()}`;
          setProfilePicture(updatedProfileImage);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error.response?.data || error.message);
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
      console.error('Error updating bio:', error.response?.data || error.message);
    }
  };

  const handleMyRecipe = () => {
    console.log('Fetching user recipes...');
  };

  const handleLogoutAndCloseDrawer = () => {
    handleLogout();
    handleClose();
  };

  return (
    <div
      className={`fixed z-30 top-16 right-4 w-80 bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-2xl rounded-lg border border-gray-300 transition-transform duration-300 ease-in-out transform ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ maxHeight: 'calc(100vh - 4rem)', padding: '1rem' }}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex justify-center p-4 bg-gradient-to-t from-gray-200 via-white to-gray-200 border-b border-gray-200">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-400 overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
              {profilePicture ? (
                <img src={profilePicture} alt="User Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-gray-700">{user.name[0].toUpperCase()}</span>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <input id="profile-upload" type="file" className="hidden" onChange={handleProfilePictureUpload} />
            </label>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-4 bg-gradient-to-r from-white to-gray-100 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-800">Bio</h3>
            <button
              onClick={() => setEditBio(!editBio)}
              className="text-blue-700 hover:text-blue-800 focus:outline-none transition-transform duration-200 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
          {editBio ? (
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:border-green-500 shadow-md"
                rows="2"
              />
              <button
                onClick={handleBioUpdate}
                className="absolute bottom-0 right-0 bg-green-600 text-white text-xs py-1 px-2 rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105"
              >
                Save Bio
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600">{bio || 'Click to add your bio.'}</p>
            </div>
          )}
        </div>

        {/* My Recipes Section */}
        <div className="p-4 bg-gradient-to-r from-gray-100 via-white to-gray-200 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">My Recipes</h3>
          <button
            onClick={handleMyRecipe}
            className="bg-green-700 text-white font-bold text-xs py-2 px-4 rounded-lg hover:bg-green-800 transition duration-200 transform hover:scale-105"
          >
            View My Recipes
          </button>
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
  );
};

export default Drawer;
