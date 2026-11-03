import { techStack } from '../data/techStack';

// Infinite logo strip. The list is rendered twice so the -50% translate loops seamlessly.
function MarqueeList({ hidden = false }) {
  return (
    <ul className="flex gap-14 pr-14 list-none" aria-hidden={hidden || undefined}>
      {techStack.map((item) => (
        <li key={`${item.name}-${hidden ? 'b' : 'a'}`} className="inline-flex items-center gap-2.5 text-muted whitespace-nowrap transition-colors duration-300 hover:text-white">
          <svg viewBox={item.viewBox} width="24" height="24" fill={item.color} aria-hidden="true">
            <path d={item.path} />
          </svg>
          <span className="text-[0.95rem] font-medium">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TechMarquee() {
  return (
    <section className="group relative z-[2] py-[clamp(10px,2.4svh,28px)] shrink-0 border-y border-line bg-white/[0.02]" aria-label="Technologies I work with">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          <MarqueeList />
          <MarqueeList hidden />
        </div>
      </div>
    </section>
  );
}
