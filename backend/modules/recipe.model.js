const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String,
    },
  ],
  instructions: [
    {
      step: Number,
      description: String,
    },
  ],
  cookingTime: {
    type: String,
    required: true,
  },
  serving: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
