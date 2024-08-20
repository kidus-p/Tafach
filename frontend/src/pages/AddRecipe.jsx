import { useState, useEffect } from 'react';
import { useAuth } from '../components/Home/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddRecipe = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState([{ step: 1, description: '' }]);
  const [cookingTime, setCookingTime] = useState('');
  const [serving, setServing] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:7070/api/category/getcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, e) => {
    const newInstructions = [...instructions];
    newInstructions[index][e.target.name] = e.target.value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
  };

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:7070/api/category/addcategory', { name: newCategory }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setCategories([...categories, response.data]);
        setNewCategory('');
      } else {
        console.error(response.data);
        alert('Failed to add category');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add category');
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      cookingTime,
      serving,
      ingredients,
      instructions,
      categories: selectedCategories,
      userId: user ? user._id : null
    };

    try {
      const response = await axios.post('http://localhost:7070/api/recipe/addrecipe', recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Recipe added successfully');
      } else {
        console.error(response.data);
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add recipe');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Recipe title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Recipe description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Name"
                className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
                required
              />
              <input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Quantity"
                className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
                required
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Unit"
                className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
                required
              />
              <button type="button" onClick={() => removeIngredient(index)} className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Ingredient
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="number"
                name="step"
                value={instruction.step}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder="Step"
                className="w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
                required
              />
              <input
                type="text"
                name="description"
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
                required
              />
              <button type="button" onClick={() => removeInstruction(index)} className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Instruction
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cooking Time</label>
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Cooking time (e.g., 45 minutes)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Serving Size</label>
          <input
            type="text"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Number of servings"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Categories</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => handleCategoryClick(category._id)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedCategories.includes(category._id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } transition-colors duration-200`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Add new category"
          />
          <button type="button" onClick={handleAddCategory} className=" mt-3 flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Instruction
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
