import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
           return res.status(401).json({ message: "No token, authorization denied" ,success:false});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findById(decoded.id).select('-password');
        if(!user){
           return res.status(401).json({ message: "User not found" ,success:false});
        }
        req.user=user;
        next();
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Error in auth middleware" ,success:false});
    }
};

export default authMiddleware;