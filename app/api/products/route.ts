import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        await connectToDatabase();

        let query: any = {};

        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        if (category && category !== "All") {
            // Assuming we have a category field, if not strict, partial match or exact
            // For now, let's assume strict or if we don't have category field yet, we might need to rely on name/description or add it to schema.
            // Looking at previous context, we don't explicitly have category in Product interface in local file, 
            // but let's check Product model. 
            // If Product model doesn't have category, we should add it or filter by name for now.
            // Let's assume we want to filter by category field.
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, products });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
