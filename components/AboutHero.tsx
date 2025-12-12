
import Link from "next/link";
import Image from "next/image";

const AboutHero = () => {
    return (
        <section className="relative h-[40vh] w-full bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Image
                    src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=2070&auto=format&fit=crop"
                    alt="About Us Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

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
