import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, setProducts, deleteProduct } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // jab page load ho → products fetch karo
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products");

        // Check if response is OK
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }

        // Check if response has content
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON response");
        }

        const text = await res.text();

        // Check if response is empty
        if (!text) {
          throw new Error("Empty response from server");
        }

        const data = JSON.parse(text);

        if (data.success) {
          setProducts(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleAddProduct = () => {
    navigate("/create");
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex flex-col items-center mb-8">
              <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-3xl mb-6">
                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Failed to Load Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 max-w-md">
                {error}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Check if your backend server is running and the API endpoint is correct.
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-700 hover:to-indigo-700 text-white font-semibold 
                  rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 
                  transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="flex items-center justify-center gap-3 text-4xl font-black text-gray-900 dark:text-white mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                <AiOutlineShoppingCart className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
              Product Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Manage your product inventory with ease. Add, edit, or remove products from your collection.
            </p>
          </div>

          {/* Products Grid */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Your Products ({products.length})
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Click edit/delete to manage products
              </div>
            </div>

            {products.length === 0 ? (
              // EMPTY STATE
              <div className="text-center py-16">
                <div className="flex flex-col items-center mb-8">
                  <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-3xl mb-6">
                    <MdOutlineRemoveShoppingCart className="text-red-500 text-7xl animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md">
                    Your product catalog is empty. Start by adding your first product to showcase your items.
                  </p>

                  {/* Add Product Button - Always Visible */}
                  <div className="flex justify-center mb-8">
                    <button
                      onClick={handleAddProduct}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-blue-700 hover:to-indigo-700 
                text-white font-bold rounded-2xl shadow-2xl 
                flex items-center justify-center gap-3 text-lg 
                transform transition-all duration-200 hover:scale-105 active:scale-95
                border border-blue-500 hover:border-blue-600"
                    >
                      <AiOutlinePlusCircle size={26} />
                      Add New Product
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // PRODUCTS GRID
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onDelete={deleteProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;