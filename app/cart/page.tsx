"use client";

import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Trash2, Minus, Plus } from "lucide-react";

// Mock Data
const cartItems = [
    {
        id: 1,
        name: "Classic Chronograph",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop",
        quantity: 1
    },
    {
        id: 2,
        name: "Modern Minimalist",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1894&auto=format&fit=crop",
        quantity: 2
    }
];

const CartPage = () => {
    return (
        <main className="bg-white min-h-screen pb-24">
            <PageHero
                title="Shopping Cart"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Cart" }
                ]}
                backgroundImage="/images/cart-bg.png"
            />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="w-full lg:w-2/3">
                        {/* Desktop Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-serif uppercase tracking-wider text-gray-500">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-6 md:space-y-0 mt-6 md:mt-0">
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 py-6 border-b border-gray-100 items-center">
                                    {/* Product Info */}
                                    <div className="col-span-1 md:col-span-6 flex items-center space-x-6">
                                        <div className="relative w-20 h-24 bg-gray-100 shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors mt-2 flex items-center space-x-1 text-sm">
                                                <Trash2 size={14} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 md:col-span-2 md:text-center text-gray-600 font-serif">
                                        <span className="md:hidden text-xs text-gray-400 uppercase tracking-wider mr-2">Price:</span>
                                        ${item.price.toFixed(2)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                                        <span className="md:hidden text-xs text-gray-400 uppercase tracking-wider mr-4">Quantity:</span>
                                        <div className="flex items-center border border-gray-200">
                                            <button className="p-2 hover:bg-gray-100 text-gray-500">
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm text-gray-700">{item.quantity}</span>
                                            <button className="p-2 hover:bg-gray-100 text-gray-500">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="col-span-1 md:col-span-2 md:text-right font-serif text-gray-900">
                                        <span className="md:hidden text-xs text-gray-400 uppercase tracking-wider mr-2">Total:</span>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-[#f9f9f9] p-8">
                            <h2 className="text-xl font-serif text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                                Cart Totals
                            </h2>
                            <div className="space-y-4 mb-8 text-sm text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-4">
                                    <span>Subtotal</span>
                                    <span className="font-serif text-gray-900">$610.00</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-4">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free Shipping</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-serif text-gray-900 pt-2">
                                    <span>Total</span>
                                    <span>$610.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-black text-white py-4 uppercase tracking-wider font-bold hover:bg-accent hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CartPage;
