import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error database is not connected ${error.message}`);
        process.exit(1); // process 1 means exit with faliure, 0 means success
    }

}