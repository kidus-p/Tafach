const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    recipeOwner: {
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


module.exports = mongoose.model("Like", likeSchema)