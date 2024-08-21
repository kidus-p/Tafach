const express = require("express");
const route = express.Router();
const { signup, login, logout, getUser, verifyEmail, refrashToken , updateProfile} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

// signup
route.post("/signup", signup);

// login
route.post("/login", login);

// logout
route.post("/logout", authenticateToken, logout);

// refresh token
route.post("/refreshtoken", authenticateToken, refrashToken);

// verify email
route.get("/verifyemail/:token", verifyEmail);

// get user profile
route.get("/getuser/:id", authenticateToken, getUser);

//update userprofile (bio , profilepic)
route.put("/updateprofile" , updateProfile)
module.exports = route;

