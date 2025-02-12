import express from "express";
import { savePassword,getPasswords } from "../controllers/secured.js";
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/save",verifyToken,savePassword)
router.get("/",verifyToken,getPasswords)

export default router