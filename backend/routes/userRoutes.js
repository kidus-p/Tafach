const exports = require("express");
const route = exports.Router();
const {signup} = require("../controllers/userController")


// signup
route.post("/signup" , signup)

//login
route.post("/login")

//logout
route.post("/logout")

//refresh token
route.post("/refreshtoken")

//verify email
route.get("/verifyemail:token")

//forgot password
// route.post("/forgotpassword")

module.exports = route;