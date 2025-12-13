"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { LogOut, Package, User, MapPin } from "lucide-react";

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <main className="bg-white min-h-screen pb-24">
            <PageHero
                title="My Account"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "My Account" }
                ]}
                backgroundImage="/images/hero-bg.jpg"
            />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-[#f9f9f9] p-6">
                            <div className="flex items-center space-x-3 mb-8 pb-8 border-b border-gray-200">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Hello,</p>
                                    <p className="font-serif text-lg">Kaveesha</p>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("dashboard")}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${activeTab === "dashboard" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    <User size={18} />
                                    <span>Dashboard</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${activeTab === "orders" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    <Package size={18} />
                                    <span>Orders</span>
                                </button>
                                <button
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    <MapPin size={18} />
                                    <span>Addresses</span>
                                </button>
                                <Link
                                    href="/login"
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors mt-4 border-t border-gray-200 pt-4"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/4">
                        {activeTab === "dashboard" && (
                            <div>
                                <h2 className="text-2xl font-serif text-gray-900 mb-6">Dashboard</h2>
                                <p className="text-gray-600 mb-8">
                                    From your account dashboard you can view your <span className="text-black font-semibold">recent orders</span>, manage your <span className="text-black font-semibold">shipping and billing addresses</span>, and <span className="text-black font-semibold">edit your password and account details</span>.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-[#f9f9f9] p-8 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("orders")}>
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                            <Package size={32} />
                                        </div>
                                        <h3 className="font-serif text-lg mb-2">Orders</h3>
                                        <p className="text-sm text-gray-500">2 Active</p>
                                    </div>
                                    <div className="bg-[#f9f9f9] p-8 text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                            <MapPin size={32} />
                                        </div>
                                        <h3 className="font-serif text-lg mb-2">Addresses</h3>
                                        <p className="text-sm text-gray-500">Main St, Elpitiya</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div>
                                <h2 className="text-2xl font-serif text-gray-900 mb-6">Recent Orders</h2>
                                <div className="bg-white border border-gray-200 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4 font-normal">Order</th>
                                                <th className="px-6 py-4 font-normal">Date</th>
                                                <th className="px-6 py-4 font-normal">Status</th>
                                                <th className="px-6 py-4 font-normal">Total</th>
                                                <th className="px-6 py-4 font-normal text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-sans font-semibold text-gray-900">#2453</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">March 10, 2025</td>
                                                <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Delivered</span></td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-serif">$250.00</td>
                                                <td className="px-6 py-4 text-sm text-right">
                                                    <button className="text-accent hover:text-black transition-colors">View</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-sans font-semibold text-gray-900">#2451</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">Feb 28, 2025</td>
                                                <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Processing</span></td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-serif">$180.00</td>
                                                <td className="px-6 py-4 text-sm text-right">
                                                    <button className="text-accent hover:text-black transition-colors">View</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AccountPage;
