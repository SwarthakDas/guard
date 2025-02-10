import mongoose from "mongoose";

const PasswordSchema=new mongoose.Schema({
    name:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    created:{
        type:Date,
        default:Date.now
    }
})

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
    savedPasswords:{
        type:[PasswordSchema],
        default: []
    },
    securedPasswords:{
        type:[PasswordSchema],
        default: []
    },
    favourites:{
        type:[ObjectId],
        default:[]
    }
},{timestamps:true})

const User=mongoose.model("User",UserSchema)
export default User