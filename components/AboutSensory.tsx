import Image from "next/image";
import Link from "next/link";

const AboutSensory = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-8">
                {/* Section 1: Vintage Watch */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop"
                                alt="Vintage Watch"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h3 className="text-3xl font-serif text-gray-800 uppercase tracking-wide">Vintage Men & Women's Watch</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Our luxury watches are crafted with precision and elegance. Whether you are looking for a classic timepiece or a modern statement, we have the perfect watch for you.
                            Experience the timeless beauty of our vintage collection.
                        </p>
                        <div className="w-20 h-0.5 bg-accent"></div>
                    </div>
                </div>

                {/* Section 2: Watch Repair */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop"
                                alt="Watch Repair"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 text-right md:text-left">
                        {/* Note: keeping left align for better readability on desktop usually, but keeping structure flexible */}
                        <div className="flex flex-col items-start">
                            <h3 className="text-3xl font-serif text-gray-800 uppercase tracking-wide mb-4">Watch Repair & Services</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                We offer expert watch repair and servicing to ensure your timepiece remains in perfect condition. Our certified technicians handle everything from battery replacements to complex mechanical repairs.
                            </p>
                            <Link href="#" className="border border-gray-300 px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                                See More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSensory;
