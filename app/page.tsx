import Nav from "@/components/Nav";
import BlueprintBackdrop from "@/components/BlueprintBackdrop";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Process from "@/components/Process";
import PinnedDemo from "@/components/PinnedDemo";
import Results from "@/components/Results";
import Stack from "@/components/Stack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <BlueprintBackdrop />
      <Nav />
      <Hero />
      <LogoMarquee />
      <Manifesto />
      <Services />
      <Process />
      <PinnedDemo />
      <Results />
      <Stack />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
