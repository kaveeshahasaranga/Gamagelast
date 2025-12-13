import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative h-screen w-full bg-primary overflow-hidden">
            {/* Background Image Placeholder - Replace with actual image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop')" }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto">
                <h2 className="text-accent text-lg md:text-xl tracking-[0.2em] mb-4 uppercase">
                    New Arrival
                </h2>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-text-light leading-tight mb-8">
                    PREMIUM  <br />
                    <span className="text-accent">WATCH</span>
                </h1>
                <p className="text-gray-400 max-w-md mb-10 text-sm md:text-base leading-relaxed">
                    Discover the perfect blend of luxury and precision. Our latest collection defines elegance for the modern era.
                </p>

                <Link
                    href="/shop"
                    className="w-fit px-10 py-4 bg-accent text-primary font-bold tracking-wider hover:bg-white transition-colors duration-300"
                >
                    SHOP NOW
                </Link>
            </div>
        </section>
    );
};

export default Hero;
