import  express  from "express";
import { veryfiyToken } from "../utils/VrifyUser.js";
import { createListing } from "../controller/listing.controller.js";
const router = express.Router();

router.post('/create',veryfiyToken,createListing)
export default router;