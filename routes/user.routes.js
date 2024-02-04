import {Router} from "express"
import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from "../controllers/user.controller.js";

const router = Router();

router.post("/add",addToLikedMovies)
router.get("/likedMovies/:email",getLikedMovies)
router.put("/delete",removeFromLikedMovies)


export default router;