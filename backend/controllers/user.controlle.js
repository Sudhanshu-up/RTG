import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blackListToken.model.js";

export const registerUser = async(req,res,next)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors: errors.array()});
    };

    const {fullname, email, password} = req.body;

    const isUserAlreadyExist = await User.findOne({email});
    
    if(isUserAlreadyExist){
        return res.status(400)
        .json({message:'User already exist'});
    }

    const hashPassword = await User.hashPassword(password);

    const user = await createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    });

    const token = user.generateAuthToken();

    res
    .status(201)
    .json({token, user});

};

export const loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'invaild password or email'})
    };

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401)
        .json({message:'invaild email or password'});
    };

    const token = user.generateAuthToken();

    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        maxAge:3600000
    })

    res.status(200)
    .json({token, user});
};

export const logOutUser = async(req, res, next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({token});

    res.status(200)
    .json({message : 'User LogOut Successfully'})
};

export const getUserProfile = async(req,res,next)=>{
    res.status(200)
    .json(req.user);
};
