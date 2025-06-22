import User from "../models/User.js"
import { decryptPassword, encryptPassword } from "../helpers/security.js"
import { decryptPasswordName, encryptPasswordName } from "../helpers/nameSecurity.js"
import dotenv from "dotenv"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

dotenv.config()

export const savePassword=asyncHandler(async(req,res)=>{
    const {name,password,pin}=req.body
    if (!name || !password || !pin || name.trim() === "" || password.trim() === "" || pin.trim() === "")throw new ApiError(400, "Name, password, and PIN are required");

    const user=await User.findById(req.user._id)
    if(!user)throw new ApiError(500,"user not found");

    const matchPin=await user.isPinCorrect(pin)
    if(!matchPin)throw new ApiError(401,"Incorrect pin");

    const encryptedPasword =encryptPassword(pin,password);
    const encryptedName = encryptPasswordName(pin,name);

    user.savedPasswords.push({
        name:encryptedName,
        password:encryptedPasword,
    })

    await user.save()
    return res.status(201).json(
        new ApiResponse(201, null, "Password saved successfully")
    )
})

export const getPasswords=asyncHandler(async(req,res)=>{
    const {pin}=req.body
    const user = await User.findById(req.user._id);
    if (!user)throw new ApiError(500,"user not found");
    if (!user.savedPasswords || user.savedPasswords.length === 0)throw new ApiError(400,"no passwords found");

    const matchPin=await user.isPinCorrect(pin)
    if(!matchPin)throw new ApiError(401,"Incorrect pin");

    const decryptedPasswords = user.savedPasswords
    .sort((a, b) => b.created - a.created) 
    .map((pass) => ({
        id:pass._id.toString(),
        name: decryptPasswordName(pin,pass.name),
        password: decryptPassword(pin,pass.password),
        created: pass.created,
        favourite:pass.favourite
    }));

    return res.status(200).json(
        new ApiResponse(200, { savedPasswords: decryptedPasswords }, "Passwords fetched")
    )
})

export const deletePassword=asyncHandler(async(req,res)=>{
    const {passwordId}=req.body
    const user = await User.findById(req.user._id);
    if (!user)throw new ApiError(500,"user not found");
    if (!user.savedPasswords || user.savedPasswords.length === 0)throw new ApiError(400,"no passwords found");

    const updatedPasswords = user.savedPasswords.filter(pass => pass._id.toString() !== passwordId);
    if (updatedPasswords.length === user.savedPasswords.length)throw new ApiError(400,"Password not found");

    user.savedPasswords = updatedPasswords;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200,null, "Password deleted successfully")
    )
})