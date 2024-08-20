// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');

const userModel = require('../model/User');
require('dotenv').config()
const jwt = require('jsonwebtoken');

// userModel()

const registerUser = async(req, res)=>{
    const {username, email, password, confirmPassword} = req.body;

   try {
    if(!username || !email || !password || !confirmPassword){
        return res.status(400).json({error:"All fields are required!"})
    }

    if(password !== confirmPassword) return res.status(400).json({error:"Password do not match!"})
    
    const extistingUser = await userModel.findOne({email})
    if(extistingUser) {
        return res.status(401).json({error:"user already exist"})
    }
    // to hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);    
    
    // get new user
    const newUser = new userModel({
        username: username, 
        email: email, 
        password: hashedPassword
    })
    await newUser.save()

    const token = jwt.sign({ userId : extistingUser._id}, process.env.jwt_secret,{ expiresIn: "1h"});

    if (newUser) return res.status(201).json({message: "registered successfully", newUser})
    
    const 
   } catch (error) {
        console.log(error);
                
   }
}

const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"All fields are required!"})
    }
    try {
        
        const extistingUser = await userModel.findOne({email})
        if(!extistingUser){
          return  res.status(404).json({error: "user not found"})
        }

       const passmatch = await bcrypt.compare(password, extistingUser.password);
    // bcrypt.compare(password, extistingUser.password, function(err, res) {
    //     return res.json({message: "password match"})
    // });
    // bcrypt.compare(!password, extistingUser.password, function(err, res) {
    //     // res === false
    //     return res.status(401).json({error: "invalid password"})

    // });
       if(!passmatch){
        return res.status(401).json({error: "invalid password"})
       }

        const token = jwt.sign({ userId : extistingUser._id}, process.env.jwt_secret,{ expiresIn: "1h"});


         res.status(201).json({message: " login successfully", token})
        
    } catch (error) {
        console.log(error)
    }
}


module.exports ={registerUser, loginUser}