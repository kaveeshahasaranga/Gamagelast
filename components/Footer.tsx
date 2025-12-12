import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-16 px-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">CONTACT US</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start space-x-3">
                            <MapPin size={18} className="text-accent mt-1" />
                            <span>123 Watch Street, Luxury Avenue, New York, NY 10012</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone size={18} className="text-accent" />
                            <span>+1 234 567 890</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail size={18} className="text-accent" />
                            <span>info@watchshop.com</span>
                        </li>
                    </ul>
                    <div className="flex space-x-4 mt-6">
                        <Link href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Youtube size={20} /></Link>
                    </div>
                </div>

                {/* My Account */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">MY ACCOUNT</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-accent transition-colors">My Profile</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">My Orders</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">Wishlist</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">Newsletter</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">CATEGORIES</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-accent transition-colors">Men's Watches</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">Women's Watches</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">Smart Watches</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors">Accessories</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">NEWSLETTER</h4>
                    <p className="text-sm mb-4">Subscribe to our newsletter for latest updates and offers.</p>
                    <form className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-accent text-primary font-bold py-3 hover:bg-white transition-colors"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs">
                <p>&copy; 2025 Watch Shop. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
