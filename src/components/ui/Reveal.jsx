import { m } from 'motion/react';
import { fadeUp, viewportOnce } from '../../utils/animations';

// Animates its children in once they scroll into view. `variant` is any variant from utils/animations.
export default function Reveal({ variant = fadeUp, delay = 0, className = '', children, ...rest }) {
  const withDelay = {
    hidden: variant.hidden,
    show: { ...variant.show, transition: { ...variant.show.transition, delay } },
  };
  return (
    <m.div
      className={className}
      variants={withDelay}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </m.div>
  );
}
