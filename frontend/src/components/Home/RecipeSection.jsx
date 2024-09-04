import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import Card from "./Card";
import axios from 'axios';
import HighlightedSection from './HighRated';

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
function CategoryItem({ name, backgroundColor, color, onClick, isSelected }) {
  return (
    <a
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-3 rounded-full text-lg font-semibold cursor-pointer transition-transform transform ${
        isSelected ? 'border-4' : ''
      }`}
      style={{
        backgroundColor,
        color,
        border: `1px solid ${color}`,
        boxShadow: isSelected ? `0 0 12px ${color}` : 'none',
      }}
    >
      {name}
    </a>
  );
}

function CategoryList({ categories, onCategorySelect, selectedCategories, onClearAll }) {
  const getCategoryColors = (index) => colorPalette[index % colorPalette.length];

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-8">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {categories.map((category, index) => {
          const { backgroundColor, textColor } = getCategoryColors(index);
          return (
            <CategoryItem
              key={category._id}
              name={category.name}
              backgroundColor={backgroundColor}
              color={textColor}
              onClick={() => onCategorySelect(category._id)}
              isSelected={selectedCategories.includes(category._id)}
            />
          );
        })}
      </div>
      {selectedCategories.length > 0 && (
        <button
          onClick={onClearAll}
          className="mt-4 px-6 py-4 rounded-full bg-red-800 text-white font-semibold text-lg shadow-md transition-transform transform hover:scale-105"
        >
          Clear All Selected Categories
        </button>
      )}
    </div>
  );
}

const RecipeSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesResponse, recipesResponse] = await Promise.all([
          axios.get("http://localhost:7070/api/category/getcategories"),
          axios.get("http://localhost:7070/api/recipe/getallrecipes")
        ]);

        setCategories(categoriesResponse.data);
        setRecipes(recipesResponse.data);
        setFilteredRecipes(recipesResponse.data);
      } catch (error) {
        setError("Failed to load data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterRecipes(value, selectedCategories);
  };

  const filterRecipes = (search, categories) => {
    let filtered = [...recipes];

    if (search) {
      filtered = filtered.filter((recipe) => {
        const matchesSearch = recipe?.title?.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      });
    }

    if (categories.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeCategoryIds = recipe?.categories?.map((category) => category?._id);

        const matchesCategory = categories.every((categoryId) =>
          recipeCategoryIds.includes(categoryId.toString())
        );

        return matchesCategory;
      });
    }
    setFilteredRecipes(filtered);
  };

  const handleCategorySelect = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    filterRecipes(searchTerm, updatedCategories);
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
    filterRecipes(searchTerm, []);
  };

  const displayedRecipes = showAll ? filteredRecipes : filteredRecipes.slice(0, 4);

  return (
    <div className="flex flex-col items-center min-h-screen px-6 xl:px-12 bg-white py-12">
      <div className="w-full md:w-4/5 lg:w-3/4 mb-12">
        <h1 className="mt-8 mb-8 text-5xl xl:text-6xl text-center font-bold leading-tight text-gray-800">
          Discover the Heart of <span className="text-green-600">Ethiopia</span> on Your Plate
        </h1>
        <p className="text-center text-gray-700 mb-10 text-lg">
          Traditional and Modern Recipes to Savor Every Flavor.
        </p>
        <form className="rounded-full bg-white flex items-center px-5 py-2 shadow-lg mb-10 border-x-2 border-gray-300">
          <IoIosSearch className="w-6 h-6 mr-3 text-gray-500" />
          <input
            className="outline-none w-full placeholder-gray-500 text-gray-700 font-medium"
            type="text"
            placeholder="Search for recipes"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <CategoryList
          categories={categories}
          onCategorySelect={handleCategorySelect}
          selectedCategories={selectedCategories}
          onClearAll={handleClearAllCategories}
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-700 mt-12 text-xl">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-12 text-xl">{error}</p>
      ) : filteredRecipes.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedRecipes.map((recipe) => (
            <Card key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-12 text-xl">
          No recipes match your search or selected categories.
        </p>
      )}
      {filteredRecipes.length > 4 && (
        <button
          className="mt-12 mb-12 px-8 py-3 rounded text-yellow-800 font-semibold border border-yellow-600 shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:brightness-75"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      )}
      <HighlightedSection />
    </div>
  );
};

export default RecipeSection;