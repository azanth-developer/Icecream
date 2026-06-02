'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function PremiumIngredients() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.5 });

  return (
    <section ref={containerRef} className="w-full py-40 bg-background relative overflow-hidden z-30 border-y border-white/5">
      <motion.div 
        ref={textRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 text-center mb-32 relative z-10"
      >
        <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-6">The Essence</h3>
        <h2 className="font-playfair text-5xl md:text-7xl text-cream">Uncompromised Quality</h2>
      </motion.div>

      <div className="relative h-[600px] w-full max-w-5xl mx-auto">
        <motion.div style={{ y: y1 }} className="absolute left-[10%] top-[20%] w-48 h-48 rounded-full border border-white/10 glass flex items-center justify-center hover:border-gold transition-colors duration-500">
          <span className="font-playfair text-2xl text-cream/60 text-center px-4">A2 Milk</span>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute right-[15%] top-[10%] w-64 h-64 rounded-full border border-gold/20 glass flex items-center justify-center hover:border-gold transition-colors duration-500">
          <span className="font-playfair text-3xl text-gold/80 text-center px-4">Tahitian Vanilla</span>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute left-[40%] bottom-[10%] w-56 h-56 rounded-full border border-white/10 glass flex items-center justify-center hover:border-gold transition-colors duration-500">
          <span className="font-playfair text-2xl text-cream/60 text-center px-4">Single Origin Cocoa</span>
        </motion.div>
      </div>
    </section>
  );
}
