const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Variables
const PORT = process.env.PORT 
const MongoDB = process.env.MONGO_COM_URL;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/recipe", require("./routes/recipeRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));

// Connect to MongoDB
mongoose
  .connect(MongoDB, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to MongoDB and Server is running on port ${PORT} ...`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
