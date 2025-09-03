import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsRouter from './routes/productsRouter.js';

dotenv.config();

const app = express();

app.use(express.json()); // allow use to accept data in rq.body in json formate

app.use("/api/products", productsRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port http://localhost:${PORT}`)
});
