import {Router} from "express"
import { savePassword,getPasswords, deletePassword } from "../controllers/password.js";
import {verifyJWT} from "../middleware/auth.js"

export const router=Router()

router.post("/save",verifyJWT,savePassword)
router.post("/get-passwords",verifyJWT,getPasswords)
router.post("/delete",verifyJWT,deletePassword)