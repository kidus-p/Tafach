// controllers/recipeController.js
const Recipe = require("../modules/recipe.model");

exports.addRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      cookingTime,
      serving,
      ingredients,
      instructions,
      categories,
      createdBy,
    } = req.body;

    // Validate input data
    if (
      !title ||
      !description ||
      !cookingTime ||
      !serving ||
      !createdBy ||
      !ingredients ||
      !instructions ||
      !categories
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Log the received file information for debugging
    console.log('Received file:', req.file);

    // Create a new recipe
    const newRecipe = new Recipe({
      title,
      description,
      cookingTime,
      serving,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      categories: JSON.parse(categories),
      createdBy,
      recipeImage: req.file ? `/recipeImage/${req.file.filename}` : "",
    });

    // Save to the database
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error adding recipe:", error);  // Enhanced error logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find()
      .populate("createdBy", "name email profileImage")
      .populate("categories", "name");

    // If no recipes are found
    if (!recipes.length) {
      return res.status(404).json({ message: "No recipes found" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving recipes", error: error.message });
  }
};

// Get a single recipe
exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
      .populate("createdBy", "name email profileImage")
      .populate("categories", "name");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the recipe", error: error.message });
  }
};
