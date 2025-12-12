import { Quote } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
    return (
        <section className="relative py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center relative z-10">
                <div className="w-full md:w-1/2 space-y-8 pr-12">
                    <h4 className="text-4xl font-serif text-gray-800 uppercase tracking-widest">Our Testimonials</h4>
                    <div className="w-24 h-0.5 bg-gray-300"></div>

                    <p className="text-xl text-gray-600 italic font-serif leading-relaxed">
                        "Simple, yet elegant. The craftsmanship is superb and the service was outstanding. I highly recommend Gamage Watch for anyone looking for a reliable and stylish timepiece."
                    </p>

                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden relative">
                            <Image
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop"
                                alt="User"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 uppercase text-sm">Matthew Doe</h5>
                            <p className="text-xs text-gray-500 uppercase">Professor</p>
                        </div>
                    </div>
                </div>

                {/* Right side large image/graphic */}
                <div className="w-full md:w-1/2 relative h-[500px] mt-12 md:mt-0">
                    <Image
                        src="https://images.unsplash.com/photo-1495856458515-0637185db551?q=80&w=2070&auto=format&fit=crop"
                        alt="Clock"
                        fill
                        className="object-cover rounded-full shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
