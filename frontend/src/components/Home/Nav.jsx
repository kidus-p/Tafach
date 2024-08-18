import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Modal from './Modal'; // Import the Modal component
import Drawer from './Drawer'; // Import the Drawer component
import Popout from '../Home/popout';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.accessToken;
  
        if (token) {
          const id = userData?.result._id;
          const response = await axios.get(`http://localhost:7070/api/user/getuser/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsAuthenticated(false)
      }
    };
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) {
      fetchUserProfile();
    }
  }, []);
  

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:7070/api/user/signup', {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:7070/api/user/login', {
        email,
        password,

      });
      if (res.data.accessToken) {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data.result);
        setMessage('Login successful!');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during login');
    }
  };

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
    setMessage('');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
      await axios.post('http://localhost:7070/api/user/logout',{token},{
        headers: { Authorization: `Bearer ${token}`}
      }
    );
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setMessage('Logout successful!');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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

        {/* Profile or Login Button */}
        <div className="hidden md:flex flex-shrink-0">
          {isAuthenticated ? (
            <button
              onClick={toggleDrawer}
              className="bg-white text-gray-800 py-2 px-7 rounded hover:bg-green-500 hover:text-white border border-gray-700 hover:border-white"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={openModal}
              className="bg-white text-gray-800 py-2 px-7 rounded hover:bg-green-500 hover:text-white border border-gray-700 hover:border-white"
            >
              Login
            </button>
          )}
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
          {isAuthenticated ? (
            <button
              onClick={toggleDrawer}
              className="mt-4 bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={openModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Modal for Login/Register */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLoginForm ? 'Login' : 'Register'}
        </h2>
        <Popout
          isLoginForm={isLoginForm}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          toggleForm={toggleForm}
          message={message}
        />
        <p className="text-red-500 text-center mt-2">{message}</p>
      </Modal>

      {/* Drawer for Profile Menu */}
      <Drawer
        isDrawerOpen={isDrawerOpen}
        handleClose={toggleDrawer}
        user={user}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
