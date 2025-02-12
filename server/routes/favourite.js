import express from "express"
import {verifyToken} from "../middleware/auth.js"
import { favourite, savedFavourites, securedFavourites } from "../controllers/favourite.js"

const router=express.Router()

router.post("/:id",verifyToken,favourite)
router.get("/:id/savedfavourites",verifyToken,savedFavourites)
router.get("/:id/securedFavourites",verifyToken,securedFavourites)

export default router