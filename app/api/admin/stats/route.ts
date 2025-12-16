import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        // Calculate total sales
        const orders = await Order.find({ isPaid: true }); // Assuming we compile unpaid too or just paid? Let's do all for now or check Logic
        // Actually usually we only count paid sales or at least confirmed. 
        // For COD, maybe we count all? Let's just sum all totalPrice for now.

        const aggregatedSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const totalSales = aggregatedSales.length > 0 ? aggregatedSales[0].total : 0;

        return NextResponse.json({
            success: true,
            stats: {
                totalOrders,
                totalProducts,
                totalSales
            }
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
