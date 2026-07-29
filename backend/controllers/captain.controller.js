import { Captain } from "../models/captain.model.js";
import {createCaptain} from "../services/captain.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blackListToken.model.js";




export const registerCaptain = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
        .json({ errors: errors.array()});
    };

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400)
        .json({message:'Captain already exist'});
    }

    const hashPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });


    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
};


export const loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors:errors.array()});
    };

    const {email,password}= req.body;

    const captain = await Captain.findOne({email}).select('+password');
    if(!captain){
        return res.status(401)
        .json({message:'invaild password or email'});
    };

    const isMatchpassword = await captain.comparePassword(password);
    if(!isMatchpassword){
        return res.status(401)
        .json({message:'invaild password or email'});
    };

    const token = captain.generateAuthToken();

    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        maxAge:3600000
    });

    res.status(200)
    .json({token,captain,message:"captain logged in "});

};

export const logOutCaptain = async(req, res, next)=>{
    res.clearCookie('token');
     
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({token});

    res.status(200)
    .json({message:'User logOut Successfully'})
};

export const getCaptainProfile = async(req, res, next)=>{
    res.status(200)
    .json(req.captain);
};



