import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import Card from "./Card";
import axios from 'axios';

const colorPalette = [
  { backgroundColor: '#FFDAB9', textColor: '#FF4500', borderColor: '#FF4500' }, // PeachPuff with Orange
  { backgroundColor: '#E6E6FA', textColor: '#6A5ACD', borderColor: '#6A5ACD' }, // Lavender with SlateBlue
  { backgroundColor: '#E0FFFF', textColor: '#20B2AA', borderColor: '#20B2AA' }, // LightCyan with LightSeaGreen
  { backgroundColor: '#FFB6C1', textColor: '#FF1493', borderColor: '#FF1493' }, // LightPink with DeepPink
  { backgroundColor: '#FFFACD', textColor: '#FF6347', borderColor: '#FF6347' }, // LemonChiffon with Tomato
  { backgroundColor: '#F5DEB3', textColor: '#8B4513', borderColor: '#8B4513' }, // Wheat with SaddleBrown
  { backgroundColor: '#FF69B4', textColor: '#4B0082', borderColor: '#4B0082' }, // HotPink with Indigo
  { backgroundColor: '#F0E68C', textColor: '#556B2F', borderColor: '#556B2F' }, // Khaki with DarkOliveGreen
  { backgroundColor: '#F08080', textColor: '#8B0000', borderColor: '#8B0000' }, // LightCoral with DarkRed
  { backgroundColor: '#98FB98', textColor: '#228B22', borderColor: '#228B22' }, // PaleGreen with ForestGreen
  { backgroundColor: '#B0E0E6', textColor: '#4682B4', borderColor: '#4682B4' }, // PowderBlue with SteelBlue
  { backgroundColor: '#FAFAD2', textColor: '#FFD700', borderColor: '#FFD700' }, // LightGoldenrodYellow with Gold
  { backgroundColor: '#FFE4B5', textColor: '#F4A460', borderColor: '#F4A460' }, // Moccasin with SandyBrown
  { backgroundColor: '#F5F5DC', textColor: '#DAA520', borderColor: '#DAA520' }, // Beige with GoldenRod
  { backgroundColor: '#E0FFFF', textColor: '#2E8B57', borderColor: '#2E8B57' }, // LightCyan with SeaGreen
  { backgroundColor: '#F5F5F5', textColor: '#FF4500', borderColor: '#FF4500' }, // WhiteSmoke with OrangeRed
  { backgroundColor: '#D3D3D3', textColor: '#A9A9A9', borderColor: '#A9A9A9' }, // LightGray with DarkGray
  { backgroundColor: '#FF00FF', textColor: '#8A2BE2', borderColor: '#8A2BE2' }, // Fuchsia with BlueViolet
  { backgroundColor: '#F0F8FF', textColor: '#4682B4', borderColor: '#4682B4' }, // AliceBlue with SteelBlue
  { backgroundColor: '#DCDCDC', textColor: '#696969', borderColor: '#696969' }, // Gainsboro with DimGray
  { backgroundColor: '#B22222', textColor: '#FFFAFA', borderColor: '#FFFAFA' }, // FireBrick with Snow
  { backgroundColor: '#FF6347', textColor: '#2E8B57', borderColor: '#2E8B57' }, // Tomato with SeaGreen
  { backgroundColor: '#7FFFD4', textColor: '#4682B4', borderColor: '#4682B4' }, // Aquamarine with SteelBlue
  { backgroundColor: '#FF1493', textColor: '#FF4500', borderColor: '#FF4500' }, // DeepPink with OrangeRed
  { backgroundColor: '#F0FFF0', textColor: '#228B22', borderColor: '#228B22' }, // HoneyDew with ForestGreen
  { backgroundColor: '#FF4500', textColor: '#FFFFFF', borderColor: '#FFFFFF' }, // OrangeRed with White
  { backgroundColor: '#D8BFD8', textColor: '#4B0082', borderColor: '#4B0082' }, // Thistle with Indigo
  { backgroundColor: '#FFEFD5', textColor: '#FF8C00', borderColor: '#FF8C00' }, // PapayaWhip with DarkOrange
  { backgroundColor: '#F5F5F5', textColor: '#808080', borderColor: '#808080' }, // WhiteSmoke with Gray
  { backgroundColor: '#B0C4DE', textColor: '#2F4F4F', borderColor: '#2F4F4F' }, // LightSteelBlue with DarkSlateGray
  { backgroundColor: '#D3D3D3', textColor: '#696969', borderColor: '#696969' }  // LightGray with DimGray
];


function CategoryItem({ name, href, backgroundColor, color }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center px-4 py-2 rounded-full text-base font-medium"
      style={{ backgroundColor, color, border: `1px solid ${color}` }}
    >
      {name}
    </a>
  );
}

function CategoryList({ categories }) {
  // Use color palette cyclically based on category index
  const getCategoryColors = (index) => colorPalette[index % colorPalette.length];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
      {categories.map((category, index) => {
        const { backgroundColor, textColor, borderColor } = getCategoryColors(index);
        return (
          <CategoryItem
            key={category.name}
            name={category.name}
            href={`/category/${category.slug}`}
            backgroundColor={backgroundColor}
            color={textColor}
          />
        );
      })}
    </div>
  );
}

const RecipeSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:7070/api/category/getcategories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:7070/api/recipe/getrecipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
    fetchRecipes();
  }, []);

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
        <CategoryList categories={categories} /> 
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
