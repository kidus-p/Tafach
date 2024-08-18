import React from 'react';

const Drawer = ({ isDrawerOpen, handleClose, user, handleLogout }) => {
  return (
    <div className={`fixed z-20 top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ${isDrawerOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Profile</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {user ? (
            <div>
              <p className="text-lg font-medium mb-2"><strong>Name:</strong> {user.name}</p>
              <p className="text-lg font-medium mb-4"><strong>Email:</strong> {user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
