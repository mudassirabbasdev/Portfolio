import { m } from 'motion/react';
import Section from './Section';
import MagneticButton from './ui/MagneticButton';
import { gradientText } from './ui/SectionHeading';
import { profile } from '../data/portfolio';
import { fadeUp, stagger, zoomIn, useTilt } from '../utils/animations';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

// Floating tech badges. Each one bobs at its own speed so the group never moves in lockstep.
const badgeClass =
  'absolute z-[3] grid justify-items-center gap-1.5 min-w-[clamp(72px,10svh,104px)] px-[clamp(10px,2svh,18px)] py-[clamp(8px,1.8svh,16px)] rounded-2xl bg-ink/[0.86] border border-line text-[clamp(0.7rem,1.8svh,0.9rem)] font-bold text-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] [&_svg]:w-[clamp(20px,3.6svh,30px)] [&_svg]:h-[clamp(20px,3.6svh,30px)]';

function TechBadge({ pos, delay = 0, children }) {
  return (
    <div
      className={`${badgeClass} ${pos} animate-float`}
      style={{ '--float-y': '-10px', animationDuration: '5s', animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function HeroVisual() {
  const tilt = useTilt(6);

  return (
    <m.div
      ref={tilt.ref}
      style={tilt.style}
      {...tilt.handlers}
      variants={zoomIn}
      className="relative w-[min(520px,100%,calc(70svh*0.9))] aspect-[9/10] justify-self-end [perspective:900px] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:justify-self-center [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:w-auto [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:aspect-[0.9] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:min-h-[30svh]"
    >
      {/* Orbit path behind the arch */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="fill-none stroke-lavender/35 [stroke-width:1.2] [stroke-dasharray:6_10] animate-orbit"
          d="M30 330 C 20 120, 180 40, 330 150 C 400 230, 395 420, 360 560"
        />
      </svg>

      {/* Handwritten annotation and arrow */}
      <span className="absolute left-[2%] top-0 z-[2] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:hidden font-hand text-[clamp(1.1rem,3.8svh,2.1rem)] leading-[1.02] text-white -rotate-6" aria-hidden="true">
        Code
        <br />
        Design
        <br />
        Build
        <br />
        <span className="inline-block ml-3.5">Repeat</span>
      </span>
      <svg className="absolute left-[22%] top-[2%] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:hidden w-[28%] h-[16%] z-[2] fill-none stroke-white/75 [stroke-width:1.6] [stroke-linecap:round]" viewBox="0 0 120 80" aria-hidden="true">
        <path d="M6 40 C 40 10, 80 14, 102 58" />
        <path d="M92 50 L102 60 L110 46" />
      </svg>

      <div className="absolute left-[16%] right-[16%] top-[12%] bottom-0 rounded-t-full flex flex-col items-center justify-center gap-[clamp(6px,2svh,18px)] bg-[linear-gradient(180deg,rgba(196,166,255,0.22)_0%,rgba(14,18,30,0.92)_55%)] border-2 border-lavender/75 shadow-[0_0_70px_-12px_rgba(196,166,255,0.55),inset_0_0_40px_rgba(196,166,255,0.08)]">
        <img
          src="/mudassir.webp"
          alt={profile.name}
          width="328"
          height="412"
          className="w-[88%] max-h-[78%] object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] -mt-6"
          draggable="false"
          decoding="async"
          fetchpriority="high"
        />
        <span className="font-mono text-[clamp(0.7rem,1.7svh,0.9rem)] text-soft">{`<${profile.handle} />`}</span>
      </div>

      <div className="absolute top-0 right-[4%] z-[2] w-[clamp(36px,6.4svh,52px)] h-[clamp(36px,6.4svh,52px)] rounded-[14px] grid place-items-center text-white bg-ink/80 border border-line" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
        </svg>
      </div>

      <TechBadge pos="-left-[2%] top-[46%]" delay={0}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#61dafb" strokeWidth="1.4" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
        </svg>
        <span>React</span>
      </TechBadge>

      <TechBadge pos="-right-[2%] top-[22%]" delay={1.2}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
          <polygon points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7" stroke="#7bc96f" strokeWidth="1.4" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#7bc96f">JS</text>
        </svg>
        <span>Node.js</span>
      </TechBadge>

      <TechBadge pos="right-0 bottom-[12%]" delay={2.4}>
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path d="M12 2C9 6 7 9 7.5 14 8 17.5 10.5 20 12 22 13.5 20 16 17.5 16.5 14 17 9 15 6 12 2Z" fill="#4db33d" />
          <path d="M12 6v16" stroke="#2f7d32" strokeWidth="1" />
        </svg>
        <span>MongoDB</span>
      </TechBadge>
    </m.div>
  );
}


export default function Hero() {
  return (
    <Section
      id="top"
      screen={false}
    >
      <m.div
        className="grid w-full min-h-0 grid-cols-[1.05fr_0.95fr] grid-rows-[minmax(0,1fr)] gap-[clamp(16px,4svh,48px)_48px] items-center [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:grid-cols-1 [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:grid-rows-[auto_minmax(0,1fr)] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:gap-[clamp(8px,2svh,24px)]"
        variants={stagger(0.2, 0.14)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-[640px] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:max-w-full">
          <m.span
            className="inline-flex items-center gap-2.5 mb-[clamp(8px,2.6svh,28px)] px-[18px] py-[clamp(6px,1.2svh,10px)] rounded-full text-[clamp(0.8rem,1.9svh,0.95rem)] text-white bg-ink/70 border border-teal/35"
            variants={fadeUp}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse-dot" aria-hidden="true" />
            {profile.badge}
          </m.span>

          <m.p className="text-[clamp(1rem,2.8svh,1.35rem)] font-semibold text-white mb-[clamp(2px,1svh,10px)]" variants={fadeUp}>
            Hi, I'm {profile.name}
          </m.p>

          <m.h1
            className="font-sans font-extrabold text-[clamp(1.6rem,min(4.6vw,8svh),3.9rem)] leading-[1.04] tracking-[-0.025em] mb-[clamp(10px,3svh,26px)]"
            variants={fadeUp}
          >
            <span className="block pb-[0.12em] text-white">I Build Modern Web</span>
            <span className={`block pb-[0.12em] ${gradientText}`}>Experiences</span>
          </m.h1>

          <m.p className="text-[clamp(1rem,0.5vw+0.8rem,1.125rem)] leading-[1.6] text-white max-w-[52ch] mb-[clamp(12px,4svh,40px)]" variants={fadeUp}>
            {profile.intro}
          </m.p>

          <m.div className="flex flex-wrap gap-[clamp(8px,2svh,16px)]" variants={fadeUp}>
            <MagneticButton href="#projects">
              View My Projects <ArrowIcon />
            </MagneticButton>
            {/* Only shown once a real file is set in data/portfolio.js (resume: '/resume.pdf'); '#' would just scroll to the top. */}
            {profile.resume && profile.resume !== '#' && (
              <MagneticButton href={profile.resume} variant="ghost">
                Download Resume <DownloadIcon />
              </MagneticButton>
            )}
          </m.div>
        </div>

        <HeroVisual />
      </m.div>
    </Section>
  );
}
