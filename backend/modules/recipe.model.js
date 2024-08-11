const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients:[
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: number,
                required: true
            },
            unit : {
                type: String,
                required: true
            }
        }],
    instructions: [
        {
            step :{
                type:number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    cookingTime: {
        type: number,
        required: true
    },
    serving : {
        type: number,
        required: true
    },
    image :{
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    categories: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category'
         }
    ],

},
{
    timestamps: true
});

module.exports = mongoose.model("Recipe", recipeSchema);