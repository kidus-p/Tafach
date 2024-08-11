const User = require("../models/userModel");




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
exports.login = async(req, res) => {}


//refrash token
exports.refrashToken = async(req, res) => {}


// logout
exports.logout = async(req, res) => {}



