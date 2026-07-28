import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async(req,res,next)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors: errors.array()});
    };

    const {firstname, lastname, email, password} = req.body;

    const hashPassword = await User.hashPassword(password);

    const user = await createUser({firstname,lastname,email,password});

    const token = User.generateAuthToken();

    res
    .status(201)
    .json({token, user});





}