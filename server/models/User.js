import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true,
    },
    savedPasswords:[
        {
            name:String,
            password:String,
            created:{type:Date,default:Date.now}
        }
    ],
    favourites:{
        type:[String],
        default:[]
    }
},{timestamps:true})

const User=mongoose.model("User",UserSchema)
export default User