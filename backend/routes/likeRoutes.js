const express = require("express");
const route = express.Router();
const { addLike, getLikers ,getLikeCount ,getLikedRecipesByUser } = require("../controllers/likeControllers");

// Add like
route.post("/addlike", addLike);


// Get likes
route.get("/getlikes/:id", getLikers);


// count likes
route.get("/countLikes/:recipeId", getLikeCount);


// Get liked recipes by user
route.get("/likedrecipes/:userId", getLikedRecipesByUser);



module.exports = route;