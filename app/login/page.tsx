"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                // Fetch session to check role? No, client side redirect handles it.
                // We don't have the user object in result. We need to fetch session or just redirect.
                // A better approach is to let them go to account, but Navbar link helps. 
                // OR we query the session first. 
                // Let's just do a basic fetch to our me endpoint or check session? 
                // Actually, next-auth sign in doesn't return user role immediately in client unless we await session.

                // Simple hack: Redirect to /admin if email matches known admin? No, insecure.
                // Let's rely on the Navbar link for now to keep login fast 
                // BUT user wants me to fix "still showing this".
                // I'll add a check.

                const res = await fetch("/api/auth/session");
                const session = await res.json();
                if (session?.user?.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/account");
                }
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-white min-h-screen pb-24">
            <PageHero
                title="Account"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Account" }
                ]}
                backgroundImage="/images/hero-bg.jpg"
            />

            <section className="max-w-2xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
                <div className="bg-[#f9f9f9] p-8 md:p-16 shadow-sm">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                                required
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="border border-gray-300 px-10 py-3 text-sm uppercase tracking-wider text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-gray-500 font-sans pt-6">
                            <Link href="/forgot-password" className="hover:text-black transition-colors">
                                Forgot your password?
                            </Link>
                            <Link href="/register" className="hover:text-black transition-colors">
                                Create account
                            </Link>
                            <Link href="/shop" className="hover:text-black transition-colors">
                                Return to Store
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

export default LoginPage;
