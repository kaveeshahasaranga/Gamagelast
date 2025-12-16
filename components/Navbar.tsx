"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { cartCount } = useCart();
    const router = useRouter();
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Navigating to:", `/shop?search=${encodeURIComponent(searchQuery)}`);
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

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
                    onSubmit={handleSearch}
                    className="relative hidden lg:block"
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent border-b border-gray-300 focus:border-accent text-sm pb-1 px-1 outline-none w-48 transition-all text-black"
                    />
                    <button type="submit" className="absolute right-0 bottom-1 hover:text-accent">
                        <Search size={16} />
                    </button>
                </form>
                {/* Mobile Search Icon */}
                <button className="lg:hidden hover:text-accent transition-colors">
                    <Search size={20} />
                </button>

                {/* Admin Link */}
                {session?.user?.role === "admin" && (
                    <Link href="/admin" className="hover:text-accent transition-colors" title="Admin Dashboard">
                        <LayoutDashboard size={20} />
                    </Link>
                )}

                <Link href="/account" className="hover:text-accent transition-colors" title="My Account">
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
