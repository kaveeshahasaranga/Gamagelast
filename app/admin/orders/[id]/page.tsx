"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, Package } from "lucide-react";
import Image from "next/image";

interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    orderItems: {
        _id: string;
        name: string;
        quantity: number;
        image: string;
        price: number;
    }[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    totalPrice: number;
    status: string;
    isPaid: boolean;
    paymentMethod: string;
    createdAt: string;
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders?id=${id}`);
                const data = await res.json();
                if (data.success) {
                    setOrder(data.order);
                }
            } catch (error) {
                console.error("Failed to fetch order", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    if (loading) return <div className="p-8">Loading ...</div>;
    if (!order) return <div className="p-8">Order not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/orders" className="flex items-center space-x-2 text-gray-500 hover:text-black mb-6">
                <ArrowLeft size={20} />
                <span>Back to Orders</span>
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h1>
                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <MapPin size={16} /> Shipping Address
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                            <p className="font-semibold text-gray-900 mb-1">{order.user.name}</p>
                            <p>{order.user.email}</p>
                            <div className="mt-2 text-gray-600">
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <CreditCard size={16} /> Payment Details
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                            <p className="flex justify-between mb-2">
                                <span>Method:</span>
                                <span className="font-medium">{order.paymentMethod}</span>
                            </p>
                            <p className="flex justify-between mb-2">
                                <span>Status:</span>
                                <span className={order.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                    {order.isPaid ? "Paid" : "Not Paid"}
                                </span>
                            </p>
                            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total:</span>
                                <span>Rs. {order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="p-8 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Package size={16} /> Order Items
                    </h3>
                    <div className="space-y-4">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
