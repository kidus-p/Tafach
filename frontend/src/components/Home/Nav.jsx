import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Modal from './Modal'; // Import the Modal component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <nav className="w-full bg-[#f9f7f2] text-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={Logo} alt="Gabbata logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`hidden md:flex flex-grow justify-center space-x-4 font-bold`}>
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/recipes" className="hover:text-gray-400">Recipes</Link>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Login Button (hidden on mobile) */}
        <div className="hidden md:flex flex-shrink-0">
          <button
            onClick={openModal}
            className="bg-white text-gray-800 py-2 px-7 rounded hover:bg-green-500 hover:text-white border border-gray-700 hover:border-white"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800`}>
        <div className="flex flex-col items-center py-4">
          <Link to="/" className="py-2 px-4 text-center block text-white hover:bg-gray-700">Home</Link>
          <Link to="/recipes" className="py-2 px-4 text-center block text-white hover:bg-gray-700">Recipes</Link>
          <Link to="/about" className="py-2 px-4 text-center block text-white hover:bg-gray-700">About Us</Link>
          <Link to="/contact" className="py-2 px-4 text-center block text-white hover:bg-gray-700">Contact</Link>
          <button
            onClick={openModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>

      {/* Modal for Login/Register */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{isLoginForm ? 'Login' : 'Register'}</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />
          {isLoginForm ? (
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Login
            </button>
          ) : (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 mb-4 border rounded"
              />
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Register
              </button>
            </>
          )}
        </form>
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-500 hover:text-blue-700 underline"
        >
          {isLoginForm ? 'Don’t have an account? Register here' : 'Already have an account? Login here'}
        </button>
      </Modal>
    </nav>
  );
};

export default Navbar;
