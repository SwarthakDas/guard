import User from "../models/User"
import { decryptPassword, encryptPassword } from "../helpers/security"

export const savePassword=async(req,res)=>{
    try {
        const {username,name,password}=req.body
        const user=await User.findOne({username})
        
        if(!user)res.status(500).json({message:"user not found"});

        const {encryptedPasword,iv}=encryptPassword(user.password.toString(),password)

        user.savedPasswords.push({
            name,
            password:encryptedPasword,
            iv
        })

        await user.save()
        res.status(201).json({message:"Password saved successfully"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getPasswords=async(req,res)=>{
    try {
        const {username,name}=req.body
        const user=await User.findOne({username})
        
        if(!user)res.status(400).json({message:"user not found"});

        const savedPassword=user.savedPasswords.find(p=>p.name===name)

        if(!savedPassword)res.status(400).json({message:"no passwords found with this name"});

        const decryptedPassword=decryptPassword(user.password.toString(),savedPassword.password,savedPassword.iv)

        res.status(201).json({decryptedPassword})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}