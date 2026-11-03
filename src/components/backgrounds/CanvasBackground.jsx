import { useCanvasLoop } from '../../utils/animations';

// Generic canvas background. Pass any scene factory from utils/animations/scenes.js.
export default function CanvasBackground({ scene }) {
  const canvasRef = useCanvasLoop(scene);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
