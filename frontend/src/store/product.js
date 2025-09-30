import { create } from 'zustand'
import toast from 'react-hot-toast';

// this is a globel State (hook)
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {

        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            toast.error("Please fill all fields.");
            return { success: false };
        }

        const res = await fetch('/api/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));

        toast.success("Product created successfully.");
        return { success: true };
    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
            set((state) => ({
                products: state.products.filter((p) => p._id !== id),
            }));
            toast.success("Product deleted.");
        } else {
            toast.error("Failed to delete.");
        }
    },
}));