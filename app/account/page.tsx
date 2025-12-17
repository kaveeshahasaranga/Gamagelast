"use client";

import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AccountPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (session?.user?.email) {
                try {
                    const res = await fetch('/api/orders');
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data.orders || []);
                    }
                } catch (e) {
                    console.error("Failed to fetch orders", e);
                }
            }
        }
        if (status === "authenticated") {
            fetchOrders();
        }
    }, [session, status]);

    if (status === "loading") {
        return (
            <main className="bg-white min-h-screen pb-24 flex items-center justify-center">
                <p className="text-xl font-serif">Loading account...</p>
            </main>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <main className="bg-white min-h-screen pb-24 text-black">
            <PageHero
                title="My Account"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Account" }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hello,</p>
                                    <h3 className="font-serif font-bold text-gray-900">{session.user?.name}</h3>
                                </div>
                            </div>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-200 text-gray-700"}`}
                                >
                                    My Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab("address")}
                                    className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === "address" ? "bg-black text-white" : "hover:bg-gray-200 text-gray-700"}`}
                                >
                                    Addresses
                                </button>
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === "details" ? "bg-black text-white" : "hover:bg-gray-200 text-gray-700"}`}
                                >
                                    Account Details
                                </button>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center space-x-2 mt-4"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/4">
                        {activeTab === "orders" && (
                            <>
                                <h2 className="text-2xl font-serif text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                                    Order History
                                </h2>

                                <div className="space-y-6">
                                    {orders.length === 0 ? (
                                        <p>You haven't placed any orders yet.</p>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order._id} className="border border-gray-200 p-6 rounded-lg">
                                                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Order ID</p>
                                                        <p className="font-medium text-gray-900">#{order._id}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-500">Status</p>
                                                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mt-1">
                                                            {order.isPaid ? "Paid" : "Processing"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {order.orderItems.map((item: any) => (
                                                        <div key={item._id} className="flex justify-between items-center py-2">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="relative w-12 h-12 bg-gray-100 shrink-0">
                                                                    {item.image && <Image src={item.image} alt={item.name} fill className="object-contain" />}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{item.name}</p>
                                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                            <p className="font-medium">Rs. {item.price.toLocaleString()}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                                    <p className="text-xl font-serif font-bold">Total: Rs. {order.totalPrice.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        )}

                        {activeTab === "address" && (
                            <>
                                <h2 className="text-2xl font-serif text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                                    My Addresses
                                </h2>
                                <div className="p-6 border border-gray-200 rounded-lg">
                                    <p className="text-gray-500 mb-4">You have not set up this type of address yet.</p>
                                    <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                                        Add Address
                                    </button>
                                </div>
                            </>
                        )}

                        {activeTab === "details" && (
                            <>
                                <h2 className="text-2xl font-serif text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                                    Account Details
                                </h2>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" value={session.user?.name || ""} disabled className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" value={session.user?.email || ""} disabled className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50" />
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-sm text-gray-500">To change your password or email, please contact support.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AccountPage;
