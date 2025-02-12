import User from "../models/User"
import { decryptPassword, encryptPassword } from "../helpers/security"

export const savePassword=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,password}=req.body
        const user=await User.findById(id)
        
        if(!user)res.status(500).json({message:"user not found"});

        const {encryptedPasword,iv}=encryptPassword(password)

        user.securedPasswords.push({
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
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.securedPasswords || user.securedPasswords.length === 0) {
            return res.status(400).json({ message: "No passwords found" });
        }

        const decryptedPasswords = user.securedPasswords.map((pass) => ({
            id:pass._id.toString(),
            name: pass.name,
            password: decryptPassword(pass.password, pass.iv),
            created: pass.created,
            favourite:user.favourites.includes(pass._id.toString())
        }));

        res.status(200).json({ securedPasswords: decryptedPasswords });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}