"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

interface ProductInfoProps {
    product: {
        id: string;
        name: string;
        price: string;
        rawPrice?: number;
        image: string;
        description: string;
        _id?: string;
    };
}

import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Use rawPrice if available, otherwise try to parse (fallback)
        let priceNumber = product.rawPrice;

        if (priceNumber === undefined) {
            priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: isNaN(priceNumber) ? 0 : priceNumber,
            image: product.image,
            quantity: quantity
        });
        alert("Added to Cart!");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Image Section */}
            <div className="relative bg-white flex items-center justify-center p-10 border border-gray-100">
                <div className="relative w-full max-w-md aspect-square">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col items-start space-y-6">
                <h1 className="text-3xl font-serif text-gray-800">{product.name}</h1>
                <p className="text-2xl font-sans text-accent">{product.price}</p>

                <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">★</span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">(25 reviews)</span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-gray-600 w-full pt-4 border-t border-gray-100">
                    <div className="flex justify-between max-w-xs">
                        <span className="font-semibold">Vendor:</span>
                        <span>Wonder Watch</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                        <span className="font-semibold">Type:</span>
                        <span>Watch</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                        <span className="font-semibold">Availability:</span>
                        <span className="text-green-600">In Stock</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-6 w-full">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300">
                        <button
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >-</button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white px-8 py-3 uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                        Add to Cart
                    </button>

                    <button className="p-3 border border-gray-300 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                    </button>
                    <button className="p-3 border border-gray-300 hover:text-blue-500 transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-orange-500 pt-2">
                    <span>🔥</span>
                    <span>33 people are viewing this right now</span>
                </div>
            </div>
        </div>
    );
}
