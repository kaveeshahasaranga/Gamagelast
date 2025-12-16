import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsHero from "@/components/ProductDetailsHero";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectToDatabase();

    let product = null;
    try {
        product = await Product.findById(id);
    } catch (e) {
        // Handle invalid ID format
        product = null;
    }

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

    // Adapt to component props
    const productData = {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: `Rs. ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        rawPrice: product.price, // Pass the raw number
        image: product.image,
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ProductDetailsHero />

            <div className="max-w-7xl mx-auto px-8 py-16">
                <ProductInfo product={productData} />
                <ProductTabs />
                <RelatedProducts currentId={product._id.toString()} />
            </div>

            <Footer />
        </main>
    );
}
