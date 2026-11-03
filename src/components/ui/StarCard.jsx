import TiltCard from './TiltCard';
import StarBorder from './StarBorder/StarBorder';

// Card with the tilt + reveal animation of TiltCard and a travelling-star border (StarBorder).
// StarBorder.css is unlayered, so layout overrides go through `style`, not Tailwind classes.
export default function StarCard({
  variant,
  max = 6,
  color = '#5fd4c4',
  radius = 20,
  padding = 28,
  gap = 0,
  minHeight,
  children,
}) {
  return (
    <TiltCard variant={variant} max={max} className="h-full">
      <StarBorder
        as="div"
        color={color}
        trailColor={color}
        radius={radius}
        duration={5}
        glow={0.5}
        hover="lap"
        clickPulse={false}
        backgroundColor="rgba(10, 13, 20, 0.72)"
        textColor="#ffffff"
        borderColor="rgba(255, 255, 255, 0.12)"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          textAlign: 'left',
          fontWeight: 'inherit',
          padding,
          gap,
          minHeight,
        }}
      >
        {children}
      </StarBorder>
    </TiltCard>
  );
}
