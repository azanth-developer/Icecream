'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '100%', label: 'Natural Ingredients' },
  { value: '0%', label: 'Artificial Preservatives' },
  { value: '50+', label: 'Global Awards' }
];

export default function WhyBoom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-32 bg-background relative z-30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="flex flex-col items-center"
            >
              <h4 className="font-playfair text-7xl md:text-8xl text-gold mb-4">{stat.value}</h4>
              <p className="font-inter tracking-[0.2em] uppercase text-cream/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
