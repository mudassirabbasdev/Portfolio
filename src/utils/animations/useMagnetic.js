import { useRef } from 'react';
import { useSpring } from 'motion/react';

// Pulls an element slightly toward the cursor. Good for primary buttons.
// `max` caps the shift in px so neighbouring buttons never overlap.
export default function useMagnetic(strength = 0.3, max = 6) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  const clamp = (v) => Math.max(-max, Math.min(max, v));

  const handlers = {
    onMouseMove: (e) => {
      const r = ref.current.getBoundingClientRect();
      x.set(clamp((e.clientX - r.left - r.width / 2) * strength));
      y.set(clamp((e.clientY - r.top - r.height / 2) * strength));
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  return { ref, style: { x, y }, handlers };
}