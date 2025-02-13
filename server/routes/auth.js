import express from "express"
import {createPin, login, verifyPin} from "../controllers/auth.js"
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/login",login)
router.post("/:id/pin",verifyToken,createPin)
router.post("/:id/pin-verify",verifyToken,verifyPin)

export default router