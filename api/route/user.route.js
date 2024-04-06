import express from "express";
import { deleteuser, test, updateuser } from "../controller/User.Controller.js";
import { veryfiyToken } from "../utils/VrifyUser.js";

const router = express.Router();// 1(1)
router.get('/test', test)
router.post('/update/:id',veryfiyToken ,updateuser)
router.delete('/delete/:id',veryfiyToken ,deleteuser)



export default router; // 3(1)