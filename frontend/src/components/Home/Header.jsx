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

  return (
    <div className="w-full h-[100vh] overflow-hidden relative">
      <Navbar />
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          loop
          muted
          src={bagVids[Math.floor(Math.random() * bagVids.length)]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center z-10">
          <h1 className="text-white text-2xl font-bold md:text-3xl text-center px-4">
            Gabbata: Your Gateway to Ethiopian Flavors - Ya Enat Guada
          </h1>
          <button
            className="bg-transparent my-16 text-white py-2 px-7 rounded border border-white hover:bg-green-500 font-bold text-lg"
            onClick={() =>
              user === null ? openModal() : navigate("/add-recipe")
            }
          >
            Your Recipe
          </button>
        </div>
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
    </div>
  );
};

export default Header;
