import express from "express";
import { savePassword,getPasswords } from "../controllers/password.js";
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/:id/save",verifyToken,savePassword)
router.post("/:id",verifyToken,getPasswords)

export default router