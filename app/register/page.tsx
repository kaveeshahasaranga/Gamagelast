"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                setError(data.message || "Registration failed");
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
                title="Create Account"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Create Account" }
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
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border border-gray-100 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-400 font-serif"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                {loading ? "Creating..." : "Create"}
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-4 text-sm text-gray-500 font-sans pt-6">
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

export default RegisterPage;
