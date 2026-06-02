'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TypographyOverlay() {
  const { scrollYProgress } = useScroll();

  // "BOOM"
  const opacityBoom = useTransform(scrollYProgress, [0.1, 0.15, 0.2, 0.25], [0, 1, 1, 0]);
  const yBoom = useTransform(scrollYProgress, [0.1, 0.25], [50, -50]);

  // "Crafted With Premium Ingredients"
  const opacityCrafted = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const yCrafted = useTransform(scrollYProgress, [0.3, 0.45], [50, -50]);

  // "Every Scoop Creates Cravings"
  const opacityCravings = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);
  const yCravings = useTransform(scrollYProgress, [0.5, 0.65], [50, -50]);

  // "Rich. Creamy. Unforgettable."
  const opacityRich = useTransform(scrollYProgress, [0.7, 0.75, 0.8, 0.85], [0, 1, 1, 0]);
  const yRich = useTransform(scrollYProgress, [0.7, 0.85], [50, -50]);

  // "Experience The BOOM"
  const opacityExperience = useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 1, 1]);
  const yExperience = useTransform(scrollYProgress, [0.9, 1], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-4">
      
      {/* 0.15 */}
      <motion.h1 
        style={{ opacity: opacityBoom, y: yBoom }}
        className="absolute text-[12vw] md:text-[10vw] font-black font-playfair tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gold-light to-gold-dark drop-shadow-2xl uppercase"
      >
        BOOM
      </motion.h1>

      {/* 0.35 */}
      <motion.h2 
        style={{ opacity: opacityCrafted, y: yCrafted }}
        className="absolute text-5xl md:text-7xl font-bold font-playfair tracking-tight text-white drop-shadow-lg max-w-5xl leading-tight"
      >
        Crafted With <br className="md:hidden" /><span className="text-gold italic">Premium</span> Ingredients
      </motion.h2>

      {/* 0.55 */}
      <motion.h2 
        style={{ opacity: opacityCravings, y: yCravings }}
        className="absolute text-4xl md:text-6xl font-light font-inter tracking-wide text-white drop-shadow-lg leading-snug"
      >
        Every Scoop Creates <span className="font-bold font-playfair text-gold">Cravings</span>
      </motion.h2>

      {/* 0.75 */}
      <motion.h2 
        style={{ opacity: opacityRich, y: yRich }}
        className="absolute text-5xl md:text-8xl font-black font-playfair tracking-tight text-white drop-shadow-xl leading-none"
      >
        Rich. <span className="text-gold">Creamy.</span> <br />Unforgettable.
      </motion.h2>

      {/* 0.95 */}
      <motion.h1 
        style={{ opacity: opacityExperience, y: yExperience }}
        className="absolute text-6xl md:text-[8vw] font-bold font-playfair tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl leading-none"
      >
        Experience <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold-light to-gold-dark">The BOOM</span>
      </motion.h1>

    </div>
  );
}
