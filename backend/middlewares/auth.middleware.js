import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401)
        .json({message:'Unauthoized access'});
    }

    const isBlacklisted = await User.findOne({token:token});

    if(isBlacklisted){
        return res.status(401)
        .json({message: "Unauthoized user access"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded._id)

        req.user = user;

        return next();
        
    } catch (error) {
        return res.status(401).json({message:"unauthoized access"})
    }

}
 
