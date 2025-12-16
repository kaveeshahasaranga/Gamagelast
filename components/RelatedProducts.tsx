import Product from "@/models/Product";
import ProductCard from "./ProductCard";

export default async function RelatedProducts({ currentId }: { currentId: string }) {
    // Get 4 random products that are not the current one
    // Note: In a real app, use $sample aggregation for true randomness
    const related = await Product.find({ _id: { $ne: currentId } }).limit(4);

    return (
        <section className="border-t border-gray-100 pt-16">
            <h3 className="text-2xl font-serif text-center mb-10 text-accent">Recommended Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {related.map((product) => (
                    <ProductCard
                        key={product._id.toString()}
                        id={product._id.toString()}
                        name={product.name}
                        price={`Rs. ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                        image={product.image}
                    />
                ))}
            </div>
        </section>
    );
}
