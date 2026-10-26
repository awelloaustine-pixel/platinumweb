import { Nav } from "@/components/ui/Nav";
import { SceneMount } from "@/components/scene/SceneMount";
import { Motion } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <SceneMount />
      <Motion />
      <Nav />
      {/* overflow-x-clip: cards waiting to slide in from the right must not widen the
          page. clip (not hidden) so the sticky FAQ heading keeps working. */}
      <main id="main" className="relative z-10 overflow-x-clip">
        <Hero />
        <Stats />
        <Problem />
        <Solution />
        <CaseStudy />
        <Pricing />
        <Process />
        <WhyUs />
        <FAQ />
        <FinalCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
