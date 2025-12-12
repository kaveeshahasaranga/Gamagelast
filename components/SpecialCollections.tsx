import Image from "next/image";

const collections = [
    { id: 1, name: "Classic Series", image: "/home/home-watch-1.jpg" },
    { id: 2, name: "Modern Tech", image: "/home/home-watch-2.jpg" },
    { id: 3, name: "Luxury Gold", image: "/home/home-watch-3.jpg" },
];

const SpecialCollections = () => {
    return (
        <section className="py-20 bg-primary text-center">
            <h3 className="text-accent uppercase tracking-widest text-sm mb-2">Discover</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-text-light mb-16">SPECIAL COLLECTIONS</h2>

            <div className="flex flex-wrap justify-center gap-10 px-8">
                {collections.map((item) => (
                    <div key={item.id} className="group relative flex flex-col items-center">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-transparent group-hover:border-accent transition-all duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={300}
                                height={300}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="mt-6 text-xl font-serif text-text-light group-hover:text-accent transition-colors">
                            {item.name}
                        </h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpecialCollections;
