import Link from "next/link";
import Image from "next/image";

interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageHeroProps {
    title: string;
    backgroundImage?: string;
    breadcrumbs: Breadcrumb[];
}

const PageHero = ({ title, backgroundImage, breadcrumbs }: PageHeroProps) => {
    return (
        <section 
            suppressHydrationWarning
            className="relative h-[40vh] w-full bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Image
                    src={backgroundImage || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop"}
                    alt={`${title} Background`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-4 uppercase">
                    {title}
                </h1>
                <nav className="flex items-center justify-center space-x-2 text-sm text-gray-400 font-sans">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            {index > 0 && <span>/</span>}
                            {crumb.href ? (
                                <Link href={crumb.href} className="hover:text-white transition-colors">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-white">{crumb.label}</span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default PageHero;
