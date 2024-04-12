import express from "express";
import { sendMail } from "./controller/mailControler.js";
import mailRoutes from './routes/mailRoutes.js'

const app=express();

app.use("/api/v1/mail",mailRoutes);



app.listen(8005,()=>{
    console.log("server is running on port 8005")
})