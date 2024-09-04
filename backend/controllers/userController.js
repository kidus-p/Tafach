const express = require("express");
const User = require("../modules/user.model");
const Token = require("../modules/token.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

//generate refrash token
const generateRefrashToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await Token.create({ userId, token });
  return token;
};

//generate email verification token
const generateEmailToken = (userId) => {
  return jwt.sign({ userId }, process.env.EMAIL_SECRET_KEY, {
    expiresIn: "1h",
  });
};

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD,
  },
});


// send email
  exports.sendEmail = async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const mailOptions = {
        from: email,
        to: 'tizazab752@gmail.com',
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, error: error.toString() });
        }
        res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.toString() });
    }
  }


// send verify email
const sendVerifyEmail = async (user, token) => {
  const url = `http://localhost:5173/verify/${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Email Verification",
    html: `<h1>Verify your email</h1><p>Click <a href="${url}">here</a> to verify your email</p>`,
  });
};

// sign up
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ message: "Email already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const emailVerifyToken = generateEmailToken(user._id);
    await sendVerifyEmail(user, emailVerifyToken);
    res.status(201).json({ user: user._id, emailVerifyToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// verify email

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    if (user && isPasswordCorrect) {
      const accessToken = await generateToken(user._id);
      const refreshToken = await generateRefrashToken(user._id);
      res
        .status(200)
        .json({
          result: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//refrash token
exports.refrashToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRASH_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user
exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
};


// update pprofile
exports.updateProfile = async (req, res) => {
  try {
      const { id } = req.params;
      const { bio } = req.body;
      const updateData = {};

      // Update bio if provided
      if (bio !== undefined) {
          updateData.bio = bio;
      }

      // Update profile picture if a new one is uploaded
      if (req.file) {
          updateData.profileImage = `/profilePicture/${req.file.filename}`;
      }

      // Update the user profile with the provided data
      const response = await User.findByIdAndUpdate(id, updateData, { new: true });

      res.status(200).json(response);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// logout
exports.logout = async (req, res) => {
  const { token } = req.body;
  await Token.findOneAndDelete({ token });
  res.status(200).json({ message: "Logged out" });
};
