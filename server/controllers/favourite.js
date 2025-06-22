import { decryptPasswordName } from "../helpers/nameSecurity.js"
import { decryptPassword } from "../helpers/security.js"
import User from "../models/User.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

export const favourite=asyncHandler(async(req,res)=>{
    const{passwordId}=req.body
    const user=await User.findById(req.user._id)
    if(!user)throw new ApiError(500,"user not found");

    const passwordEntry = user.savedPasswords.find(pass => pass._id.toString() === passwordId);
    if (!passwordEntry)throw new ApiError(500,"failed to fetch password");

    passwordEntry.favourite = !passwordEntry.favourite;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {favourite: passwordEntry.favourite }, "Password favourite status updated")
    )
})

export const savedFavourites=asyncHandler(async(req,res)=>{
    const {pin}=req.body;
    if(!pin || pin.trim() === "")throw new ApiError(400, "PIN is required");
    const user=await User.findById(req.user._id)
    if (!user)throw new ApiError(500,"user not found");
    if (!user.savedPasswords || user.savedPasswords.length === 0)throw new ApiError(400,"no passwords found");

    const matchPin=await user.isPinCorrect(pin)
    if(!matchPin)throw new ApiError(401,"Incorrect pin");

    const decryptedPasswords = user.savedPasswords
    .filter(pass => pass.favourite)
    .map(pass => ({
        id: pass._id.toString(),
        name: decryptPasswordName(pin, pass.name),
        password: decryptPassword(pin, pass.password),
        created: pass.created,
        favourite: pass.favourite
    }));

    if(decryptedPasswords.length === 0)throw new ApiError(400,"no favourite passwords found");

    return res.status(200).json(
        new ApiResponse(200, { savedFavourites: decryptedPasswords }, "Favourite passwords fetched successfully")
    )
})