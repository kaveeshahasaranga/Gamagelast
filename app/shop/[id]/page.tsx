import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsHero from "@/components/ProductDetailsHero";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";
import { products } from "@/lib/products";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="pt-32 text-center">
                    <h1 className="text-2xl">Product not found</h1>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ProductDetailsHero />

            <div className="max-w-7xl mx-auto px-8 py-16">
                <ProductInfo product={product} />
                <ProductTabs />
                <RelatedProducts currentId={product.id} />
            </div>

            <Footer />
        </main>
    );
}
