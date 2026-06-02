'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VideoSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scaleContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const scaleContainer = scaleContainerRef.current;
    if (!video || !scaleContainer) return;

    let st: ScrollTrigger | null = null;

    const initAnimation = () => {
      if (!video) return;
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

          // Apply dynamic zoom
          gsap.set(scaleContainer, {
            scale: 1.0 + (progress * 0.3)
          });
        }
      });
    };

    // Preload video as a blob to prevent network buffering during scrubbing
    const fetchVideoBlob = async () => {
      try {
        const response = await fetch('/assets/video.mp4');
        const reader = response.body?.getReader();
        const contentLength = +(response.headers.get('Content-Length') || '7000000');
        
        let receivedLength = 0;
        const chunks = [];
        
        if (reader) {
          while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            chunks.push(value);
            receivedLength += value.length;
            setLoadProgress(Math.round((receivedLength / contentLength) * 100));
          }
          const blob = new Blob(chunks, { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          
          if (video) {
            video.src = url;
            video.load();
            if (video.readyState >= 1) {
              initAnimation();
            } else {
              video.onloadedmetadata = () => {
                initAnimation();
              };
            }
          }
        }
      } catch (err) {
        console.error("Failed to preload video:", err);
        // Fallback to streaming if blob fetch fails
        if (video) {
          video.src = '/assets/video.mp4';
          video.load();
          if (video.readyState >= 1) {
            initAnimation();
          } else {
            video.onloadedmetadata = () => initAnimation();
          }
        }
      }
    };

    fetchVideoBlob();

    return () => {
      st?.kill();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] z-50">
          <div className="text-cream/70 font-inter tracking-[0.3em] text-sm md:text-base mb-4">
            BUFFERING LUXURY EXPERIENCE
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      )}
      <div ref={scaleContainerRef} className="w-full h-full origin-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
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
