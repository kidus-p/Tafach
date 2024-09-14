const express = require("express");
const route = express.Router();
const { signup, login, logout, getUser, verifyEmail, refrashToken, updateProfile ,resetPassword ,requestPasswordReset, contactUs} = require("../controllers/userController");
// const { authenticateToken } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../profilePicture');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const userId = req.params.id;
        const ext = path.extname(file.originalname);
        cb(null, `${userId}${ext}`);
    }
});

// Set file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Set up multer 
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Signup
route.post("/signup", signup);

// Login
route.post("/login", login);

// Logout
route.post("/logout", logout);

// Refresh token
route.post("/refreshtoken", refrashToken);

// Verify email
route.get("/verifyemail/:token", verifyEmail);

// Get user profile
route.get("/getuser/:id", getUser);

// Update user profile (bio, profile pic)
route.put("/updateprofile/:id", upload.single('profilePicture'), updateProfile);

// Request Password Reset
route.post('/request-reset', requestPasswordReset);

// Reset Password
route.post('/reset-password/:token', resetPassword);

// contact us
route.post('/contact-us' , contactUs)

module.exports = route;
