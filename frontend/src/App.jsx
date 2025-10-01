import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import EditPage from './pages/EditPage'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <Navbar />

      {/* Updated Header with Better Styling */}
      <div className="text-center py-6 px-4">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Product Store
        </h1>
      </div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/edit/:productId' element={<EditPage />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#10B981',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '12px',
              border: '1px solid #059669',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '12px',
              border: '1px solid #DC2626',
            },
          },
        }}
      />
    </div>
  )
}

export default App