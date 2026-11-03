import { useRef } from 'react';
import { useSpring } from 'motion/react';

// 3D tilt that follows the pointer. Spread `handlers` and `style` on a motion element.
export default function useTilt(max = 10) {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

  const handlers = {
    onMouseMove: (e) => {
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateY.set(px * max * 2);
      rotateX.set(-py * max * 2);
    },
    onMouseLeave: () => {
      rotateX.set(0);
      rotateY.set(0);
    },
  };

  return { ref, style: { rotateX, rotateY, transformPerspective: 900 }, handlers };
}
