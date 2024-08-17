import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddRecipe = () => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState([{ step: 1, description: '' }]);
  const [cookingTime, setCookingTime] = useState('');
  const [serving, setServing] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);

  const recipeCategories = [
    { name: 'Breakfast', value: 'breakfast' },
    { name: 'Lunch', value: 'lunch' },
    { name: 'Dinner', value: 'dinner' },
    { name: 'Dessert', value: 'dessert' },
    { name: 'Snack', value: 'snack' },
    { name: 'Traditional', value: 'traditional' },
    { name: 'Modern', value: 'modern' },
    { name: 'Ya Tsom (Fast Days)', value: 'ya-tsom' },
    { name: 'Ya Feseg (Meat Dishes)', value: 'ya-feseg' },
    { name: 'Under 1 Hour', value: 'under-1-hour' },
    { name: 'Over 1 Hour', value: 'over-1-hour' },
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
    { name: 'Health', value: 'health' },
    { name: 'High Calories', value: 'high-calories' }
  ];

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
  };

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
          <label className="block text-gray-700 text-sm font-medium mb-2">Cooking Time (in minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Cooking time"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Serving Size</label>
          <input
            type="text"
            name="serving"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Serving size"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            required
          />
          {image && (
            <div className="mt-2">
              <p className="text-gray-700">Selected Image: {image.name}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {recipeCategories.map((category) => (
              <label key={category.value} className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={category.value}
                  checked={categories.includes(category.value)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...categories, category.value]
                      : categories.filter((c) => c !== category.value);
                    setCategories(newCategories);
                  }}
                  className="form-checkbox h-5 w-5 text-green-500 transition-transform duration-200 ease-in-out transform hover:scale-110"
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-200"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
