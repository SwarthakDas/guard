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
        const user=await User.findById(id)
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.savedPasswords || user.savedPasswords.length === 0) {
            return res.status(400).json({ message: "No passwords found" });
        }

        const decryptedPasswords = user.savedPasswords
        .map((pass) => ({
            id:pass._id.toString(),
            name: pass.name,
            password: decryptPassword(pass.password, pass.iv),
            created: pass.created,
        }))
        .filter((pass) => user.favourites.includes(pass.id.toString()));

        if(!decryptedPasswords)return res.status(400).json({ message: "No favourite passwords found" });

        res.status(200).json({ savedFavourites: decryptedPasswords });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const securedFavourites=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id)
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.securedPasswords || user.securedPasswords.length === 0) {
            return res.status(400).json({ message: "No passwords found" });
        }

        const decryptedPasswords = user.securedPasswords
        .map((pass) => ({
            id:pass._id.toString(),
            name: pass.name,
            password: decryptPassword(pass.password, pass.iv),
            created: pass.created,
        }))
        .filter((pass) => user.favourites.includes(pass.id.toString()));

        if(!decryptedPasswords)return res.status(400).json({ message: "No favourite passwords found" });

        res.status(200).json({ securedFavourites: decryptedPasswords });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}