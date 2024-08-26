const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,                       
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
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    
  ],
  instructions: [
    {
      step: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
  cookingTime: {
    type: Number,
    required: true,
  },
  serving: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recipeImage : {
    type:String,
    default:""
  }, 
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Medium'
  },
});



module.exports = mongoose.model('Recipe', recipeSchema);


