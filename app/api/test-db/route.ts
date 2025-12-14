import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectToDatabase();

        // Create a dummy product to test the model
        const testProduct = await Product.create({
            name: "Test Watch " + Date.now(),
            description: "Test Description",
            price: 1000,
            image: "/test.jpg", // placeholder
            stock: 10
        });

        // Clean up
        await Product.findByIdAndDelete(testProduct._id);

        return NextResponse.json({ success: true, message: "Database connection and Product model verified", product: testProduct });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
