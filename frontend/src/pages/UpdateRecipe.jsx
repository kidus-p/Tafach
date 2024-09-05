import { useState, useEffect } from "react";
import { useAuth } from "../components/Home/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const UpdateRecipe = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate(); // Replaces useHistory in React Router v6

  // State variables for recipe data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { step: 1, description: "" },
  ]);
  const [cookingTime, setCookingTime] = useState("");
  const [serving, setServing] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch the existing recipe data to prepopulate the form
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/api/recipe/getrecipe/${id}`
        );
        const recipe = response.data;
        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setCookingTime(recipe.cookingTime);
        setServing(recipe.serving);
        setSelectedCategories(
          recipe.categories.map((category) => category._id)
        );
        setImagePreview(`http://localhost:7070${recipe.recipeImage}`);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    fetchRecipeData();
  }, [id]);

  // Fetch categories to populate the categories field
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7070/api/category/getcategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle image preview when uploading a new image
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview("");
    }
  }, [image]);

  // Ingredient management (adding/removing)
  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Instruction management (adding/removing)
  const handleInstructionChange = (index, e) => {
    const newInstructions = [...instructions];
    newInstructions[index][e.target.name] = e.target.value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { step: instructions.length + 1, description: "" },
    ]);
  };

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  // Add a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const response = await axios.post(
        "http://localhost:7070/api/category/addcategory",
        { name: newCategory },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setCategories([...categories, response.data]);
        setNewCategory("");
        alert("Category added successfully.");
      } else {
        console.error(response.data);
        alert("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add category due to a server error.");
    }
  };

  // Toggle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !cookingTime ||
      !serving ||
      !selectedCategories.length
    ) {
      alert(
        "Please fill out all required fields and select at least one category."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cookingTime", cookingTime);
    formData.append("serving", serving);
    formData.append("createdBy", user ? user._id : null);
    formData.append("recipeImage", image);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));

    try {
      const response = await axios.put(
        `http://localhost:7070/api/recipe/updaterecipe/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Recipe updated successfully!");
        navigate("/"); // Redirect to the recipes page after updating
      } else {
        console.error(response.data);
        alert(
          "Failed to update recipe. Please ensure all fields are correctly filled."
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update recipe due to a server error. Please try again later."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Update Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Title
          </label>
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
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Describe your recipe"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredient name"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Quantity"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Unit"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Ingredient
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Instructions
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="number"
                name="step"
                value={instruction.step}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder="Step number"
                className="w-16 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                readOnly
              />
              <input
                type="text"
                name="description"
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder="Step description"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Instruction
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Cooking Time (in minutes)
          </label>
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
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Serving Size
          </label>
          <input
            type="number"
            name="serving"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            placeholder="Serving size"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Recipe Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 h-32 w-32 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Categories
          </label>
          <div className="flex flex-wrap">
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => handleCategoryClick(category._id)}
                className={`px-4 py-2 m-1 border rounded-lg ${
                  selectedCategories.includes(category._id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Category
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
