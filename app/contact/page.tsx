import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactInfoCards from "@/components/ContactInfoCards";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ContactHero />
            <ContactInfoCards />
            <ContactForm />
            <Footer />
        </main>
    );
}
