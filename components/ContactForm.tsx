const ContactForm = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 pb-24">
            <div className="flex flex-col md:flex-row gap-16">
                {/* Map Section */}
                <div className="w-full md:w-1/2 h-[600px] bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for Map - replacing with an iframe of a generic map for now or a static image from the design */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15871.216390977823!2d80.13401765!3d6.257504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177e174246d6d%3A0x28635832fe559f13!2sElpitiya!5e0!3m2!1sen!2slk!4v1709400000000!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-serif text-gray-800 mb-12">Contact Form</h2>

                    <form className="space-y-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border border-gray-200 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-300 font-serif"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-200 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-300 font-serif"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full border border-gray-200 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-300 font-serif"
                        />
                        <textarea
                            placeholder="Message"
                            rows={8}
                            className="w-full border border-gray-200 px-6 py-4 focus:outline-none focus:border-accent text-gray-600 placeholder:text-gray-300 font-serif resize-none"
                        />

                        <button type="button" className="group flex items-center space-x-2 border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300">
                            <span>Send</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
