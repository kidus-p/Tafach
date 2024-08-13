import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <Link
            to="/login"
            className="bg-white text-gray-800 py-2 px-7 rounded hover:bg-green-500 hover:text-white border border-gray-700 hover:border-white"
          >
            Login
          </Link>
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
          <Link
            to="/login"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
