import { bagVid1, bagVid2, bagVid3, bagVid4, bagVid5, bagVid6, bagVid7, bagVid8, bagVid9, bagVid10 } from "../../utilitys/BackgrounVids";
import Navbar from "../Home/Nav"; 

const Header = () => {
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
    bagVid10
  ];

  return (
    <div className="w-full h-[100vh] overflow-hidden relative">
      <Navbar />
      <div className="relative w-full h-full">
        <video
         className="w-full h-full object-cover absolute top-0 left-0 md:mx-12"
          autoPlay
          loop
          muted
          src={bagVids[Math.floor(Math.random() * bagVids.length)]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center z-10">
          <h1 className="text-white text-2xl font-bold md:text-3xl text-center px-4">Gabbata: Your Gateway to Ethiopian Flavors - Ya Enat Guada</h1>
          <button className=" bg-transparent my-16 text-white py-2 px-7 rounded border border-white hover:bg-green-500 font-bold text-lg">Your Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
