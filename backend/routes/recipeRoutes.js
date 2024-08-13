const express = require("express");
const route = express.Router();
const {getAllRecipes , getRecipe} = require("../controllers/recipeController");


// get all recipes
route.get("/getallrecipes" , getAllRecipes)

// get recipe
route.get("/getrecipe:id" , getRecipe)




module.exports = route