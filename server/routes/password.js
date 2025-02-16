import express from "express";
import { savePassword,getPasswords, deletePassword } from "../controllers/password.js";
import {verifyToken} from "../middleware/auth.js"

const router=express.Router()

router.post("/:id/save",verifyToken,savePassword)
router.post("/:id",verifyToken,getPasswords)
router.post("/:id/delete",verifyToken,deletePassword)

export default router