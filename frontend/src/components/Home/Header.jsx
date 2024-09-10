import { useAuth } from "../Home/useAuth";
import Navbar from "../Home/Nav";
import Modal from "./Modal";
import Popout from "../Home/popout";
import { useNavigate } from "react-router-dom";
import {
  bagVid1, bagVid2, bagVid3, bagVid4, bagVid5, bagVid6, 
  bagVid7, bagVid8, bagVid9, bagVid10, bagVid11, 
  bagVid12, bagVid13, bagVid14, bagVid15, bagVid16,
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
    bagVid1, bagVid2, bagVid3, bagVid4, bagVid5, bagVid6, 
    bagVid7, bagVid8, bagVid9, bagVid10, bagVid11, 
    bagVid12, bagVid13, bagVid14, bagVid15, bagVid16,
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const changeVideo = (direction) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentVideo((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % bagVids.length;
        } else {
          return prevIndex === 0 ? bagVids.length - 1 : prevIndex - 1;
        }
      });
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const videoInterval = setInterval(() => {
      changeVideo("next");
    }, 10000);

    return () => clearInterval(videoInterval);
  }, [bagVids.length]);

  // Function to check if message is error or success
  const isErrorMessage = message && message.toLowerCase().includes("error");
  const isSuccessMessage = message && !isErrorMessage;

  return (
    <div 
    id="hero"
    className="w-full h-[100vh] overflow-hidden relative">
      <Navbar />
      <div className="relative w-full h-full overflow-hidden">
        {/* Video Slider */}
        <div className="relative w-full h-full">
          <div
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: `url(${bagVids[currentVideo]}) no-repeat center center/cover` }}
          >
            <video
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${transitioning ? 'opacity-0' : 'opacity-100'}`}
              autoPlay
              loop
              muted
              src={bagVids[currentVideo]}
            />
          </div>
        </div>

        {/* Main Content with Enhancements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center z-10 px-6">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              <span className="">Gabbata:</span>  Ethiopian Flavors Reimagined
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl mb-6 px-4 drop-shadow-md">
              Discover authentic recipes crafted with tradition and taste.
            </p>
          </div>

          <button
            className="bg-green-600 text-white py-3 px-8 rounded hover:bg-green-700 transition-colors font-bold font-gloria text-lg shadow-lg mt-4 "
            onClick={() =>
              user === null ? openModal() : navigate("/add-recipe")
            }
          >
            Share Your Recipe
          </button>

          <p className="text-white text-sm md:text-md text-center px-4 mt-4 drop-shadow-md">
            Dive into the rich cultural heritage of Ethiopia.
          </p>
        </div>
      </div>
      
      {/* Modal for Login/Register */}
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
          message={message}
        />
        {/* Message Display */}
        {message && (
          <p
            className={`text-center mt-4 ${
              isErrorMessage ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )
        }
      </Modal>
    </div>
  );
};

export default Header;
