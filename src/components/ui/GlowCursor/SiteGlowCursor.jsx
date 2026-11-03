import { useEffect, useState } from 'react';
import GlowCursor from './GlowCursor';

// Page-wide glow that follows the mouse. It is a fixed, click-through layer above the content, so links,
// buttons and the projects gallery keep working underneath it. Colours match the site's teal-to-lavender accent.
// Only mounted for devices with a real mouse (hover + fine pointer); touch screens skip it entirely.
const MOUSE_QUERY = '(hover: hover) and (pointer: fine)';

export default function SiteGlowCursor() {
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOUSE_QUERY);
    const sync = () => setMouse(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (!mouse) return null;

  return (
    <GlowCursor
      color="#c4a6ff"
      secondaryColor="#5fd4c4"
      intensity={1.2}
      trailWidth={3}
      linger={1.4}
      glow={1.2}
      hotspot={0.8}
      followSpeed={0.6}
      clickBurst
      quality="high"
      theme="dark"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 60, pointerEvents: 'none' }}
    />
  );
}
