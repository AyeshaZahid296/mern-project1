import React, { useId, useState } from "react";

const HomePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const handleAddProduct = () => {
        console.log(newProduct);
    };

    const id = useId();

    return (
        <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Create a New Product
                </h1>

                {/* Name */}
                <div className="flex flex-col">
                    <label
                        htmlFor={id + "nameId"}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Name
                    </label>
                    <input
                        className="input-box"
                        id={id + "nameId"}
                        type="text"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label
                        htmlFor={id + "priceId"}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Price
                    </label>
                    <input
                        className="input-box"
                        id={id + "priceId"}
                        type="number"
                        placeholder="Enter price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                </div>

                {/* Image */}
                <div className="flex flex-col">
                    <label
                        htmlFor={id + "imageId"}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Image URL
                    </label>
                    <input
                        className="input-box"
                        id={id + "imageId"}
                        type="text"
                        placeholder="Paste image URL"
                        value={newProduct.image}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, image: e.target.value })
                        }
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleAddProduct}
                    className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default HomePage;
