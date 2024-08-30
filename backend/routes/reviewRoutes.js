const express = require("express");
const route = express.Router();
const {getAllReviews , addReview ,getAvrRating} = require("../controllers/reviewController");

// Get all reviews based on recipe
route.get("/getallreviews/:id", getAllReviews);


// Add review
route.post("/addreview", addReview);






module.exports = route;