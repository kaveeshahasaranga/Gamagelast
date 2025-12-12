"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopToolbar from "@/components/ShopToolbar";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const products = [
    { id: 1, name: "Analog Strap Watch", price: "Rs. 4,500.00", image: "/products/watch-1.png" },
    { id: 2, name: "Black Dial Strap", price: "Rs. 2,500.00", image: "/products/watch-2.png" },
    { id: 3, name: "Black Dial Classic", price: "Rs. 3,126.00", image: "/products/watch-3.png" },
    { id: 4, name: "Black Dial Watch", price: "Rs. 5,450.00", image: "/products/watch-4.png" },
    { id: 5, name: "Brown Strip Watch", price: "Rs. 3,000.00", image: "/products/watch-5.png" },
    { id: 6, name: "Classic Brown Strip", price: "Rs. 1,900.00", image: "/products/watch-1.png" },
    { id: 7, name: "Golden Dial Analog", price: "Rs. 3,600.00", image: "/products/watch-2.png" },
    { id: 8, name: "Golden Dial Watch", price: "Rs. 1,350.00", image: "/products/watch-3.png" },
    { id: 9, name: "Golden Women Watch", price: "Rs. 2,000.00", image: "/products/watch-4.png" },
    { id: 10, name: "Silver Metal Watch", price: "Rs. 5,000.00", image: "/products/watch-6.png" },
    { id: 11, name: "Blue Dial Elegance", price: "Rs. 4,200.00", image: "/products/watch-7.png" },
    { id: 12, name: "Rose Gold Classic", price: "Rs. 3,900.00", image: "/products/watch-8.png" },
    { id: 13, name: "Modern Silver Time", price: "Rs. 4,800.00", image: "/products/watch-9.png" },
    { id: 14, name: "Luxury Gold Reserve", price: "Rs. 5,500.00", image: "/products/watch-10.jpg" },
    { id: 15, name: "Minimalist White", price: "Rs. 3,200.00", image: "/products/watch-11.jpg" },
    { id: 16, name: "Rose Gold Elegance", price: "Rs. 6,100.00", image: "/products/watch-12.jpg" },
    { id: 17, name: "Midnight Black", price: "Rs. 4,500.00", image: "/products/watch-13.jpg" },
    { id: 18, name: "Classic Two-Tone", price: "Rs. 5,900.00", image: "/products/watch-14.jpg" },
];

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
                            className={`pb-1 transition-all ${
                                currentPage === number
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
