"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopToolbar from "@/components/ShopToolbar";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { products } from "@/lib/products";

export default function Shop() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

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
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>

                {/* Pagination */}
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
            </div>

            <Footer />
        </main>
    );
}
