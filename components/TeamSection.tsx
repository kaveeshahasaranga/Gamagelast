import Image from "next/image";

const team = [
    { id: 1, name: "Jason Man", role: "Customer Support", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
    { id: 2, name: "Joana Skup", role: "CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
    { id: 3, name: "Cristian Le", role: "Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { id: 4, name: "Jenny Miley", role: "Asst. Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" },
];

const TeamSection = () => {
    return (
        <section className="py-24 bg-white text-center">
            <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-4">Expert Guides</h3>
            <h2 className="text-4xl font-serif text-gray-800 uppercase mb-16 tracking-wide">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
                {team.map((member) => (
                    <div key={member.id} className="group">
                        <div className="relative h-80 w-full mb-6 overflow-hidden bg-gray-100">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <h4 className="text-lg font-serif font-bold text-gray-800 uppercase">{member.name}</h4>
                        <p className="text-accent text-xs uppercase tracking-wider">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
