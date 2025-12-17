"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Package, Eye } from "lucide-react";
import Link from "next/link";

interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSales: 0,
        totalProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/admin/stats');
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats(statsData.stats);
                }

                // Fetch Recent Orders
                const ordersRes = await fetch('/api/orders');
                const ordersData = await ordersRes.json();
                if (ordersData.success) {
                    setRecentOrders(ordersData.orders.slice(0, 5)); // Take top 5
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    const cards = [
        {
            title: "Total Sales",
            value: `Rs. ${stats.totalSales.toLocaleString()}`,
            icon: DollarSign,
            color: "bg-green-500"
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: "bg-blue-500"
        },
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: Package,
            color: "bg-purple-500"
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.title} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100">
                            <div className={`p-4 rounded-lg ${card.color} text-white shadow-lg`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif font-bold text-gray-800">Recent Activity</h2>
                    <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
                        View All Orders
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Customer</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                        {order._id.substring(order._id.length - 6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {order.user?.name || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">Rs. {order.totalPrice.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/orders/${order._id}`}>
                                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
