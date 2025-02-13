import express from "express"
import {verifyToken} from "../middleware/auth.js"
import { favourite, savedFavourites } from "../controllers/favourite.js"

const router=express.Router()

router.post("/:id",verifyToken,favourite)
router.post("/:id/favourites",verifyToken,savedFavourites)

export default router