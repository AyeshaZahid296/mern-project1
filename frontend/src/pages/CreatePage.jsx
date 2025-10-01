import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const [loading, setLoading] = useState(false);
    const { createProduct } = useProductStore();
    const navigate = useNavigate();
    const id = useId();

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await createProduct({
            ...newProduct,
            price: parseFloat(newProduct.price) // Convert price to number
        });

        setLoading(false);

        if (result.success) {
            setNewProduct({ name: "", price: "", image: "" });
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                            Create New Product
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Add a new product to your inventory
                        </p>
                    </div>

                    <form onSubmit={handleAddProduct} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor={id + "nameId"}
                                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Product Name *
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                id={id + "nameId"}
                                name="name"
                                type="text"
                                placeholder="Enter product name"
                                value={newProduct.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label
                                htmlFor={id + "imageId"}
                                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Image URL *
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                id={id + "imageId"}
                                name="image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                value={newProduct.image}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label
                                htmlFor={id + "priceId"}
                                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Price *
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                id={id + "priceId"}
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={newProduct.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 
                                    text-gray-700 dark:text-gray-300 rounded-xl 
                                    hover:bg-gray-50 dark:hover:bg-gray-700 
                                    transition-colors font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                                    hover:from-blue-700 hover:to-indigo-700 
                                    text-white rounded-xl font-semibold shadow-lg 
                                    hover:shadow-xl transform hover:scale-105 
                                    transition-all duration-200 disabled:opacity-50 
                                    disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating...
                                    </div>
                                ) : (
                                    "Create Product"
                                )}
                            </button>
                        </div>

                        {/* Required Fields Note */}
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                * Required fields
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;