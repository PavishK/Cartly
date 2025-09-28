import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({quiet:true});

const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send("OK");
});

const port=process.env.PORT ?? 8080

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected successfully!");
        app.listen(port,()=>console.log("Server running on port "+port));
    })
    .catch((err)=>
    console.log("Error connecting to MongoDB!"));

import userRouter from './router/userRouter.js';
app.use('/api/user',userRouter);

import cartRouter from './router/cartRouter.js';
app.use('/api/cart',cartRouter);