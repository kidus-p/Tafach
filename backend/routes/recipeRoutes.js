const express = require("express");
const route = express.Router();
const { authenticateToken }= require("../middleware/authMiddleware");
const { getAllRecipes, getRecipe, addRecipe } = require("../controllers/recipeController");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../recipePictures');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const recipeTitle = req.body.title || 'untitled';
        const sanitizedTitle = recipeTitle.replace(/[^a-zA-Z0-9]/g, '_');
        const ext = path.extname(file.originalname);
        cb(null, `${sanitizedTitle}${ext}`);
    }
});

// Set file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Set up multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Add recipe
route.post("/addrecipe", authenticateToken, upload.single('recipePicture'), addRecipe);

// // Get all recipes
route.get("/getallrecipes", getAllRecipes);

// // Get recipe by ID
route.get("/getrecipe/:id", getRecipe);

module.exports = route;
