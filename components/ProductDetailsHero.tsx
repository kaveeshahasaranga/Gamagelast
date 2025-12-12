import Link from "next/link";
import Image from "next/image";

export default function ProductDetailsHero() {
    return (
        <section className="relative h-[40vh] w-full bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Image
                    src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop"
                    alt="Product Details Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-4 uppercase">
                    PRODUCT
                </h1>
                <nav className="flex items-center justify-center space-x-2 text-sm text-gray-400 font-sans">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-white transition-colors">Products</Link>
                </nav>
            </div>
        </section>
    );
}
