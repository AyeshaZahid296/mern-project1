import React, { useEffect, useState } from 'react'
import { FaStore, FaPlus, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // ✅ Better initial state detection
        if (typeof window !== 'undefined') {
            return localStorage.getItem("theme") === "dark" ||
                (!localStorage.getItem("theme") && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate("/create");
    };

    const homePage = () => {
        navigate("/");
    }

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        // ✅ Force reflow for smooth transition
        root.style.display = 'none';
        root.offsetHeight; // Trigger reflow
        root.style.display = '';
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 border-b border-gray-200 dark:border-gray-700'>
            {/* Left Side */}
            <div className='flex items-center gap-2 cursor-pointer' onClick={homePage}>
                <FaStore className='text-xl text-blue-600 dark:text-blue-400 transition-colors duration-300' />
                <p className='text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300'>
                    Product Store
                </p>
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-4'>
                {/* Plus Icon */}
                <FaPlus
                    onClick={handleAddProduct}
                    className="text-xl cursor-pointer text-blue-600 dark:text-blue-400 hover:scale-110 transition-all duration-200"
                    title="Add Product"
                />

                {/* Day/Night Toggle */}
                <button
                    onClick={toggleTheme}
                    className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-700'
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                </button>
            </div>
        </div>
    )
}

export default Navbar