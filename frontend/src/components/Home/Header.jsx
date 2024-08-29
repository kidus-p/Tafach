import { useAuth } from "../Home/useAuth"; // Update the path to your context
import Navbar from "../Home/Nav";
import Modal from "./Modal";
import Popout from "../Home/popout";
import { useNavigate } from "react-router-dom";
import {
  bagVid1,
  bagVid2,
  bagVid3,
  bagVid4,
  bagVid5,
  bagVid6,
  bagVid7,
  bagVid8,
  bagVid9,
  bagVid10,
} from "../../utilitys/BackgrounVids";
import { useEffect, useState } from "react";

const Header = () => {
  const {
    isModalOpen,
    isLoginForm,
    user,
    openModal,
    closeModal,
    handleLogin,
    handleSignup,
    toggleForm,
    message,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useAuth();

  const navigate = useNavigate();
  const bagVids = [
    bagVid1,
    bagVid2,
    bagVid3,
    bagVid4,
    bagVid5,
    bagVid6,
    bagVid7,
    bagVid8,
    bagVid9,
    bagVid10,
  ];

  // State for managing the current video index in the slider
  const [currentVideo, setCurrentVideo] = useState(0);

  // Function to change the video automatically every 10 seconds
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideo((prevIndex) => (prevIndex + 1) % bagVids.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(videoInterval);
  }, [bagVids.length]);

  return (
    <div className="w-full h-[100vh] overflow-hidden relative">
      <Navbar />
      <div className="relative w-full h-full">
        {/* Video Slider */}
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          loop
          muted
          src={bagVids[currentVideo]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center z-10">
          {/* Headline Section */}
          <h1 className="text-white text-4xl md:text-5xl font-extrabold text-center px-4 drop-shadow-lg">
            Gabbata: Your Gateway to Ethiopian Flavors
          </h1>
          <p className="text-white text-lg md:text-xl text-center mt-4 px-4 drop-shadow-md">
            Discover the vibrant world of Ethiopian cuisine with our authentic
            recipes, crafted for both tradition and taste.
          </p>
          {/* Call to Action Button */}
          <button
            className="bg-transparent my-16 text-white py-3 px-10 rounded border border-white hover:bg-green-500 hover:scale-105 transition-transform font-bold text-lg shadow-lg"
            onClick={() =>
              user === null ? openModal() : navigate("/add-recipe")
            }
          >
            Share Your Recipe
          </button>
          {/* Subtitle */}
          <p className="text-white text-sm md:text-md text-center px-4 mt-4 drop-shadow-md">
            Dive into the rich cultural heritage of Ethiopia, one dish at a
            time.
          </p>
        </div>
      </div>
      {/* Modal for Login/Register */}
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
    </div>
  );
};

export default Header;
