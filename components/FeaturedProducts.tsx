"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
}

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch("/api/products?featured=true");
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>Loading featured collections...</p>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Featured Collections
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Discover our most popular and exclusive timepieces, curated just for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={`Rs. ${product.price.toLocaleString()}`}
                            image={product.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
