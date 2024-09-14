import { useAuth } from "../Home/useAuth"; // Update the path to your context
import { Link as RouterLink } from "react-router-dom"; // Use Link as RouterLink for react-router-dom
import { Link as ScrollLink } from "react-scroll"; // Use Link as ScrollLink for react-scroll
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
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="absolute top-5 left-0 right-0 bg-white text-gray-800 shadow-md rounded-lg z-50 font-gloria mx-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex-shrink-0 flex items-center space-x-2 font-Yellowtail font-bold">
          <RouterLink
            to="/"
            className="text-4xl font-bold text-green-600 hover:text-green-800 hover:animate-vibrate"
          >
            Gabbata
          </RouterLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center space-x-8 font-bold text-lg animate-smoothScroll">
          {["hero", "recipes", "about", "contact"].map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth={true}
              duration={500}
              className="hover:text-green-600 transition-colors duration-200 hover:animate-vibrate cursor-pointer"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ScrollLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-green-800 hover:text-green-600 transform transition-all duration-300 hover:scale-110 animate-rotate"
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

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg md:hidden animate-slideIn"
          >
            <div className="flex flex-col items-center py-4">
              {["hero", "recipes", "about", "contact"].map((section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth={true}
                  duration={500}
                  className="py-2 text-green-600 hover:text-green-800 transition-colors duration-200 hover:animate-vibrate cursor-pointer"
                  onClick={toggleMobileMenu}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={toggleDrawer}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded font-bold transform transition-all duration-300 shadow-lg"
                >
                  Menu
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded font-bold transform transition-all duration-300 shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Authentication Button */}
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
