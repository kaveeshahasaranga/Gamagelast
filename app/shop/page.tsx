import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Shop() {
    return (
        <main className="min-h-screen bg-primary">
            <Navbar />
            <div className="pt-32 px-8 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-text-light mb-8">Shop</h1>
                <p className="text-gray-400">Our collection is coming soon.</p>
            </div>
            <Footer />
        </main>
    );
}
