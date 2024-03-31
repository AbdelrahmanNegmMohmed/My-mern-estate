import express from "express";
import { test } from "../controller/User.Controller.js";

const router = express.Router();// 1(1)
router.get('/test', test)/* (req,res)=>{// 2 (1)
    res.json({
        message:"hello worled"
    }); */

export default router; // 3(1)