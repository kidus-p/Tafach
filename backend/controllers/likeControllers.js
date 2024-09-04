// like.controller.js
const Like = require("../modules/like.model");
const mongoose = require("mongoose");

// Add or remove like
exports.addLike = async (req, res) => {
  const { likedBy, recipeOwner, recipeId } = req.body;

  // Validate required fields
  if (!likedBy || !recipeOwner || !recipeId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate ObjectId types
  if (!mongoose.Types.ObjectId.isValid(likedBy)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe id" });
  }
  if (!mongoose.Types.ObjectId.isValid(recipeOwner)) {
    return res.status(400).json({ message: "Invalid recipe owner id" });
  }

  try {
    // Check if the like already exists
    const alreadyLiked = await Like.findOne({ likedBy, recipeOwner, recipeId });

    if (alreadyLiked) {
      // Remove like if it already exists
      await Like.deleteOne({ _id: alreadyLiked._id });
      res.status(200).json({ message: "Like removed" });
    } else {
      // Add new like
      const newLike = new Like({ likedBy, recipeOwner, recipeId });
      await newLike.save();
      res.status(201).json({ message: "Like added" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding/removing like", error: error.message });
  }
};

// Count likes for a specific recipe
exports.getLikeCount = async (req, res) => {
  const { recipeId } = req.params;

  // Validate recipeId
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe id" });
  }

  try {
    // Count total likes for the recipe using aggregation
    const result = await Like.aggregate([
      { $match: { recipeId: new mongoose.Types.ObjectId(recipeId) } },
      { $count: "totalLikes" },
    ]);

    const totalLikes = result.length > 0 ? result[0].totalLikes : 0;
    res.status(200).json({ totalLikes });
  } catch (error) {
    res.status(500).json({ message: "Error counting likes", error: error.message });
  }
};

// Get users who liked a specific recipe
exports.getLikers = async (req, res) => {
  const { recipeId } = req.params;

  // Validate recipeId
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe id" });
  }

  try {
    // Find all likes for the given recipe and populate user details
    const likers = await Like.find({ recipeId }).populate("likedBy", "name");

    // Extract the liker details
    const likersDetails = likers.map(like => ({
      likedBy: like.likedBy,
    }));

    res.status(200).json({ likers: likersDetails });
  } catch (error) {
    res.status(500).json({ message: "Error fetching likers", error: error.message });
  }
};

// Get liked recipes by a specific user
exports.getLikedRecipesByUser = async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    // Find liked recipes by user and populate recipe details
    const likes = await Like.find({ likedBy: userId }).populate("recipeId");
    const likedRecipes = likes.map(like => ({
      recipeId: like.recipeId._id,
      title: like.recipeId.title,
      // Include other recipe details if needed
    }));

    res.status(200).json(likedRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching liked recipes", error: error.message });
  }
};
