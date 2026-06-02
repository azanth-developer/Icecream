'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';
import Image from 'next/image';

export default function TypographyOverlay({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 10%
  const opacityBoom = useTransform(scrollYProgress, [0.05, 0.1, 0.15, 0.2], [0, 1, 1, 0]);
  const yBoom = useTransform(scrollYProgress, [0.05, 0.2], [40, -40]);

  // 20%
  const opacityNotJust = useTransform(scrollYProgress, [0.15, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const yNotJust = useTransform(scrollYProgress, [0.15, 0.3], [40, -40]);

  // 35%
  const opacityCrafted = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const yCrafted = useTransform(scrollYProgress, [0.3, 0.45], [40, -40]);

  // 55%
  const opacityCravings = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);
  const yCravings = useTransform(scrollYProgress, [0.5, 0.65], [40, -40]);

  // 75%
  const opacityRich = useTransform(scrollYProgress, [0.7, 0.75, 0.8, 0.85], [0, 1, 1, 0]);
  const yRich = useTransform(scrollYProgress, [0.7, 0.85], [40, -40]);

  // 95%
  const opacityExperience = useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 1, 1]);
  const yExperience = useTransform(scrollYProgress, [0.9, 1], [40, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-4">
      
      {/* 10% */}
      <motion.div 
        style={{ opacity: opacityBoom, y: yBoom }}
        className="absolute w-[90vw] max-w-[800px] h-[40vh] flex items-center justify-center"
      >
        <Image src="/logo.png" alt="BOOM" fill className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" priority />
      </motion.div>

      {/* 20% */}
      <motion.h2 
        style={{ opacity: opacityNotJust, y: yNotJust }}
        className="absolute text-3xl md:text-5xl font-light font-inter tracking-[0.2em] text-cream leading-loose uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] text-center"
      >
        Not Just <br className="md:hidden" /><span className="text-gold italic font-playfair lowercase text-5xl md:text-7xl tracking-normal">Ice Cream</span>
      </motion.h2>

      {/* 35% */}
      <motion.h2 
        style={{ opacity: opacityCrafted, y: yCrafted }}
        className="absolute text-2xl md:text-4xl font-light font-inter tracking-[0.15em] text-cream leading-loose uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] text-center"
      >
        Crafted From <br className="md:hidden" /><span className="text-gold italic font-playfair lowercase text-4xl md:text-6xl tracking-normal pr-2">premium</span> ingredients
      </motion.h2>

      {/* 55% */}
      <motion.h2 
        style={{ opacity: opacityCravings, y: yCravings }}
        className="absolute text-3xl md:text-5xl font-light font-inter tracking-[0.15em] text-cream leading-loose uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] text-center"
      >
        Every scoop creates <br/><span className="font-light font-playfair text-gold lowercase text-6xl md:text-8xl tracking-normal">cravings</span>
      </motion.h2>

      {/* 75% */}
      <motion.h2 
        style={{ opacity: opacityRich, y: yRich }}
        className="absolute text-5xl md:text-7xl font-light font-playfair tracking-wider text-cream leading-tight drop-shadow-[0_0_25px_rgba(0,0,0,0.9)] text-center"
      >
        Rich. <span className="text-gold italic">Creamy.</span> <br />Unforgettable.
      </motion.h2>

      {/* 95% */}
      <motion.div 
        style={{ opacity: opacityExperience, y: yExperience }}
        className="absolute text-center flex flex-col items-center justify-center drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]"
      >
        <h1 className="text-2xl md:text-4xl font-light font-inter tracking-[0.2em] text-cream uppercase leading-loose mb-12">
          Experience
        </h1>
        <div className="relative w-[80vw] max-w-[600px] h-[30vh] mx-auto block">
          <Image src="/logo.png" alt="THE BOOM" fill className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
        </div>
      </motion.div>

    </div>
  );
}
