import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/products.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching products", error.massage);
        return res.status(500).json({ success: false, message: "Server error" })
    }
})

app.post("/api/products", async (req, res) => {
    const product = await req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" })
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error in created product", error.message)
        return res.status(500).json({ success: false, massage: "Server Error" })
    }
});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(400).json({ success: false, massage: "Product not found" })
        }
        return res.status(200).json({ success: true, massage: "Product Deleted sucessfully " })
    } catch (error) {
        console.log('Error in deleting product', error.message);
        return res.status(500).json({ success: false, message: "This id is not matched" })
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port http://localhost:${PORT}`)
});
