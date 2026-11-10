import { lazy, Suspense } from 'react';
import Section from './Section';
import Reveal from './ui/Reveal';
import { gradientText } from './ui/SectionHeading';
import useAfterIdle from '../utils/useAfterIdle';
import ProjectTicket from './ProjectTicket';
import { projects } from '../data/portfolio';

// The animated headline pulls in GSAP, so it loads as its own chunk once the page is idle. Until then (and for anyone
// without JavaScript) a plain heading of the same size and gradient sits in its place, so nothing jumps when it swaps in.
const MaskedHeading = lazy(() => import('./ui/MaskedHeading/MaskedHeading'));

function StaticHeading() {
  return <h2 className={`font-extrabold leading-[1.06] tracking-[-0.03em] text-[clamp(20px,13cqw,200px)] ${gradientText}`}>My Projects</h2>;
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
    </svg>
  );
}

export default function Projects() {
  const headingReady = useAfterIdle(2500);

  return (
    <Section id="projects">
      <Reveal className="mb-[clamp(24px,5svh,56px)] max-w-[720px]">
        <span className="mb-[clamp(8px,2svh,20px)] inline-flex items-center gap-2.5 rounded-full border border-lavender/35 bg-lavender/10 px-5 py-[clamp(5px,1.2svh,10px)] text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white">
          <SparkIcon />
          Selected work
        </span>

        {/* The letters are cut out of a moving gradient texture (public/headline-texture.svg). */}
        {/* One wrapper owns the spacing for both versions of the headline, so swapping them never moves the page.
            (The margin must live here: MaskedHeading's own CSS sets margin: 0 and would override a Tailwind margin class.) */}
<<<<<<< HEAD
        <div className="mb-[clamp(12px,3svh,36px))] [container-type:inline-size]">
=======
        <div className="mb-[clamp(24px,3.8svh,38px)] [container-type:inline-size]">
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc
          {headingReady ? (
            <Suspense fallback={<StaticHeading />}>
              <MaskedHeading
                text="My Projects"
                src="/headline-texture.svg"
                reveal="scale"
                trigger="view"
                align="left"
                weight={800}
<<<<<<< HEAD
                textScale={0.050}
                fillScale={1.6}
=======
                textScale={0.13}
                fillScale={1.4}
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc
                parallax={30}
                drift={22}
                hoverZoom={0.06}
                outline
                outlineColor="rgba(255,255,255,0.3)"
                outlineWidth={1}
                className="text-white"
              />
            </Suspense>
          ) : (
            <StaticHeading />
          )}
        </div>

        <p className="max-w-[60ch] text-[clamp(0.95rem,0.35vw+0.85rem,1.1rem)] leading-[1.55] text-white/80">
          A few products I have designed and shipped, from first sketch to production. Pull a ticket's stub to tear it off
          and open the project.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 justify-items-center gap-x-[clamp(24px,4vw,56px)] gap-y-[clamp(28px,5svh,56px)] max-[900px]:grid-cols-1">
        {projects.map((project, index) => (
          <Reveal key={project.title} className="flex w-full justify-center" delay={(index % 2) * 0.12}>
            <ProjectTicket project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
