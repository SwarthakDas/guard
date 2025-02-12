import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register=async(req,res)=>{
    try {
        const {
            username,
            email,
            password,
            pin
        }=req.body
        
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)

        let newUser
        if(!pin){
            newUser=new User({
                username,
                email,
                password:hashedPassword
            })
        }
        else{
            newUser=new User({
                username,
                email,
                password:hashedPassword,
                pin
            })
        }
        await newUser.save()
        res.status(201).json({message:"User saved successfully"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const login=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        
        const user=await User.findOne({$or:[{username},{email}]})
        if(!user)return res.status(400).json({msg:"User doesnot exist"});

        const matchPassword=await bcrypt.compare(password,user.password)
        if(!matchPassword)return res.status(400).json({msg:"Incorrect Password"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const createPin=async(req,res)=>{
    try {
        const {id}=req.params
        const{pin}=req.body
        await User.findByIdAndUpdate(id,{pin},{new:true})
        res.status(200).json({message:"Pin created"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const checkPin=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id)
        if(user.pin.toString()==="")res.status(200).json({message:false});
        else res.status(200).json({message:true})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}