const express = require("express");
const route = express.Router();
const {signup , login , logout , getuser ,  verifyemail , refreshtoken , } = require("../controllers/userController")


// signup
route.post("/signup" , signup)

//login
route.post("/login" , login)

//logout
route.post("/logout" , logout)

//refresh token
route.post("/refreshtoken:token" , refreshtoken )

//verify email
route.get("/verifyemail:token" , verifyemail)

// get user profile
route.get("/getuser:id" , getuser)


//forgot password
// route.post("/forgotpassword")

module.exports = route;