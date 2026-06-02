'use client';
import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      touchMultiplier: 2,
      wheelMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    // Ensure GSAP recalculates heights after all assets (fonts, images) load in production
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('load', handleLoad);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
