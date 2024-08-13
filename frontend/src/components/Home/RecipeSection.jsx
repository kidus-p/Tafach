import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import Card from "./Card";

function CategoryItem({ name, href, backgroundColor, color }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center px-4 py-2 rounded-full text-base font-medium"
      style={{ backgroundColor, color , border: `1px solid ${color}` }}
    >
      {name}
    </a>
  );
}

function CategoryList() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
        <CategoryItem name='Breakfast' href='/category/breakfast' backgroundColor='#FFDAB9' color='#FF4500' />
        <CategoryItem name='Lunch' href='/category/lunch' backgroundColor='#E6E6FA' color='#6A5ACD' />
        <CategoryItem name='Dinner' href='/category/dinner' backgroundColor='#E0FFFF' color='#20B2AA' />
        <CategoryItem name='Dessert' href='/category/dessert' backgroundColor='#FFB6C1' color='#FF1493' />
        <CategoryItem name='Snack' href='/category/snack' backgroundColor='#FFFACD' color='#FF6347' />
        <CategoryItem name='Traditional' href='/category/traditional' backgroundColor='#F5DEB3' color='#8B4513' />
        <CategoryItem name='Modern' href='/category/modern' backgroundColor='#FF69B4' color='#4B0082' />
        
        {/* Ethiopian-Specific Categories */}
        <CategoryItem name='Ya Tsom (Fast Days)' href='/category/ya-tsom' backgroundColor='#F0E68C' color='#556B2F' />
        <CategoryItem name='Ya Feseg (Meat Dishes)' href='/category/ya-feseg' backgroundColor='#F08080' color='#8B0000' />
        
        {/* Cooking Time Categories */}
        <CategoryItem name='Under 1 Hour' href='/category/under-1-hour' backgroundColor='#98FB98' color='#228B22' />
        <CategoryItem name='Over 1 Hour' href='/category/over-1-hour' backgroundColor='#B0E0E6' color='#4682B4' />
        
        {/* Difficulty Categories */}
        <CategoryItem name='Easy' href='/category/easy' backgroundColor='#FAFAD2' color='#FFD700' />
        <CategoryItem name='Medium' href='/category/medium' backgroundColor='#FFE4B5' color='#F4A460' />
        <CategoryItem name='Hard' href='/category/hard' backgroundColor='#F5F5DC' color='#DAA520' />
        
        {/* Health Categories */}
        <CategoryItem name='Health' href='/category/health' backgroundColor='#E0FFFF' color='#2E8B57' />
        <CategoryItem name='High Calories' href='/category/high-calories' backgroundColor='#F5F5F5' color='#FF4500' />
      </div>
    );
  }
  
  
  

const RecipeSection = () => {
  const [showAll, setShowAll] = useState(false);

  const recipes = [
    {
      _id: "1",
      title: "Doro Wat",
      image: "https://media.istockphoto.com/id/1166890336/photo/doro-wat-on-injera-in-addis-ababa-ethiopia.webp?b=1&s=612x612&w=0&k=20&c=DzTEs8EPAYx4ntag3ATegNzpM9Tl34cHGLGTHNh2mOY=",
      owner: {
        name: "Ayele Tesfaye",
        image: "https://images.unsplash.com/photo-1542385262-cdf06b302c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      },
      time: 120,
      difficulty: "Hard",
      category: "Dinner"
    },
    {
      _id: "2",
      title: "Injera",
      image: "https://plus.unsplash.com/premium_photo-1695297516692-82b537c62733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5qZXJhfGVufDB8fDB8fHww",
      owner: {
        name: "Marta Kebede",
        image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      },
      time: 30,
      difficulty: "Medium",
      category: "Lunch"
    },
    {
      _id: "3",
      title: "Kitfo",
      image: "https://media.istockphoto.com/id/1460435904/photo/ethiopian-kifto-kitfo-is-a-traditional-dish-present-in-ethiopian-cuisine-it-consists-of-raw.webp?b=1&s=612x612&w=0&k=20&c=NiEhGkUQ2i_8IUdtV87mDr491yBrBtkM--NEnn3QjKs=",
      owner: {
        name: "Abebe Woldemariam",
        image: "https://images.unsplash.com/photo-1518611540400-6b85a0704342?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      },
      time: 45,
      difficulty: "Easy",
      category: "Snack"
    },
    {
      _id: "4",
      title: "Shiro",
      image: "https://media.istockphoto.com/id/1514287210/photo/ethiopian-combo-platter.webp?b=1&s=612x612&w=0&k=20&c=xwwjqALvdTGAOOq0JLPbD__6FLvX-XyJU5f1rtEGGlc=",
      owner: {
        name: "Selam Tesfaye",
        image: "https://images.unsplash.com/photo-1534458246008-80a1ce3028cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      },
      time: 90,
      difficulty: "Medium",
      category: "Dinner"
    },
   
    {
        _id: "1",
        title: "Doro Wat",
        image: "https://media.istockphoto.com/id/1166890336/photo/doro-wat-on-injera-in-addis-ababa-ethiopia.webp?b=1&s=612x612&w=0&k=20&c=DzTEs8EPAYx4ntag3ATegNzpM9Tl34cHGLGTHNh2mOY=",
        owner: {
          name: "Ayele Tesfaye",
          image: "https://images.unsplash.com/photo-1542385262-cdf06b302c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        },
        time: 120,
        difficulty: "Hard",
        category: "Dinner"
      },
      {
        _id: "2",
        title: "Injera",
        image: "https://plus.unsplash.com/premium_photo-1695297516692-82b537c62733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5qZXJhfGVufDB8fDB8fHww",
        owner: {
          name: "Marta Kebede",
          image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        },
        time: 30,
        difficulty: "Medium",
        category: "Lunch"
      },
      {
        _id: "3",
        title: "Kitfo",
        image: "https://media.istockphoto.com/id/1460435904/photo/ethiopian-kifto-kitfo-is-a-traditional-dish-present-in-ethiopian-cuisine-it-consists-of-raw.webp?b=1&s=612x612&w=0&k=20&c=NiEhGkUQ2i_8IUdtV87mDr491yBrBtkM--NEnn3QjKs=",
        owner: {
          name: "Abebe Woldemariam",
          image: "https://images.unsplash.com/photo-1518611540400-6b85a0704342?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        },
        time: 45,
        difficulty: "Easy",
        category: "Snack"
      },
      {
        _id: "4",
        title: "Shiro0000",
        image: "https://media.istockphoto.com/id/1514287210/photo/ethiopian-combo-platter.webp?b=1&s=612x612&w=0&k=20&c=xwwjqALvdTGAOOq0JLPbD__6FLvX-XyJU5f1rtEGGlc=",
        owner: {
          name: "Selam Tesfaye",
          image: "https://images.unsplash.com/photo-1534458246008-80a1ce3028cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        },
        time: 90,
        difficulty: "Medium",
        category: "Dinner"
      },
  ];

  // Slice the recipes array to display only the first 4 initially
  const displayedRecipes = showAll ? recipes : recipes.slice(0, 4);

  return (
    <div className="flex flex-col items-center min-h-screen px-5 xl:px-10">
      <div className="w-full md:w-3/4 lg:w-2/3 mb-10">
        <h1 className="mt-6 mb-10 text-4xl xl:text-5xl text-center font-bold leading-normal xl:leading-relaxed text-gray-700">
          Discover the Heart of <span className="text-green-500">Ethiopia</span> on Your Plate
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Traditional and Modern Recipes to Savor Every Flavor.
        </p>
        <form className="rounded-full bg-white flex items-center px-4 py-2 shadow-md mb-10" action="/search">
          <IoIosSearch className="w-5 h-5 mr-2 text-neutral-300" />
          <input className="outline-none w-full placeholder:text-gray-600" type="text" placeholder="Search for recipes" />
        </form>
        <CategoryList /> 
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedRecipes.map(recipe => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <button
        className="mt-12 mb-12 px-10 py-4 rounded bg-white text-yellow-600 border border-yellow-600 shadow-md font-medium"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'View Less' : 'View More'}
      </button>
    </div>
  );
};

export default RecipeSection;
