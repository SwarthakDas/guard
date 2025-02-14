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
        required:true,
        min:6,
        max:6
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