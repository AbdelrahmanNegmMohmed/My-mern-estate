import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import  userRouter from "./route/user.route.js" // 4 (1)
import authRouter from "./route/auth.route.js";
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Conected to MongoDb");
}
).catch((err)=>{
    console.log(err,"errorrrrrrr");
})


const app = express();
app.use(express.json())


app.listen(3000,()=>{//تعريف السيرفر علي بورت 3000
    console.log("server is running on port 3000!!");
})
//لو فعلت السيرفر علي هذا الوضع يحدس خطأ وهو تعديل النوع في ملف باكججسون

app.use('/api/user',userRouter) // 5 (1)
app.use('/api/auth',authRouter)

//midelware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});