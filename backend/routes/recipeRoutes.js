const express = require("express");
const route = express.Router();
const {getAllRecipes , getRecipe , addRecipe} = require("../controllers/recipeController");

// add recipe
route.post("/addrecipe" , addRecipe)


// get all recipes
route.get("/getallrecipes" , getAllRecipes)


// get recipe
route.get("/getrecipe:id" , getRecipe)






module.exports = route