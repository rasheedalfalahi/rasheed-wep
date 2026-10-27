import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return null;
  
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    duration: 0.75,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.15,
    touchMultiplier: 1,
    syncTouch: false,
    infinite: false,
  });

  let rafId: number;
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return () => {
    lenisInstance?.destroy();
    cancelAnimationFrame(rafId);
    lenisInstance = null;
  };
};

export const getLenis = () => lenisInstance;
