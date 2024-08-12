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
    <div className="w-full h-[100vh] relative">
      <Navbar />
      <div className="relative w-full h-full pt-16 mx-8"> s
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          loop
          muted
          src={bagVids[Math.floor(Math.random() * bagVids.length)]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent top-0 z-10 flex flex-col justify-center items-center">
          <h1 className="text-white text-2xl font-bold md:text-3xl text-center">Gabbata: Your Gateway to Ethiopian Flavors - Ya Enat Guada</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
