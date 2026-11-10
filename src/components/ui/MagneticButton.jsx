import { m } from 'motion/react';
import { useMagnetic } from '../../utils/animations';
import { buttonBase, buttonVariants } from './buttonStyles';
import StarBorder from './StarBorder/StarBorder';

const starColor = { primary: '#f2b35b', light: '#ffffff', ghost: '#5fd4c4' };

export default function MagneticButton({ href = '#', variant = 'primary', children }) {
  const magnetic = useMagnetic(0.35);
  const color = starColor[variant] ?? '#ffffff';
  return (
    <StarBorder
      as="span"
      color={color}
      trailColor={color}
      radius={999}
      duration={4}
      glow={0.5}
      hover="lap"
      clickPulse={false}
      backgroundColor="transparent"
      borderColor="transparent"
      style={{ padding: 3 }}
    >
      <m.a
        ref={magnetic.ref}
        href={href}
        className={`${buttonBase} ${buttonVariants[variant]}`}
        style={magnetic.style}
        {...magnetic.handlers}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </m.a>
    </StarBorder>
  );
}