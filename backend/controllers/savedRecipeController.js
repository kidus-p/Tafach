const SavedRecipe = require("../modules/savedRecipes.model");
const mongoose = require("mongoose");

// get all saved recipes
exports.getSavedRecipes = async (req, res) => {
   const { id } = req.params;
   if (!id) return res.status(400).json({ message: "Recipe id is required" });
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid recipe id" });

   try {
     const savedRecipes = await SavedRecipe.find({ userId: id })
     res.status(200).json(savedRecipes);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};

// Toggle saved recipe: add if not saved, delete if already saved
exports.toggleSavedRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  if (!userId) return res.status(400).json({ message: "User id is required" });
  if (!recipeId) return res.status(400).json({ message: "Recipe id is required" });
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid user id" });
  if (!mongoose.Types.ObjectId.isValid(recipeId)) return res.status(400).json({ message: "Invalid recipe id" });

  try {
    const existingSavedRecipe = await SavedRecipe.findOne({ userId, recipeId });

    if (existingSavedRecipe) {
      await SavedRecipe.deleteOne({ _id: existingSavedRecipe._id });
      return res.status(200).json({ message: "Recipe removed from saved recipes" });
    } else {
      const savedRecipe = new SavedRecipe({ userId, recipeId });
      await savedRecipe.save();
      return res.status(201).json({ message: "Recipe added to saved recipes", savedRecipe });
    }
  } catch (error) {
    console.error("Error in toggleSavedRecipe:", error);
    res.status(500).json({ message: error.message });
  }
};
