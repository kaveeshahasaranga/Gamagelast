import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectToDatabase();

        const products = await Product.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, products });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
