"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopToolbar from "@/components/ShopToolbar";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

// Define Product Interface locally or import if available
interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <ShopHero />
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl font-serif tracking-widest animate-pulse">LOADING COLLECTION...</p>
                </div>
                <Footer />
            </main>
        );
    }

    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get current products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ShopHero />

            <div className="max-w-7xl mx-auto px-8 py-16">
                <ShopToolbar />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id} // Using _id from MongoDB
                            name={product.name}
                            price={`Rs. ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} // Formatting price
                            image={product.image}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-16 space-x-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`pb-1 transition-all ${currentPage === number
                                    ? "text-accent border-b border-accent"
                                    : "text-gray-400 hover:text-black hover:border-b hover:border-black"
                                    }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
