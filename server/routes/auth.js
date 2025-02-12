import express from "express"
import {createPin, login} from "../controllers/auth.js"
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/login",login)
router.post("/pin",verifyToken,createPin)

export default router