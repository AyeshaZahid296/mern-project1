import React, { useEffect, useState } from 'react'
import { FaStore, FaPlus, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate("/create");
    };

    const homePage = () => {
        navigate("/");
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
    return (
        <div className='flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md'>
            {/* Left Side */}
            <div className='flex items-center gap-2'>
                <FaStore
                    onClick={homePage}
                    className='text-xl text-blue-600 dark:text-yellow-400'
                />
                <p className='text-lg font-semibold text-gray-800 dark:text-white'>Product Store</p>
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-4'>
                {/* Plus Icon */}
                <FaPlus
                    onClick={handleAddProduct}
                    className='text-xl cursore-pointer text-blue-600 hover:scale-110 transition'
                />
                {/* Day/Night Toggle */}
                <button onClick={toggleTheme}
                    className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 '>
                    {darkMode ? <FaSun /> : <FaMoon />}

                </button>
            </div>

        </div>
    )
}

export default Navbar