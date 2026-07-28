import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:3,
        },
        lastname:{
            type:String,
            minlength:2,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
},{timestamps:true});


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

userSchema.statics.comparePassword= async function (password){
   return await bcrypt.compare(password, this.password)
};

userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password,10);
};





export const User = new mongoose.model("User",userSchema);