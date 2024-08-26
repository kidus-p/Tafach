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
  const [difficulty, setDifficulty] = useState('Easy');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview('');
    }
  }, [image]);

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

    // Check if required fields are filled out
    if (!title || !description || !cookingTime || !serving || !selectedCategories.length) {
      alert('Please fill out all required fields and select at least one category');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cookingTime', cookingTime);
    formData.append('serving', serving);
    formData.append('difficulty', difficulty);
    formData.append('userId', user ? user._id : null);
    formData.append('image', image); 
    formData.append('categories', JSON.stringify(selectedCategories));
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));

    try {
      const response = await axios.post('http://localhost:7070/api/recipe/addrecipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
                type="text"
                name="description"
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder="Instruction"
                className="w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
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
          <label className="block text-gray-700 text-sm font-medium mb-2">Cooking Time (minutes)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Cooking time"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Serving</label>
          <input
            type="number"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Serving"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Categories</label>
          <div className="flex flex-wrap mb-4">
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => handleCategoryClick(category._id)}
                className={`mr-2 mb-2 p-2 border rounded-lg ${
                  selectedCategories.includes(category._id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
              placeholder="New category"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image preview" className="mt-4 w-full h-64 object-cover rounded-lg" />
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
