import userModel from "../model/userModel.js";
import { generateToken } from '../utils/jwt.js';

export const Login_User = async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(400).json({message:"Missing data!"});
        const user = await userModel.findOne({email});
        if(user && (await user.matchPassword(password))){
            const token = generateToken({_id:user._id});
            return res.status(200).json({message:"Login successfully!",token, user:{_id:user._id,email:user.email}});
        }
        return res.status(401).json({message:"Invalid email id or password!"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const Register_User = async(req, res)=>{
    try {
        const { email, password }= req.body;
        if(!email || !password)
            return res.status(400).json({message:"Missing data!"});
        const exist = await userModel.findOne({email});
        if(exist)
            return res.status(401).json({message:"Email already in use!"});
        const newUser = await userModel.create({email,password});
        const token = generateToken({_id:newUser._id});
        return res.status(201).json({message:"User registered successfully!", token, user:{_id:newUser._id,email:newUser.email}});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const Profile_Check = async (req,res)=>{
    try {
        const _id = req.userId;
        const user = await userModel.findById(_id);
        if(!user)
            return res.status(401).json({message:"User not found! Access denied!"});
        return res.status(200).json({message:"⏳ Session in use!", user:{email:user.email,_id:user._id, createdAt:user.createdAt}});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}