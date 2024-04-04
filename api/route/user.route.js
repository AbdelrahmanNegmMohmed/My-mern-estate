import express from "express";
import { test, updateuser } from "../controller/User.Controller.js";
import { veryfiyToken } from "../utils/VrifyUser.js";

const router = express.Router();// 1(1)
router.get('/test', test)
router.post('/update/:id',veryfiyToken ,updateuser)



export default router; // 3(1)