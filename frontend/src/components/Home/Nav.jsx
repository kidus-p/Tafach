import { useAuth } from "../Home/useAuth"; // Update the path to your context
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Modal from "./Modal";
import Drawer from "./Drawer";
import Popout from "../Home/popout";
import { useState } from "react";

const Navbar = () => {
  const {
    isModalOpen,
    isLoginForm,
    isAuthenticated,
    user,
    openModal,
    closeModal,
    handleLogin,
    handleSignup,
    handleLogout,
    toggleForm,
    message,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <nav className="absolute top-5 left-8 right-8 bg-white text-gray-800 shadow-md rounded-lg z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-800">
            Gabbata
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center space-x-8 font-bold text-lg">
  <Link to="/" className="hover:text-green-600 transition-colors duration-200">
    Home
  </Link>
  <Link to="/recipes" className="hover:text-green-600 transition-colors duration-200">
    Recipes
  </Link>
  <Link to="/about" className="hover:text-green-600 transition-colors duration-200">
    About Us
  </Link>
  <Link to="/contact" className="hover:text-green-600 transition-colors duration-200">
    Contact
  </Link>
</div>


        <div className="md:hidden flex-shrink-0">
          <button
            onClick={toggleDrawer}
            className="flex items-center justify-center text-gray-800 hover:text-gray-600"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex flex-shrink-0">
          {isAuthenticated ? (
            <button
              onClick={toggleDrawer}
              className="flex items-center justify-center text-gray-800 hover:text-gray-600"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={openModal}
              className="bg-white text-gray-800 py-2 px-7 rounded hover:bg-green-500 hover:text-white font-bold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {isDrawerOpen && (
        <Drawer
          isDrawerOpen={isDrawerOpen}
          handleClose={toggleDrawer}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLoginForm ? "Login" : "Register"}
        </h2>
        <Popout
          isLoginForm={isLoginForm}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          toggleForm={toggleForm}
          message={message}
        />
        <p className="text-red-500 text-center mt-2">{message}</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
