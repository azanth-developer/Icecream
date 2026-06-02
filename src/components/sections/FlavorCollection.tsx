'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

const flavors = [
  { name: 'Madagascar Vanilla', color: 'bg-[#F3E5AB]', desc: 'Pure, unadulterated luxury.', img: '/assets/images/vanilla.png' },
  { name: 'Belgian Chocolate', color: 'bg-[#3b2818]', desc: 'Deep, dark, and decadent.', img: '/assets/images/chocolate.png' },
  { name: 'Salted Butterscotch', color: 'bg-[#d89b4e]', desc: 'Rich ribbons of golden perfection.', img: '/assets/images/butterscotch.png' },
  { name: 'Alpine Strawberry', color: 'bg-[#913846]', desc: 'Wild sweetness kissed by frost.', img: '/assets/images/strawberry.png' }
];

export default function FlavorCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (trackRef.current && containerRef.current) {
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;
      
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth horizontal slide
        animation: gsap.to(track, {
          x: -totalScroll,
          ease: 'none'
        })
      });

      return () => {
        st.kill();
      };
    }
  }, []);

  return (
    <div className="w-full max-w-[100vw] overflow-hidden">
      <section ref={containerRef} className="w-full h-screen overflow-hidden bg-background relative z-30">
      <div className="absolute top-12 left-4 md:left-20 z-20">
        <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-4">The Collection</h3>
        <h2 className="font-playfair text-4xl md:text-5xl text-cream">Signature Flavors</h2>
      </div>
      
      <div ref={trackRef} className="flex h-full w-[400vw]">
        {flavors.map((flavor, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="w-screen h-screen flex flex-col md:flex-row items-center justify-center flex-shrink-0 relative px-6 md:px-24 gap-12 md:gap-24 pt-32 md:pt-0"
          >
            <div className={`absolute inset-0 opacity-10 ${flavor.color} blur-[150px] transform scale-150 pointer-events-none`}></div>
            
            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <h3 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-cream mb-6 drop-shadow-lg leading-tight">
                {flavor.name}
              </h3>
              <p className="font-inter font-light tracking-[0.2em] text-cream/70 uppercase text-sm md:text-base border-l border-gold/50 pl-4">
                {flavor.desc}
              </p>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center z-10">
              <div className={`w-[70vw] md:w-full max-w-[300px] md:max-w-[400px] aspect-[4/5] ${flavor.color} rounded-t-xl rounded-b-[40px] mb-12 md:mb-0 shadow-2xl relative overflow-hidden border border-white/10 opacity-90 transition-transform duration-700 hover:scale-105`}>
                <Image src={flavor.img} alt={`${flavor.name} Tub`} fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  );
}
