import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ currentId }: { currentId: number }) {
    // Get 4 random products that are not the current one
    const related = products
        .filter((p) => p.id !== currentId)
        .slice(0, 4);

    return (
        <section className="border-t border-gray-100 pt-16">
            <h3 className="text-2xl font-serif text-center mb-10 text-accent">Recommended Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {related.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </section>
    );
}
