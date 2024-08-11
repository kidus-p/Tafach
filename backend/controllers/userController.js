const express = require("express");
const User = require("../modules/user.model");
const Token = require("../modules/token.model");
const bcrypt = require('bcryptjs');




// sign up
exports.signup = async(req, res) => {
    const {name , email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    const duplicate =await User.findOne({email});
    if(duplicate){
        return res.status(409).json({message: "Email already exists"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email,password:hashedPassword});
        res.status(201).json({user: user._id});
    }
    catch(err){
       res.status(500).json({message: err.message});
    }
}


// login 
exports.login = async(req, res) => {
    const {email, password} = req.body;
    if(!email||!password){
        return res.status(400).json({message: "All fields are required"});
    }
    try{
      const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({message: "User not found"});
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(!isPasswordCorrect){
        return res.status(401).json({message: "Incorrect password"});
      }
      if(user && isPasswordCorrect){
        // const token = jwt.sign({email: user.email, id: user._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result: user});
      }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


//refrash token
exports.refrashToken = async(req, res) => {}


// logout
exports.logout = async(req, res) => {
    const {token} = req.body;
    await Token.findOneAndDelete({token});
    res.status(200).json({message: "Logged out"});
}



