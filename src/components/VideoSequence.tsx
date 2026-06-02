'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VideoSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scaleContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const scaleContainer = scaleContainerRef.current;
    if (!video || !scaleContainer) return;

    let st: ScrollTrigger | null = null;

    const initAnimation = () => {
      const duration = video.duration;
      if (!duration) return;

      setIsReady(true);
      ScrollTrigger.refresh();

      st = ScrollTrigger.create({
        trigger: '#hero-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Lenis provides the physical momentum
        onUpdate: (self) => {
          if (!video.duration) return;
          const progress = self.progress;
          const targetTime = progress * video.duration;
          
          // Throttle updates to prevent decoder thrashing
          if (Math.abs(video.currentTime - targetTime) > 0.01) {
            video.currentTime = targetTime;
          }

          // Apply dynamic zoom as requested (camera gets closer to product)
          gsap.set(scaleContainer, {
            scale: 1.0 + (progress * 0.3)
          });
        }
      });
    };

    video.load();
    if (video.readyState >= 1) { // HAVE_METADATA or better
      initAnimation();
    } else {
      video.addEventListener('loadedmetadata', initAnimation);
    }

    return () => {
      video.removeEventListener('loadedmetadata', initAnimation);
      st?.kill();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-cream/50 font-inter tracking-[0.3em] text-sm md:text-base z-50 bg-[#0A0A0A]">
          LOADING 8K EXPERIENCE...
        </div>
      )}
      <div ref={scaleContainerRef} className="w-full h-full origin-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/assets/video.mp4"
          preload="auto"
          muted
          playsInline
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      </div>
    </div>
  );
}
