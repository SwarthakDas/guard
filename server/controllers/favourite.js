import { decryptPasswordName } from "../helpers/nameSecurity.js"
import { decryptPassword } from "../helpers/security.js"
import User from "../models/User.js"

export const favourite=async(req,res)=>{
    try {
        const {id}=req.params
        const{passwordId}=req.body
        const user=await User.findById(id)
        if(!user)res.status(500).json({message:"user not found"});
        user.favourites.push(passwordId)
        res.status(200).json({message:"Password favourited"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const savedFavourites=async(req,res)=>{
    try {
        const {id}=req.params
        const {pin}=req.body
        const user=await User.findById(id)
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.savedPasswords || user.savedPasswords.length === 0) {
            return res.status(400).json({ message: "No passwords found" });
        }

        const decryptedPasswords = user.savedPasswords
        .map((pass) => ({
            id:pass._id.toString(),
            name: decryptPasswordName(pin,pass.name, pass.nameIv),
            password: decryptPassword(pin,pass.password, pass.iv),
            created: pass.created,
        }))
        .filter((pass) => user.favourites.includes(pass.id.toString()));

        if(!decryptedPasswords)return res.status(400).json({ message: "No favourite passwords found" });

        res.status(200).json({ savedFavourites: decryptedPasswords });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}