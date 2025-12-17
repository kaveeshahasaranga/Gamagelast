"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopToolbar from "@/components/ShopToolbar";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, X } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    // Filter State
    const [category, setCategory] = useState(searchParams.get("category") || "All");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

    const itemsPerPage = 9;

    // Fetch Products
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                const search = searchParams.get("search");
                if (search) params.append("search", search);
                if (category && category !== "All") params.append("category", category);
                if (minPrice) params.append("minPrice", minPrice);
                if (maxPrice) params.append("maxPrice", maxPrice);

                const response = await fetch(`/api/products?${params.toString()}`);
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
    }, [searchParams, category, minPrice, maxPrice]); // Re-fetch when filters change

    // Update URL when filters are applied (debounced/on blur or button click ideally, but for now direct)
    // Actually, let's make a "Apply Filters" function or just keep local state and rely on URL. 
    // To make it robust: 
    // 1. UI changes update local URL via router.push
    // 2. useEffect listens to URL params (via searchParams) and fetches.

    // But currently I set state from searchParams init, and then fetch based on state? 
    // Better pattern: UI updates URL -> URL triggers Fetch.
    // Let's refactor to that.

    const updateFilters = (newCategory?: string, newMin?: string, newMax?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newCategory) {
            if (newCategory === "All") params.delete("category");
            else params.set("category", newCategory);
        }

        if (newMin !== undefined) {
            if (newMin === "") params.delete("minPrice");
            else params.set("minPrice", newMin);
        }

        if (newMax !== undefined) {
            if (newMax === "") params.delete("maxPrice");
            else params.set("maxPrice", newMax);
        }

        // Reset page on filter change
        params.delete("page");

        router.push(`/shop?${params.toString()}`);
    };

    // Derived values
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="max-w-7xl mx-auto px-8 py-16">
            <ShopToolbar />

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden flex items-center space-x-2 text-sm font-bold uppercase tracking-widest mb-4"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={16} />
                    <span>Filters</span>
                </button>

                {/* Sidebar */}
                <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block absolute lg:static bg-white z-20 w-full lg:w-auto p-6 lg:p-0 shadow-xl lg:shadow-none top-0 left-0`}>
                    <div className="flex justify-between items-center lg:hidden mb-6">
                        <span className="font-serif text-lg">Filters</span>
                        <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                    </div>

                    <div className="space-y-8">
                        {/* Categories */}
                        <div>
                            <h3 className="font-serif text-lg mb-4">Categories</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["All", "Men", "Women", "Accessories"].map((cat) => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => updateFilters(cat)}
                                            className={`hover:text-black transition-colors ${(category === cat || (!searchParams.get("category") && cat === "All"))
                                                ? "text-black font-bold underline"
                                                : ""
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <h3 className="font-serif text-lg mb-4">Price</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-20 border border-gray-300 px-2 py-1 text-sm outline-none focus:border-black"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    onBlur={() => updateFilters(undefined, minPrice, undefined)}
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-20 border border-gray-300 px-2 py-1 text-sm outline-none focus:border-black"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    onBlur={() => updateFilters(undefined, undefined, maxPrice)}
                                />
                            </div>
                            <button
                                onClick={() => updateFilters(undefined, minPrice, maxPrice)}
                                className="mt-2 text-xs font-bold uppercase tracking-wider hover:text-accent"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="lg:w-3/4 w-full">
                    {searchParams.get("search") && (
                        <div className="mb-6">
                            <h2 className="text-lg text-gray-700">
                                Results for <span className="font-bold text-black">"{searchParams.get("search")}"</span>
                            </h2>
                            <button
                                onClick={() => router.push('/shop')}
                                className="text-sm text-gray-500 hover:text-black underline mt-1"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl font-serif tracking-widest animate-pulse">LOADING...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
                            <button
                                onClick={() => router.push('/shop')}
                                className="mt-4 text-black underline hover:text-accent"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={`Rs. ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                                    image={product.image}
                                />
                            ))}
                        </div>
                    )}

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
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <main className="min-h-screen bg-white text-black">
            <Navbar />
            <ShopHero />
            <Suspense fallback={<div className="text-center py-20">Loading Shop...</div>}>
                <ShopContent />
            </Suspense>
            <Footer />
        </main>
    );
}
