'use client';
import { useRef } from 'react';
import CanvasSequence from "../components/CanvasSequence";
import TypographyOverlay from "../components/TypographyOverlay";
import ParticlesAndEffects from "../components/ParticlesAndEffects";

import OurStory from "../components/sections/OurStory";
import FlavorCollection from "../components/sections/FlavorCollection";
import PremiumIngredients from "../components/sections/PremiumIngredients";
import WhyBoom from "../components/sections/WhyBoom";
import CustomerLove from "../components/sections/CustomerLove";
import StoreLocator from "../components/sections/StoreLocator";
import Footer from "../components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-background text-cream w-full">
      {/* Massive 1000vh Hero Scrollytelling Section */}
      <main ref={heroRef} id="hero-container" className="relative w-full bg-background" style={{ height: "1000vh" }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-background flex items-center justify-center">
          
          <div className="absolute inset-0 z-0 origin-center">
            <CanvasSequence />
          </div>
          
          <div className="absolute inset-0 z-10 pointer-events-none">
            <ParticlesAndEffects />
          </div>
          
          <div className="absolute inset-0 z-20 pointer-events-none">
            <TypographyOverlay containerRef={heroRef} />
          </div>
          
        </div>
      </main>

      {/* The 6 Premium Luxury Sections */}
      <OurStory />
      <FlavorCollection />
      <PremiumIngredients />
      <WhyBoom />
      <CustomerLove />
      <StoreLocator />
      <Footer />
    </div>
  );
}
