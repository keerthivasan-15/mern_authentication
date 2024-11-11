import User from "../models/user.model.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs"; 

import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async(req,res)=>{
    try{
        const {email,name,password} = req.body;
        if(!name || !email || !password){
            throw new Error("All Fields are required");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User Already Exists"});
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = Math.floor(100000+Math.random()*900000).toString();
        console.log(verificationToken);
        const user = await User.create({
            email,
            name,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        }) 
        await user.save();
        generateTokenAndSetCookie(res,user._id);
        await sendVerificationEmail(user.email,verificationToken);
        res.status(201).json({
            success:true,
            message : "User Created Successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        });
    }catch(error){
        console.log("Error :",error.message);
        res.status(400).json({success:false,message:error.message});
    }
}

export const verifyEmail = async(req,res)=>{
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken : code,
            verificationTokenExpiresAt : {$gt : Date.now()},
        });
        if(!user){
            return res.status(400).json({success:false,message : "Invalid or expired verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({
            success:true,
            message : "Email verified successfully",
            user : {
                ...user._doc,
                password:undefined,
            },
        });
    }catch(error){
        console.error("Error :",error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error("All Fields are required");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message : "Invalid credentials"});
        }
        const isPasswordMatch = await bcryptjs.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({success:false,message : "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);
        user.lastLogin = Date.now();
        await user.save();
        res.status(200).json({
            success:true,
            message : "Logged in successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        });
    }catch(error){
        console.error("Error :",error.message);
        res.status(400).json({success:false,messge : error.message});
    }
}

export const forgotPassword = async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message : "user not found"});
        }        

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now()+1*60*60*1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/resetPassword/${resetToken}`);
        
        res.status(200).json({success:true,message : "Password reset link send to your email"});
    }catch(error){
        console.error("Error :",error.message);
        res.status(400).json({success:false,message : error.message});
    }
}

export const resetPassword = async(req,res)=>{
    try{
        const {token} = req.params;
        const {password} = req.body;
        
        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt : {$gt : Date.now()},
        });

        if(!user){
            return res.status(400).json({success:false,message : "Invalid or expired token"});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:false,message : "Password reset successfull"});
    }catch(error){
        console.error("Error :",error.message);
        res.status(400).json({success:false,message : error.message});
    }
}

export const checkAuth = async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success:false,message : "User not found"});
        }

        res.status(200).json({success:true,user});
    }catch(error){
        console.error("Error in checkAuth :",error);
        res.status(400).json({success:false,message : error.message});
    }
}

export const logout = async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true,message : "Logged out successfully"});
}