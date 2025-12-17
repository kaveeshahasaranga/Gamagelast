import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        // Admin can fetch specific order or all orders
        if (session.user.role === "admin") {
            if (id) {
                const order = await Order.findById(id).populate("user", "name email");
                if (!order) {
                    return NextResponse.json({ message: "Order not found" }, { status: 404 });
                }
                return NextResponse.json({ success: true, order });
            }

            const orders = await Order.find()
                .populate("user", "name email")
                .sort({ createdAt: -1 });

            return NextResponse.json({ success: true, orders });
        } else {
            // Regular user: Fetch only their own orders
            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            // If ID is provided, ensure it belongs to the user
            if (id) {
                const order = await Order.findOne({ _id: id, user: user._id }).populate("user", "name email");
                if (!order) {
                    return NextResponse.json({ message: "Order not found" }, { status: 404 });
                }
                return NextResponse.json({ success: true, order });
            }

            const orders = await Order.find({ user: user._id })
                .sort({ createdAt: -1 });

            return NextResponse.json({ success: true, orders });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { items, shippingAddress } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ message: "No items in cart" }, { status: 400 });
        }

        await connectToDatabase();

        // fetch user
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate items and calculate total price from server side
        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.id);
            if (!product) {
                return NextResponse.json(
                    { message: `Product not found: ${item.name}` },
                    { status: 404 }
                );
            }

            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                image: product.image,
            });
        }

        // Create Order
        const newOrder = await Order.create({
            user: user._id,
            orderItems,
            shippingAddress,
            paymentMethod: "COD", // Defaulting to Cash on Delivery for now
            totalPrice,
            isPaid: false,
            processedAt: new Date(),
        });

        return NextResponse.json(
            { message: "Order placed successfully", orderId: newOrder._id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
