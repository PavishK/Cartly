import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRouter from './router/userRouter.js';
import cartRouter from './router/cartRouter.js';

dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("OK");
});
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

// MongoDB connection handler for serverless
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.log("Error connecting to MongoDB!", err);
    }
}

// Export serverless function for Vercel
export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
