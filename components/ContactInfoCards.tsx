import { Phone, Mail, MapPin } from "lucide-react";

const InfoCard = ({ icon: Icon, title, lines }: { icon: any, title: string, lines: string[] }) => (
    <div className="bg-[#EAD0A6] p-10 flex flex-col items-start h-full">
        <Icon className="mb-6 text-black" size={24} />
        <h3 className="text-xl font-serif text-black mb-4">{title}</h3>
        {lines.map((line, index) => (
            <p key={index} className="text-gray-800 text-sm mb-1">{line}</p>
        ))}
    </div>
);

const ContactInfoCards = () => {
    const cards = [
        {
            icon: Phone,
            title: "Phone",
            lines: ["0912290410", "+94 77 123 4567"]
        },
        {
            icon: Mail,
            title: "Email",
            lines: ["gamagewatch@gmail.com", "support@gamagewatch.com"]
        },
        {
            icon: MapPin,
            title: "Address",
            lines: ["Main Steet Elpitiya", "Southern Province, Sri Lanka"]
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <InfoCard key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default ContactInfoCards;
