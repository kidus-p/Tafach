const express = require("express");
const route = express.Router();
const {signup , login , logout , getUser ,  verifyEmail , refrashToken} = require("../controllers/userController")


// signup
route.post("/signup" , signup)

//login
route.post("/login" , login)

//logout
route.post("/logout" , logout)

//refresh token
route.post("/refreshtoken:token" , refrashToken )

//verify email
route.get("/verifyemail:token" , verifyEmail)

// get user profile
route.get("/getuser:id" , getUser)


//forgot password
// route.post("/forgotpassword")

module.exports = route;