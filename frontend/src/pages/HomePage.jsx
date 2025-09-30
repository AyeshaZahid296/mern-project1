import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/create");
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-12 px-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center transition transform hover:scale-[1.01]">
        {/* Heading */}
        <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold text-gray-800 dark:text-white mb-6">
          <AiOutlineShoppingCart className="text-blue-600 dark:text-blue-400 text-4xl" />
          Current Products
        </h1>

        {/* Empty State */}
        <div className="flex flex-col items-center mb-8">
          <MdOutlineRemoveShoppingCart className="text-red-500 text-6xl mb-3 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No products available yet.
            <span className="block mt-1">Add your first one below!</span>
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleAddProduct}
          className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
          hover:from-blue-700 hover:to-indigo-700 
          text-white font-semibold rounded-xl shadow-lg 
          flex items-center justify-center gap-2 text-lg 
          transform transition duration-200 hover:scale-105 active:scale-95"
        >
          <AiOutlinePlusCircle size={24} />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default HomePage;
