import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <h1 className="text-4xl font-bold p-4 flex justify-center">Welcome to Product Store</h1>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App