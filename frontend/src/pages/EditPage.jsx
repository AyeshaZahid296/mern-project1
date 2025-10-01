import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';
import toast from 'react-hot-toast';

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { updateProduct, getProductById } = useProductStore();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        price: ''
    });

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Load product data when component mounts
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setFetchLoading(true);
                const product = getProductById(productId);

                if (product) {
                    setFormData({
                        name: product.name || '',
                        image: product.image || '',
                        price: product.price || ''
                    });
                } else {
                    // If product not in store, fetch from API
                    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
                    const data = await res.json();

                    if (data.success) {
                        setFormData({
                            name: data.data.name || '',
                            image: data.data.image || '',
                            price: data.data.price || ''
                        });
                    } else {
                        toast.error('Failed to load product');
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error('Error loading product:', error);
                toast.error('Failed to load product');
                navigate('/');
            } finally {
                setFetchLoading(false);
            }
        };

        loadProduct();
    }, [productId, getProductById, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.image || !formData.price) {
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);

        try {
            const result = await updateProduct(productId, {
                ...formData,
                price: parseFloat(formData.price)
            });

            if (result.success) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (fetchLoading) {
        return (
            <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">Loading product...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                            Edit Product
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Update your product information
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                placeholder="0.00"
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 
                                    text-gray-700 dark:text-gray-300 rounded-xl 
                                    hover:bg-gray-50 dark:hover:bg-gray-700 
                                    transition-colors font-semibold"
                                disabled={loading}
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
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Product"
                                )}
                            </button>
                        </div>

                        {/* Required Fields Note */}
                        <div className="text-center pt-4">
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

export default EditProductPage;