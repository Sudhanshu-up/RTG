import express from "express";
import {body} from "express-validator"
import { registerUser,loginUser } from "../controllers/user.controlle.js";

const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name is required and most be 3 latter !'),
    body('password').isLength({min:5}).withMessage('password must be required with min length 5'),
],
registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invaild Email'),
    body('password').isLength({min:6}).withMessage('password is required with min length 6')
],
loginUser);




export default router;
