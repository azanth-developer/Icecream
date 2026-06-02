'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // The newly extracted high-res sequence has 192 frames
  const FRAME_COUNT = 192;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    let firstFrameLoaded = false;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      // Pointing to the new, natively extracted high-res frames
      img.src = `/assets/high_res_sequence/frame-${frameNum}.jpg`;
      loadedImages.push(img);
      
      const onImageReady = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        
        // Render first frame immediately so screen isn't blank
        if (i === 1 && !firstFrameLoaded) {
          firstFrameLoaded = true;
          setImagesLoaded(true); // Remove loader immediately
          renderFrame(0, 1);
        }

        if (loadedCount === FRAME_COUNT) {
          initAnimation();
        }
      };

      img.onload = onImageReady;
      img.onerror = onImageReady; // Prevent hanging on missing frames
    }

    const renderFrame = (index: number, scaleFactor: number) => {
      // Ensure index is within bounds
      const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      const img = loadedImages[safeIndex];
      
      // If image is missing, corrupted, or not loaded, skip drawing to keep previous frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        return; 
      }

      const logicalWidth = window.innerWidth;
      const logicalHeight = window.innerHeight;
      
      context.fillStyle = '#0A0A0A';
      context.fillRect(0, 0, logicalWidth, logicalHeight);
      
      const canvasRatio = logicalWidth / logicalHeight;
      // Use naturalWidth instead of width for reliable ratio calculation
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      // Native High Quality Render scaling
      if (canvasRatio > imgRatio) {
        drawWidth = logicalWidth * scaleFactor;
        drawHeight = (logicalWidth / imgRatio) * scaleFactor;
      } else {
        drawHeight = logicalHeight * scaleFactor;
        drawWidth = (logicalHeight * imgRatio) * scaleFactor;
      }
      
      offsetX = (logicalWidth - drawWidth) / 2;
      offsetY = (logicalHeight - drawHeight) / 2;

      try {
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } catch (e) {
        console.error("Canvas drawImage error", e);
      }
    };

    const state = { frame: 0, scale: 1 };

    const handleResize = () => {
      const logicalWidth = window.innerWidth;
      const logicalHeight = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      canvas.width = logicalWidth * pixelRatio;
      canvas.height = logicalHeight * pixelRatio;
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;
      
      context.scale(pixelRatio, pixelRatio);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      renderFrame(Math.floor(state.frame), state.scale);
    };

    let reqId: number;

    const initAnimation = () => {
      window.addEventListener('resize', handleResize);
      handleResize(); 

      const tick = () => {
        renderFrame(Math.floor(state.frame), state.scale);
        reqId = requestAnimationFrame(tick);
      };
      tick();

      ScrollTrigger.create({
        trigger: '#hero-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Lenis handles the smoothing
        onUpdate: (self) => {
          state.frame = (FRAME_COUNT - 1) * self.progress;
          state.scale = 1.0 + (self.progress * 0.3); // Zoom from 1.0x to 1.3x
        }
      });
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-50">
          <div className="text-cream/50 font-inter font-light tracking-[0.3em] text-sm md:text-base">
            LOADING LUXURY EXPERIENCE {loadProgress}%
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </>
  );
}
