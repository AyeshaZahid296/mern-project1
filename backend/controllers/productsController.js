import mongoose from "mongoose";
import Product from "../models/productsModel.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching products", error.massage);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};

export const createProduct = async (req, res) => {
    const product = await req.body; // user will send this data 

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
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product id is not valid" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        return res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        console.log("Product is not updated", error.message);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product id is not valid" });
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, massage: "Product Deleted sucessfully " })
    } catch (error) {
        console.log('Error in deleting product', error.message);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};