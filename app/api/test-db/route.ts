import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    console.log("Checking DB connection...");
    const uri = process.env.MONGODB_URI;
    console.log("URI Defined:", !!uri);

    if (!uri) {
        return NextResponse.json({ success: false, error: "URI Missing" }, { status: 500 });
    }

    try {
        await connectToDatabase();
        console.log("Connected to DB");

        // Create a dummy product to test the model
        const testProduct = await Product.create({
            name: "Test Watch " + Date.now(),
            description: "Test Description",
            price: 1000,
            image: "/test.jpg", // placeholder
            stock: 10
        });
        console.log("Created Product");

        // Clean up
        await Product.findByIdAndDelete(testProduct._id);
        console.log("Deleted Product");

        return NextResponse.json({ success: true, message: "Database connection and Product model verified", product: testProduct });
    } catch (error: any) {
        console.error("DB Error:", error);
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
    }
}
