import CanvasBackground from './CanvasBackground';
import ShapeGrid from './reactbits/ShapeGrid';
import DotGrid from './reactbits/DotGrid';
import DotField from './reactbits/DotField';
import RippleGrid from './reactbits/RippleGrid';
import { galaxyScene } from '../../utils/animations';

// Demo options for the hero background. Pick one, then delete the rest.
export const heroBackgrounds = [
  { name: 'Galaxy (original)', render: () => <CanvasBackground scene={galaxyScene} /> },
  {
    name: 'Shape Grid',
    render: () => (
      <ShapeGrid shape="square" direction="diagonal" lineColor="#232a3a" hoverColor="#5fd4c4" hoverFillColor="#5fd4c4" fillOpacity={0.15} cellSize={44} speed={0.4} />
    ),
  },
  {
    name: 'Dot Grid',
    render: () => (
      <DotGrid baseColor="#2a3144" activeColor="#5fd4c4" shape="circle" dotSize={5} gap={18} proximity={140} glow={0.5} fade={0.3} />
    ),
  },
  {
    name: 'Dot Field',
    render: () => (
      <DotField gradientFrom="#5fd4c4" gradientTo="#c4a6ff" dotRadius={1.5} dotSpacing={14} cursorRadius={240} bulgeStrength={0.6} glowRadius={160} />
    ),
  },
  {
    name: 'Ripple Grid',
    render: () => <RippleGrid color="#5fd4c4" cellSize={48} rippleStrength={1} autoRipple="center" />,
  },
];

export default function HeroBackground({ index }) {
  const option = heroBackgrounds[index] ?? heroBackgrounds[0];
  // key forces a clean remount (new canvas / WebGL context) on every switch
  return <div key={option.name} className="absolute inset-0">{option.render()}</div>;
}
