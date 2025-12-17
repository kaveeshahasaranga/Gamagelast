import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpecialCollections from "@/components/SpecialCollections";
import NewTechnology from "@/components/NewTechnology";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <SpecialCollections />
      <NewTechnology />
      <BlogSection />
      <Footer />
    </main>
  );
}
