import express from "express"
import {login, updatePassword, userDetails, verifyPin} from "../controllers/auth.js"
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/login",login)
router.post("/:id/pin-verify",verifyToken,verifyPin)
router.get("/:id/details",verifyToken,userDetails)
router.post("/:id/update-password",verifyToken,updatePassword)

export default router