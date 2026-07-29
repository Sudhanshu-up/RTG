import express from "express";
import {body} from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";


const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 latter'),
    body('password').isLength({min:5}).withMessage('password must be at least 5 char'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 char'),
    body('vehicle.plate').isLength({min:3}).withMessage('vehicle number must be at least 3 char'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('invaild type of vehicle')
],registerCaptain)




export default router;