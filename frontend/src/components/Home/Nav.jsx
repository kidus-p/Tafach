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
    <nav className="absolute top-5 left-8 right-8 bg-white text-gray-800 shadow-md rounded-lg z-50 font-gloria">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="flex-shrink-0 flex items-center space-x-2 font-Yellowtail font-bold">
  <Link
    to="/"
    className="text-4xl font-bold text-green-600 hover:text-green-800 hover:animate-vibrate"
  >
    Gabbata
  </Link>
</div>

        <div className="hidden md:flex flex-grow justify-center space-x-8 font-bold text-lg ">
          <Link
            to="/"
            className="hover:text-green-600 transition-colors duration-200 hover:animate-vibrate "
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="hover:text-green-600 transition-colors duration-200 hover:animate-vibrate "
          >
            Recipes
          </Link>
          <Link
            to="/about"
            className="hover:text-green-600 transition-colors duration-200 hover:animate-vibrate "
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-green-600 transition-colors duration-200 hover:animate-vibrate "
          >
            Contact
          </Link>
        </div>

        <div className="md:hidden flex-shrink-0">
</div>

<div className="hidden md:flex flex-shrink-0">
  {isAuthenticated ? (
    <button
    onClick={toggleDrawer}
    className="flex items-center justify-center text-green-800 hover:text-green-600 transform transition-all duration-300 hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 transform transition-all duration-300 hover:rotate-45"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        className="transition-all duration-300"
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
       className="bg-green-600 text-white py-2 px-7 rounded font-bold transform transition-all duration-300 shadow-lg animate-rotate"
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
        <Popout
          isLoginForm={isLoginForm}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          toggleForm={toggleForm}
        />
        
      </Modal>
    </nav>
  );
};

export default Navbar;
