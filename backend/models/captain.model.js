import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type :String,
            requied:true,
            minlength:3
        },
        lastname:{
           type:String,
           required:false,
           minlength:3
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[ /^\S+@\S+\.\S+$/, 'please enter a vaild email']
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
       type:String,
       enum:['active','inactive'],
       default:'inactive', 
    },
    vehicle:{
        color:{
            type:String,
            requird:true,
            minlength:3
        },
        plate:{
            type:String,
            required:true,
            minlength:3
        },
        capacity:{
            type:Number,
            required:true,
            min:1,
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car', 'motorcycle', 'auto']
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
},{timestamps:true}
);

captainSchema.methods.generateAuthToken = function (){
   const token =  jwt.sign({_id:this._id},process.env.JWT_SECRET, {expiresIn:'24h'});
   return token;
};

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
};

export const Captain = new mongoose.model("Captain", captainSchema)