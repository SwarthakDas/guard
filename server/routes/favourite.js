import {Router} from "express"
import {verifyJWT} from "../middleware/auth.js"
import { favourite, savedFavourites } from "../controllers/favourite.js"

export const router=Router()

router.post("/toggle",verifyJWT,favourite)
router.post("/get-favourites",verifyJWT,savedFavourites)