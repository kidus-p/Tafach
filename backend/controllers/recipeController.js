const express = require("express");
const Recipe = require("../modules/recipe.model");

exports.addRecipe = async (req, res) => {
  try {
    const { title, description, cookingTime, serving, ingredients, instructions, categories, userId } = req.body;

    // Validate input data
    if (!title || !description || !cookingTime || !serving || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new recipe
    const newRecipe = new Recipe({
      title,
      description,
      cookingTime,
      serving,
      ingredients,
      instructions,
      categories,
      userId,
    });

    // Save to database
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






// get all recipes
exports.getAllRecipes = async (req, res) => {
    
}




// get a recipe
exports.getRecipe = async (req, res) => {
    
}