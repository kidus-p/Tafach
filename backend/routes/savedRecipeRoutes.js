const express = require("express");
const route = express.Router();
const { toggleSavedRecipe, getSavedRecipes , deletRecipe  } = require("../controllers/savedRecipeController");



// Add saved recipe
route.post("/addsavedrecipe", toggleSavedRecipe);


// Get saved recipe
route.get("/getsavedrecipe/:id", getSavedRecipes);


// Delete saved recipe
route.delete("/deletesavedrecipe/:id", deletRecipe);

module.exports = route;