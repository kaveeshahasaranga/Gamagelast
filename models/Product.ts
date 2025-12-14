import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            maxlength: [100, "Name cannot be more than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
            min: [0, "Price cannot be negative"],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        category: {
            type: String,
            default: "Watch",
        },
        stock: {
            type: Number,
            default: 0,
            min: [0, "Stock cannot be negative"],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
