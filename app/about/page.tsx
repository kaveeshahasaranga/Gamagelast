import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutSensory from "@/components/AboutSensory";
import Testimonials from "@/components/Testimonials";
import TeamSection from "@/components/TeamSection";

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <AboutHero />
            <AboutSensory />
            <Testimonials />
            <TeamSection />
            <Footer />
        </main>
    );
}
