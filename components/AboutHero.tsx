import Link from "next/link";

const AboutHero = () => {
    return (
        <section className="relative h-[40vh] w-full bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-0" />

            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-4 uppercase">
                    ABOUT
                </h1>
                <nav className="flex items-center justify-center space-x-2 text-sm text-gray-400 font-sans">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-white">About</span>
                </nav>
            </div>
        </section>
    );
};

export default AboutHero;
