import { m } from 'motion/react';
import { useTilt } from '../../utils/animations';

// A card that tilts toward the pointer. Pass a variant to animate it in as part of a stagger group.
export default function TiltCard({ variant, className = '', max = 8, children, ...rest }) {
  const tilt = useTilt(max);
  return (
    <m.article
      ref={tilt.ref}
      style={tilt.style}
      {...tilt.handlers}
      variants={variant}
      className={className}
      {...rest}
    >
      {children}
    </m.article>
  );
}
