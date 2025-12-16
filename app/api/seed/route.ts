import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { products } from "@/lib/products";

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Clear existing products (optional: comment out if you want to invalid duplicates manually)
        await Product.deleteMany({});

        // 2. Transform and Insert
        const formattedProducts = products.map((p) => {
            // Convert "Rs. 4,500.00" -> 4500
            const priceString = p.price.replace(/[^0-9.]/g, "");
            const price = parseFloat(priceString);

            return {
                name: p.name,
                description: p.description,
                price: price,
                image: p.image,
                category: "Watch",
                stock: 10, // Default stock
                isFeatured: [1, 2, 3].includes(p.id), // Feature the first few
            };
        });

        await Product.insertMany(formattedProducts);

        return NextResponse.json({
            success: true,
            message: `Seeded ${formattedProducts.length} products successfully`,
        });
    } catch (error: any) {
        console.error("Seed Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
