const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Recipe"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("SavedRecipe", savedRecipeSchema)