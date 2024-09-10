const express = require("express");
const User = require("../modules/user.model");
const Token = require("../modules/token.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require('crypto');

// Generate reset token
const generateResetToken = (userId) => {
  return crypto.randomBytes(32).toString('hex');
};


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



// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token and expiration
    const resetToken = generateResetToken(user._id);
    const expiration = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiration = expiration;
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<h1>Reset Your Password</h1><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpiration = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// contact us 
exports.contactUs= async (req , res)=>{
  const { name, email, message } = req.body;

  // Basic validation (You can expand this based on your needs)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.PASSWORD, 
    },
  });

  const mailOptions = {
    from: email,
    to: 'tizazab752@gmail.com',
    subject: `Contact Us Form - Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
}
