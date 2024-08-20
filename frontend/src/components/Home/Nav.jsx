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

  const renderAvatar = () => {
    if (user && user.profileImage) {
      return (
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    } else if (user && user.name) {
      const initials = user.name
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
      return (
        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
          {initials}
        </div>
      );
    }
    return <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">?</div>;
  };

  return (
    <nav className="w-full bg-[#f9f7f2] text-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={Logo} alt="Gabbata logo" className="h-16 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex flex-grow justify-center space-x-4 font-bold">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/recipes" className="hover:text-gray-400">
            Recipes
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex flex-shrink-0">
          {isAuthenticated ? (
            <button
              onClick={toggleDrawer}
            >
              {renderAvatar()}
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

        {isDrawerOpen && (
          <Drawer
            isDrawerOpen={isDrawerOpen}
            handleClose={toggleDrawer}
            user={user}
            handleLogout={handleLogout}
          />
        )}
      </div>

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
