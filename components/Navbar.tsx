"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 text-text-light">
            {/* Logo */}
            <div className="text-2xl font-serif font-bold tracking-wider">
                <Link href="/">GAMAGE WATCH</Link>
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const input = form.elements.namedItem("search") as HTMLInputElement;
                        if (input.value.trim()) {
                            window.location.href = `/shop?search=${encodeURIComponent(input.value)}`;
                        }
                    }}
                    className="relative hidden lg:block"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        className="bg-transparent border-b border-gray-300 focus:border-accent text-sm pb-1 px-1 outline-none w-48 transition-all"
                    />
                    <button type="submit" className="absolute right-0 bottom-1 hover:text-accent">
                        <Search size={16} />
                    </button>
                </form>
                {/* Mobile Search Icon (Functionality could be improved for mobile modal later) */}
                <button className="lg:hidden hover:text-accent transition-colors">
                    <Search size={20} />
                </button>

                <Link href="/account" className="hover:text-accent transition-colors">
                    <User size={20} />
                </Link>
                <Link href="/cart" className="relative hover:text-accent transition-colors">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
