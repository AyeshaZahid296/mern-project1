import { create } from 'zustand'
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            toast.error("Please fill all fields.");
            return { success: false };
        }

        try {
            const res = await fetch('http://localhost:5000/api/products', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct)
            });

            if (!res.ok) {
                toast.error("Failed to create product.");
                return { success: false };
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));

            toast.success("Product created successfully.");
            return { success: true };
        } catch (error) {
            console.error('Create product error:', error);
            toast.error("Failed to create product.");
            return { success: false };
        }
    },

    updateProduct: async (id, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
            toast.error("Please fill all fields.");
            return { success: false };
        }

        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct)
            });

            if (!res.ok) {
                toast.error("Failed to update product.");
                return { success: false };
            }

            const data = await res.json();
            set((state) => ({
                products: state.products.map((p) =>
                    p._id === id ? { ...data.data } : p
                ),
            }));

            toast.success("Product updated successfully.");
            return { success: true };
        } catch (error) {
            console.error('Update product error:', error);
            toast.error("Failed to update product.");
            return { success: false };
        }
    },

    deleteProduct: async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                set((state) => ({
                    products: state.products.filter((p) => p._id !== id),
                }));
                toast.success("Product deleted successfully.");
            } else {
                toast.error("Failed to delete product.");
            }
        } catch (error) {
            console.error('Delete product error:', error);
            toast.error("Failed to delete product.");
        }
    },

    //  ADDED: getProductById function
    getProductById: (id) => {
        const state = get();
        return state.products.find(p => p._id === id);
    }
}));