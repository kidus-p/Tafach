const express = require("express");
const route = express.Router();
const { toggleSavedRecipe, getSavedRecipes } = require("../controllers/savedRecipeController");



// Add saved recipe
route.post("/addsavedrecipe", toggleSavedRecipe);


// Get saved recipe
route.get("/getsavedrecipe/:id", getSavedRecipes);




module.exports = route;