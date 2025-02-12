import express from "express";
import { savePassword,getPasswords } from "../controllers/secured.js";
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/:id/save",verifyToken,savePassword)
router.get("/:id",verifyToken,getPasswords)

export default router