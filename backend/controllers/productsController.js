import mongoose from "mongoose";
import Product from "../models/productsModel.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching products", error.message);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" })
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error in created product", error.message)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    console.log('🔄 Update request for ID:', id);
    console.log('📦 Update data:', product);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product id is not valid" });
    }

    // ✅ ADD VALIDATION
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            product,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log('✅ Product updated successfully:', updatedProduct);
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
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product Deleted successfully" })
    } catch (error) {
        console.log('Error in deleting product', error.message);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};