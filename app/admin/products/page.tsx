"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Product deleted");
                fetchProducts();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    if (loading) return <div className="p-8">Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-800">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-accent hover:text-primary transition-colors"
                >
                    <Plus size={18} />
                    <span>Add Product</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Image</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">Rs. {product.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/admin/products/edit/${product._id}`}>
                                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
