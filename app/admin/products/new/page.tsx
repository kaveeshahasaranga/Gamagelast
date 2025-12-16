"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Men"
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                })
            });

            if (res.ok) {
                alert("Product created!");
                router.push("/admin/products");
            } else {
                alert("Failed to create product");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/products" className="flex items-center space-x-2 text-gray-500 hover:text-black mb-6">
                <ArrowLeft size={20} />
                <span>Back to Products</span>
            </Link>

            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs)</label>
                        <input
                            type="number"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-accent hover:text-primary transition-all mt-4"
                >
                    {submitting ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
}
