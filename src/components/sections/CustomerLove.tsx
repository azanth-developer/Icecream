'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CustomerLove() {
  const testimonials = [
    { text: "The most decadent vanilla I have ever tasted. It ruins all other ice creams.", author: "Vogue Food" },
    { text: "A masterclass in texture and flavor. BOOM is setting a new global standard.", author: "Culinary Digest" },
    { text: "Absolutely phenomenal. The richness of the chocolate is unmatched.", author: "The Artisan Journal" }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full py-40 bg-background relative z-30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-6">Acclaim</h3>
          <h2 className="font-playfair text-5xl md:text-7xl">Adored by &quot;The Elite&quot;</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.2 }}
              className="glass p-10 rounded-2xl flex flex-col justify-between h-[300px] hover:bg-white/5 transition-colors duration-500"
            >
              <p className="font-playfair text-xl md:text-2xl text-cream leading-relaxed mb-8">&quot;{t.text}&quot;</p>
              <span className="font-inter text-gold uppercase tracking-widest text-sm">— {t.author}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
