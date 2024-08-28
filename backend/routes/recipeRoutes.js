const express = require("express");
const route = express.Router();
// const { authenticateToken } = require("../middleware/authMiddleware");
const { getAllRecipes, getRecipe, addRecipe } = require("../controllers/recipeController");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../recipeImage');
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

route.post("/addrecipe", upload.single('recipeImage'), addRecipe);
route.get("/getallrecipes", getAllRecipes);
route.get("/getrecipe/:id", getRecipe);

module.exports = route;
