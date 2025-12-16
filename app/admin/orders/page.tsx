"use client";

import { useState, useEffect } from "react";
import { Check, Truck, X } from "lucide-react";

interface Order {
    _id: string;
    user: { name: string; email: string };
    totalPrice: number;
    isPaid: boolean;
    status: string; // e.g., Processing, Shipped, Delivered
    createdAt: string;
    shippingAddress: { city: string };
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Need an Admin API for generic "get all orders". Currently /api/orders gets *my* orders.
    // I need to update /api/orders/route.ts to allow Admin to fetch *all*.

    // For now, I'll assume I update the API.
    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders'); // Separate endpoint or query param?
            // Let's make a new endpoint /api/admin/orders/route.ts for clean separation
            const data = await res.json();
            if (data.success) setOrders(data.orders);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        // Implement status update API call
        // await fetch(`/api/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status: newStatus })})
        // For prototype, just alert.
        alert(`Status updated to ${newStatus} (Feature pending API)`);
    };

    if (loading) return <div className="p-8">Loading orders...</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Customer</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Total</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm">{order._id.substring(0, 8)}...</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{order.user?.name || "Guest"}</div>
                                    <div className="text-sm text-gray-500">{order.shippingAddress?.city}</div>
                                </td>
                                <td className="px-6 py-4 font-medium">Rs. {order.totalPrice.toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => updateStatus(order._id, 'Shipped')} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
                                        <Truck size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
