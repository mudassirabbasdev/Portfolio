import { useEffect, useRef } from 'react';

// Runs a canvas "scene" every frame. A scene is created once per size:
//   createScene(width, height) => (ctx, time, pointer, width, height) => void
// `pointer` is normalised to -1..1 across the parent element.
// Respects prefers-reduced-motion by drawing a single static frame.
export default function useCanvasLoop(createScene) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, active: false };
    const start = performance.now();
    let scene = null;
    let width = 0;
    let height = 0;
    let raf = 0;

    const draw = (now) => {
      if (!scene) return;
      ctx.clearRect(0, 0, width, height);
      scene(ctx, (now - start) / 1000, pointer, width, height);
    };

    const loop = (now) => {
      draw(now);
      if (!reduceMotion) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene = createScene(width, height);
      if (reduceMotion) draw(performance.now());
    };

    const onPointer = (e) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1;
      pointer.active = true;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener('pointermove', onPointer);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, [createScene]);

  return canvasRef;
}
