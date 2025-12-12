import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 text-text-light">
            {/* Logo */}
            <div className="text-2xl font-serif font-bold tracking-wider">
                <Link href="/">WATCH SHOP</Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-sans text-sm tracking-wide">
                <Link href="/" className="hover:text-accent transition-colors">
                    HOME
                </Link>
                <Link href="/shop" className="hover:text-accent transition-colors">
                    SHOP
                </Link>
                <Link href="/about" className="hover:text-accent transition-colors">
                    ABOUT
                </Link>
                <Link href="/contact" className="hover:text-accent transition-colors">
                    CONTACT
                </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
                <button className="hover:text-accent transition-colors">
                    <Search size={20} />
                </button>
                <button className="hover:text-accent transition-colors">
                    <User size={20} />
                </button>
                <button className="relative hover:text-accent transition-colors">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        0
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
