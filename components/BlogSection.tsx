import Image from "next/image";
import Link from "next/link";

const posts = [
    { id: 1, title: "The History of Timekeeping", date: "Oct 12, 2025", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Choosing the Perfect Watch", date: "Nov 05, 2025", image: "https://images.unsplash.com/photo-1511370235399-1802dae1d867?q=80&w=2076&auto=format&fit=crop" },
    { id: 3, title: "Maintenance Tips", date: "Dec 01, 2025", image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=1935&auto=format&fit=crop" },
];

const BlogSection = () => {
    return (
        <section className="py-20 bg-primary text-center border-t border-white/10">
            <h3 className="text-accent uppercase tracking-widest text-sm mb-2">Read Our</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-text-light mb-16">LATEST BLOG</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
                {posts.map((post) => (
                    <div key={post.id} className="text-left group cursor-pointer">
                        <div className="relative h-64 w-full mb-6 overflow-hidden rounded">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <p className="text-accent text-sm mb-2">{post.date}</p>
                        <h4 className="text-xl font-serif text-text-light group-hover:text-accent transition-colors">
                            {post.title}
                        </h4>
                        <Link href="#" className="text-gray-400 text-sm mt-4 inline-block hover:text-white">
                            Read More &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
