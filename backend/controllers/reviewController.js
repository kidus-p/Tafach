const mongoose = require("mongoose");
const Review = require("../modules/review.model");

// Get all reviews based on recipe
exports.getAllReviews = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Recipe id is required" });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid recipe id" });

    try {
        const reviews = await Review.find({ recipeId: id })
            .populate("userId", "name email profileImage") // Ensure this matches your Review schema field
            .exec();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add review
// Add review
exports.addReview = async (req, res) => {
    const { recipeId, comment, rating, userId } = req.body;

    if (!recipeId || !comment || !rating || !userId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingReview = await Review.findOne({ recipeId, userId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this recipe" });
        }

        const newReview = new Review({ recipeId, comment, rating, userId });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: error.message });
    }
};
