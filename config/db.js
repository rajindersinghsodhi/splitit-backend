import mongoose from "mongoose";
import { DB_URL } from "./env.js";

const connectDB = async () => {
    try{
        await mongoose.connect(DB_URL);
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.log("MongoDB connection failed: ", error)
    }
}

export { connectDB };