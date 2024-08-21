const express = require("express");
const route = express.Router();
const { signup, login, logout, getUser, verifyEmail, refrashToken , updateProfile} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs")

// Define storage 
const storage = multer.diskStorage({
    destination:(req ,file , cb)=>{
        const dir = '/profilePicture';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir , {recursive : true});
        }
        cb(null , dir)
    },
    filename:(req , file , cb)=>{
        const userid = req.params.id;
        const ext = path.extname(file.originalname);
        cb(null , userid + ext);
    }
});

// set file filter

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) { // Corrected here
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};


// set up multer 
const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});



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
route.put("/updateprofile/:id" , authenticateToken ,upload.single('profilePicture') ,updateProfile)
module.exports = route;

