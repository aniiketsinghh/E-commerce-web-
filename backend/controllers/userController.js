import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: "Please enter all fields" ,success:false});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }
        if(password.length<6){
            return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists" ,success:false});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword
        })
        await newUser.save();
      
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,
            {httpOnly:true,
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        });
          res.status(201).json({ message: "User registered successfully" ,success:true,user:newUser,token});
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Error in register user from backend" ,success:false});
    }
}
export const loginUser = async (req, res) => { 
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please enter all fields" ,success:false});
        }
        const existedUser=await User.findOne({email});
        if(!existedUser){
            return res.status(400).json({ message: "User not found" ,success:false});
        }
        const isMatch=await bcrypt.compare(password,existedUser.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" ,success:false});
        }
        const token=jwt.sign({id:existedUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,
            {httpOnly:true,
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        });
        res.status(200).json({ message: "User logged in successfully" ,success:true,user:existedUser,token});
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "error in login user" ,success:false});
    }
}
export const getUsers = async (req, res) => { 
    try{
        const users=await User.find().select('-password').sort({createdAt:-1});
        res.status(200).json({ message: "Users fetched successfully" ,success:true,users});
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Error in fetched all users" ,success:false});
    }
}
export const profileUser = async (req, res) => {
     try{
        const userId=req.user;
        const user=await User.findById(userId).select('-password');
        res.status(200).json({ message: "User fetched successfully" ,success:true,user});
     }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Server Error" ,success:false});
    }
}
