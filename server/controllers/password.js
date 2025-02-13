import User from "../models/User.js"
import { decryptPassword, encryptPassword } from "../helpers/security.js"
import { decryptPasswordName, encryptPasswordName } from "../helpers/nameSecurity.js"
import dotenv from "dotenv"

dotenv.config()

export const savePassword=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,password,pin}=req.body
        const user=await User.findById(id)
        
        if(!user)res.status(500).json({message:"user not found"});

        const { encryptedPasword }=encryptPassword(pin,password);
        const { encryptedName } = encryptPasswordName(pin,name);

        user.savedPasswords.push({
            name:encryptedName,
            password:encryptedPasword,
        })

        await user.save()
        res.status(201).json({message:"Password saved successfully"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getPasswords=async(req,res)=>{
    try {
        const { id } = req.params;
        const {pin}=req.body
        const user = await User.findById(id);
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.savedPasswords || user.savedPasswords.length === 0) {
            return res.status(400).json({ message: "No passwords found" });
        }

        const decryptedPasswords = user.savedPasswords.map((pass) => ({
            id:pass._id.toString(),
            name: decryptPasswordName(pin,pass.name),
            password: decryptPassword(pin,pass.password),
            created: pass.created,
            favourite:user.favourites.includes(pass._id.toString())
        }));

        res.status(200).json({ savedPasswords: decryptedPasswords });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}