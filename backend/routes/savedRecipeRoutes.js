const express = require("express");
const route = express.Router();
const { addSavedRecipe, getSavedRecipe } = require("../controllers/savedRecipeController");
const { authenticateToken } = require("../middleware/authMiddleware");



// Add saved recipe
route.post("/addsavedrecipe", addSavedRecipe);


// Get saved recipe
route.get("/getsavedrecipe/:id", getSavedRecipe);