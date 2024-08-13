const express = require("express");
const route = express.Router();


// get all recipes
const {getAllRecipes , getRecipe} = require("../controllers/recipeController");

