import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Conected to MongoDb");
}
).catch((err)=>{
    console.log(err,"errorrrrrrr");
})


const app = express();


app.listen(3000,()=>{//تعريف السيرفر علي بورت 3000
    console.log("server is running on port 3000!!");
})
//لو فعلت السيرفر علي هذا الوضع يحدس خطأ وهو تعديل النوع في ملف باكججسون



