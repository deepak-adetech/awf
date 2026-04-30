import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TldrSection } from "@/components/sections/TldrSection";
import { JourneyEngineSection } from "@/components/sections/JourneyEngineSection";
import { RouteMomentSection } from "@/components/sections/RouteMomentSection";
import { OmniChannelSection } from "@/components/sections/OmniChannelSection";
import { WhiteGloveSection } from "@/components/sections/WhiteGloveSection";
import { LifecycleSection } from "@/components/sections/LifecycleSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { IndustryUseCasesSection } from "@/components/sections/IndustryUseCasesSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { AiAskSection } from "@/components/sections/AiAskSection";
import { Footer } from "@/components/sections/Footer";
import { SectionReveal } from "@/components/SectionReveal";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <SectionReveal>
          <TldrSection />
        </SectionReveal>
        <SectionReveal>
          <JourneyEngineSection />
        </SectionReveal>
        <SectionReveal>
          <RouteMomentSection />
        </SectionReveal>
        <SectionReveal>
          <OmniChannelSection />
        </SectionReveal>
        <SectionReveal>
          <WhiteGloveSection />
        </SectionReveal>
        <SectionReveal>
          <LifecycleSection />
        </SectionReveal>
        <SectionReveal>
          <HowItWorksSection />
        </SectionReveal>
        <SectionReveal>
          <IndustryUseCasesSection />
        </SectionReveal>
        <SectionReveal>
          <IntegrationsSection />
        </SectionReveal>
        <SectionReveal>
          <NumbersSection />
        </SectionReveal>
        <SectionReveal>
          <AiAskSection />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
