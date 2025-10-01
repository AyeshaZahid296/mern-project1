// HomePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, setProducts, deleteProduct } = useProductStore();

  // jab page load ho → products fetch karo
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.data); // backend se jo array aaye use set kar do
    };
    fetchProducts();
  }, [setProducts]);

  const handleAddProduct = () => {
    navigate("/create");
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit/${productId}`);
  };

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

          {/* Conditional Rendering */}
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
              </div>
            </div>
          ) : (
            // PRODUCTS GRID
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Your Products ({products.length})
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Click edit/delete to manage products
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onDelete={deleteProduct}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;