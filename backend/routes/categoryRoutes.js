const express = require("express");
const route = express.Router();
const { getAllCategories, addCategory } = require("../controllers/categoryController");

// Add category
route.post("/addcategory", addCategory);

// Get all categories
route.get("/getcategories", getAllCategories);

module.exports = route;
