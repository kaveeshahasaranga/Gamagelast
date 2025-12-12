import Image from "next/image";

const products = [
    { id: 1, name: "Smart Chrono", price: "$299", image: "/home/home-watch-4.jpg" },
    { id: 2, name: "Tech Master", price: "$350", image: "/home/home-watch-5.jpg" },
    { id: 3, name: "Future Dial", price: "$420", image: "/home/home-watch-1.jpg" },
];

const NewTechnology = () => {
    return (
        <section className="py-20 bg-primary/95 text-center">
            <h3 className="text-accent uppercase tracking-widest text-sm mb-2">Innovation</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-text-light mb-16">NEW TECHNOLOGY</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
                {products.map((product) => (
                    <div key={product.id} className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300">
                        <div className="relative h-64 w-full mb-6 overflow-hidden rounded">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="text-xl font-serif text-text-light mb-2">{product.name}</h4>
                        <p className="text-accent font-bold">{product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewTechnology;
