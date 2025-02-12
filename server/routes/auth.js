import express from "express"
import {checkPin, createPin, login} from "../controllers/auth.js"
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/login",login)
router.post("/:id/pin",verifyToken,createPin)
router.get("/:id/pincheck",verifyToken,checkPin)

export default router