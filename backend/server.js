import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsRouter from './routes/productsRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();

// ADD CORS MIDDLEWARE
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Test route to check if server is working
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Server is working with CORS!',
        timestamp: new Date().toISOString()
    });
});

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(` Server is running at http://localhost:${PORT}`);
    console.log(' CORS enabled for: http://localhost:5173');
});