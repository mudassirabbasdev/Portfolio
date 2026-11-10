// Shared Framer Motion variants. Import these instead of re-writing timings per component.
export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -72 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 72 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.86 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

export const flipIn = {
  hidden: { opacity: 0, rotateY: -80 },
  show: { opacity: 1, rotateY: 0, transition: { duration: 1, ease } },
};

export const bounceIn = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 16 } },
};

// Mask reveal for headline lines (the parent .line span has overflow: hidden).
export const lineUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease } },
};

export const stagger = (delayChildren = 0.1, staggerChildren = 0.12) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

// Card entrance with a slight tilt-in from above. Used for skill cards.
export const cardIn = {
  hidden: { opacity: 0, y: 44, rotateX: -14 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, ease } },
};

// Shared scroll-trigger setting for whileInView. The 80px bottom margin starts the entrance just before an element
// reaches the bottom edge, so buttons and cards sitting right at the fold on short screens never stay hidden.
export const viewportOnce = { once: true, amount: 'some', margin: '0px 0px 80px 0px' };
