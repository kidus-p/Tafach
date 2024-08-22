// controllers/recipeController.js
const Recipe = require("../modules/recipe.model");

exports.addRecipe = async (req, res) => {
    try {
        const { title, description, cookingTime, serving, ingredients, instructions, categories,createdBy  } = req.body;

        // Validate input data
        if (!title || !description || !cookingTime || !serving || !createdBy || !ingredients || !instructions || !categories) {
            return res.status(400).json({ message:error.message  });
        }

        // Create a new recipe
        const newRecipe = new Recipe({
            title,
            description,
            cookingTime,
            serving,
            ingredients: JSON.parse(ingredients),
            instructions: JSON.parse(instructions),
            categories: JSON.parse(categories),
            createdBy,
            recipeImage: req.file ? `/recipePictures/${req.file.filename}` : ''
        });

        // Save to database
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Other controller methods (getAllRecipes, getRecipe) would go here






// get all recipes
exports.getAllRecipes = async (req, res) => {
    
}




// get a recipe
exports.getRecipe = async (req, res) => {
    
}