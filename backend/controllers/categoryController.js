const Category = require("../modules/category.model");

// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ADD CATEGORY
exports.addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }
    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
