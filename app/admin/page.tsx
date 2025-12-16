"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Package } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSales: 0,
        totalProducts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="p-8">Loading stats...</div>;

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

            {/* Recent Orders Placeholder - To be implemented next step */}
            <div className="mt-12">
                <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center text-gray-500">
                    Chart or Recent Orders table can go here.
                </div>
            </div>
        </div>
    );
}
