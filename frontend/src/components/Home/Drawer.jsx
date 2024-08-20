import React, { useState } from 'react';
import axios from 'axios';

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  const [file, setFile] = useState(null);

  const handleProfilePictureUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await axios.post('/api/uploadprofilepicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      alert('Profile picture updated successfully');
      // Optionally, refresh the user data to reflect the new profile picture
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleLogoutAndCloseDrawer = () => {
    handleLogout();
    handleClose(); // Close the drawer after logout
  };

  return (
    <div
      className={`fixed z-20 top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ${
        isDrawerOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Profile</h2>
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
        <div className="flex flex-col items-center p-4 border-b border-gray-200">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name[0].toUpperCase()
              )}
            </div>

            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer border border-gray-300"
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
          <p className="text-lg font-medium mt-3">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
          <button
            onClick={uploadProfilePicture}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Upload Profile Picture
          </button>
        </div>

        {/* My Recipes Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">My Recipes</h3>
          <ul className="mt-2 space-y-2">
            {user.recipes && user.recipes.length > 0 ? (
              user.recipes.map((recipe, index) => (
                <li key={index} className="text-gray-600">
                  {recipe}
                </li>
              ))
            ) : (
              <p className="text-gray-500">You have no recipes yet.</p>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="flex-1 p-4 overflow-y-auto">
          {user ? (
            <button
              onClick={handleLogoutAndCloseDrawer}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <p className="text-gray-500">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
