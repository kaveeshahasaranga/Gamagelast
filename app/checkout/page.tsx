"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Your cart is empty.</p>
            </div>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!session) {
            alert("Please login to place an order");
            router.push("/login?redirect=/checkout");
            return;
        }

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    shippingAddress,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                clearCart();
                alert("Order placed successfully!");
                router.push("/account");
            } else {
                alert(data.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-white min-h-screen pb-24">
            <PageHero
                title="Checkout"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Cart", href: "/cart" },
                    { label: "Checkout" },
                ]}
                backgroundImage="/images/cart-hero-bg.jpg"
            />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Shipping Form */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-2xl font-serif text-gray-900 mb-8 uppercase tracking-widest border-b border-gray-200 pb-4">
                            Shipping Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={shippingAddress.address}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black text-black"
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={shippingAddress.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={shippingAddress.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black text-black"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    value={shippingAddress.country}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black text-black"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-4 uppercase tracking-wider font-bold hover:bg-accent hover:text-primary transition-all duration-300 mt-8 disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-[#f9f9f9] p-8">
                            <h2 className="text-xl font-serif text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-4 mb-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative w-12 h-12 bg-gray-100 shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <span>{item.name} x {item.quantity}</span>
                                        </div>
                                        <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
