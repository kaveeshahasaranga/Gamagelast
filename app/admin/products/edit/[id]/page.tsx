"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // params is a Promise in Next.js 15+ (which I assume this is based on "16" in package.json, or at least recent conventions)
    // Actually, package.json said "next": "16.0.8" which is likely a canary or very new version, or maybe Next 14/15.
    // In Next.js 15, params are async. In 14 it's not enforced but good practice.
    // I will use `use` to unwrap it if it's a promise, or just await it if I can.
    // To be safe and compatible with modern Next.js patterns:
    const { id } = use(params);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Men",
        isFeatured: false
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                const data = await res.json();
                if (data.success) {
                    setFormData({
                        name: data.product.name,
                        description: data.product.description,
                        price: data.product.price,
                        image: data.product.image,
                        category: data.product.category || "Men",
                        isFeatured: data.product.isFeatured || false
                    });
                    setImagePreview(data.product.image);
                } else {
                    alert("Product not found");
                    router.push("/admin/products");
                }
            } catch (error) {
                console.error(error);
                alert("Error loading product");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("File size too large! Please upload an image smaller than 500KB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({ ...formData, image: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                })
            });

            if (res.ok) {
                alert("Product updated!");
                router.push("/admin/products");
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8">Loading product...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/products" className="flex items-center space-x-2 text-gray-500 hover:text-black mb-6">
                <ArrowLeft size={20} />
                <span>Back to Products</span>
            </Link>

            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Edit Product</h1>

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

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                        Mark as Featured Product
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image (Max 500KB)</label>
                    <div className="space-y-4">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                {/* Use standard img tag for base64 or potentially external URLs to avoid config issues during dev */}
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <p className="text-xs text-gray-500">Leave empty to keep current image.</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-accent hover:text-primary transition-all mt-4"
                >
                    {submitting ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}
