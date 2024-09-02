// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const MongoDB = process.env.MONGO_COM_URL;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/recipe", require("./routes/recipeRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use('/api/review', require('./routes/reviewRoutes'));
app.use('/api/savedRecipe', require('./routes/savedRecipeRoutes'));

// static file
app.use('/recipeImage', express.static('./recipeImage'));
app.use('/profilePicture', express.static('./profilePicture'));


mongoose
  .connect(MongoDB, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB and Server is running on port ${PORT} ...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
