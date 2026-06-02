'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParticlesAndEffects() {
  const { scrollYProgress } = useScroll();
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; scale: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random particles for the gold dust effect
    const p = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 5
      });
    }
    setParticles(p);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, -300]);

  return (
    <motion.div 
      style={{ opacity, y: yOffset }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-20, -150],
            x: Math.random() * 60 - 30
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
          className="absolute rounded-full bg-gold-light blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.scale * 6}px`,
            height: `${particle.scale * 6}px`,
            boxShadow: '0 0 12px 3px rgba(212, 175, 55, 0.7)'
          }}
        />
      ))}
    </motion.div>
  );
}
