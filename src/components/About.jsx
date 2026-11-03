import { m } from 'motion/react';
import Section from './Section';
import Reveal from './ui/Reveal';
import MagneticButton from './ui/MagneticButton';
import StarCard from './ui/StarCard';
import { gradientText } from './ui/SectionHeading';
import { aboutText, infoCards } from '../data/portfolio';
import { fadeUp, fadeRight, bounceIn, stagger, viewportOnce } from '../utils/animations';

const iconPaths = {
  pin: (
    <>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
};

// Icon tile colours: tinted background with a matching foreground.
const toneClass = {
  blue: 'bg-sky-400/[0.14] text-sky-300',
  purple: 'bg-violet-400/[0.16] text-violet-300',
  pink: 'bg-pink-400/[0.14] text-pink-300',
  green: 'bg-emerald-400/[0.14] text-emerald-300',
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function About() {
  return (
    <Section id="about">
      {/* Two columns that both start at the top: story on the left (badge, heading, copy, buttons), info cards on the right. */}
      <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-x-[clamp(32px,5vw,64px)] gap-y-[clamp(20px,4svh,40px)] max-[900px]:grid-cols-1">
        <div className="relative max-w-[640px]">
          <m.div
            className="mb-[clamp(12px,3svh,36px)]"
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <m.span
              className="inline-flex items-center gap-2.5 mb-[clamp(8px,2.2svh,24px)] px-5 py-[clamp(5px,1.2svh,10px)] rounded-full text-[clamp(0.7rem,1.7svh,0.85rem)] font-semibold tracking-[0.14em] uppercase text-white bg-lavender/10 border border-lavender/35"
              variants={fadeUp}
            >
              <PersonIcon />
              About me
            </m.span>

            <m.h2
              className="font-sans font-extrabold text-[clamp(1.7rem,min(3.8vw,6.6svh),3.4rem)] leading-[1.1] tracking-[-0.025em]"
              variants={fadeUp}
            >
              <span className="block pb-[0.12em] text-white">Frontend first.</span>
              <span className={`block pb-[0.12em] ${gradientText}`}>Full-stack in progress.</span>
            </m.h2>
          </m.div>

          <Reveal variant={fadeRight}>
            <p className="text-[clamp(1rem,0.45vw+0.85rem,1.125rem)] leading-[1.7] text-white/85 mb-[clamp(8px,2.2svh,20px)]">
              {aboutText.intro.before}
              <strong className="text-white font-semibold">{aboutText.intro.highlight}</strong>
              {aboutText.intro.after}
            </p>
            <p className="text-[clamp(1rem,0.45vw+0.85rem,1.125rem)] leading-[1.7] text-white/85">{aboutText.goal}</p>
          </Reveal>

          <Reveal variant={fadeUp} delay={0.2} className="flex flex-wrap gap-[clamp(8px,2svh,16px)] mt-[clamp(14px,3.2svh,36px)]">
            <MagneticButton href="#contact" variant="light">
              Let's work together
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              See my work
            </MagneticButton>
          </Reveal>
        </div>

        <m.div
          className="grid grid-cols-2 gap-[clamp(8px,2.4svh,22px)]"
          variants={stagger(0.15, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {infoCards.map((card, i) => (
            <StarCard key={card.label} variant={bounceIn} max={7} color="#c4a6ff" radius={22} padding="clamp(12px,2.6svh,26px)" gap="clamp(6px,1.4svh,14px)" minHeight="clamp(110px,22svh,200px)">
              <span
                className={`w-[clamp(34px,6svh,52px)] h-[clamp(34px,6svh,52px)] rounded-[14px] grid place-items-center animate-float ${toneClass[card.tone]}`}
                style={{ '--float-y': '-4px', animationDuration: '3.2s', animationDelay: `${i * 0.4}s` }}
              >
                <Icon name={card.icon} />
              </span>
              <span className="mt-auto tracking-[0.16em] uppercase text-muted text-[clamp(0.65rem,1.6svh,0.85rem)]">{card.label}</span>
              <span className="font-bold text-white leading-[1.3] text-[clamp(0.8rem,2svh,1.05rem)]">{card.value}</span>
            </StarCard>
          ))}
        </m.div>
      </div>
    </Section>
  );
}
