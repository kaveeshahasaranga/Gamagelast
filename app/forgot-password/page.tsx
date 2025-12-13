"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";

const ForgotPasswordPage = () => {
    return (
        <main className="bg-white min-h-screen pb-24">
            <PageHero
                title="Recover Password"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Recover Password" }
                ]}
                backgroundImage="/images/hero-bg.jpg"
            />

            <section className="max-w-2xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
                <div className="bg-[#f9f9f9] p-8 md:p-16 shadow-sm">
                    <div className="mb-8 text-center">
                        <p className="text-gray-600 font-serif">
                            We will send you an email to reset your password.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                type="button"
                                className="border border-gray-300 px-10 py-3 text-sm uppercase tracking-wider text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                            >
                                Submit
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-4 text-sm text-gray-500 font-sans pt-6">
                            <Link href="/login" className="hover:text-black transition-colors">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </section>

            {/* Bottom Strip */}
            <section className="bg-black py-16 mt-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white/80 font-serif tracking-widest text-sm uppercase">
                        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ForgotPasswordPage;
