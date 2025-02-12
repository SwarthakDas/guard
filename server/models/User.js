import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        min:6,
        max:6
    },
    savedPasswords:[
        {
            name:String,
            password:String,
            iv:String,
            created:Date.now
        }
    ],
    securedPasswords:[
        {
            name:String,
            password:String,
            iv:String,
            created:Date.now
        }
    ],
    favourites:{
        type:[String],
        default:[]
    }
},{timestamps:true})

const User=mongoose.model("User",UserSchema)
export default User