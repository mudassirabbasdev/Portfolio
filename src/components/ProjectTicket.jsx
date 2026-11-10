<<<<<<< HEAD
import TiltedCard, { TiltedCardLayer } from './ui/TiltedCard/TiltedCard';
import { ExternalIcon } from './ui/Icons';

const projectImages = {
  'Verdora': '/projects/Verdora.png',
  'MSW Consultancy': '/projects/MSW.png',
  'Spotify Clone': '/projects/spotify.png',
  'Interactive Web Forms': '/projects/interactive-web-forms.png',
};

export default function ProjectTicket({ project, index }) {
  const number = String(index + 1).padStart(2, '0');
  const accent = project.colors[0];
  const image = projectImages[project.title] || projectImages['Verdora'];

  return (
    <article className="group w-full max-w-[540px]">
      <TiltedCard
        imageSrc={image}
        altText={project.title}
        captionText={project.title}
        containerWidth="540px"
        containerHeight="320px"
        imageWidth="540px"
        imageHeight="320px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        glare={0.4}
        shadow={0.5}
        radius={18}
        parallax={1.4}
        floating={false}
        intro={true}
        introDelay={index * 100}
        backContent={
          <div
            className="flex h-full flex-col justify-between p-6"
            style={{ background: `linear-gradient(135deg, #141926, ${project.colors[1]})` }}
          >
            <div>
              <span
                className="inline-flex items-center rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
              >
                No. {number} · {project.kind}
              </span>
              <h3
                className="mt-3 text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em]"
                style={{ color: accent }}
              >
                {project.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/80">
                {project.summary}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/50">Built with</p>
              <ul className="flex list-none flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[12px] font-semibold text-white"
                    style={{ borderColor: `${accent}60` }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-2 rounded-full py-2.5 font-semibold text-[#1a1407] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              Open project
              <ExternalIcon />
            </a>
          </div>
        }
      >
        <TiltedCardLayer depth={30}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span
              className="mb-2 inline-flex items-center rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
            >
              No. {number} · {project.kind}
            </span>
            <h3 className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              {project.title}
            </h3>
          </div>
        </TiltedCardLayer>
      </TiltedCard>
=======
import { useMemo, useState } from 'react';
import TearTicket from './ui/TearTicket/TearTicket';
import { ExternalIcon } from './ui/Icons';
import { ticketArt } from '../utils/ticketArt';

const TICKET = { width: 540, height: 300, stubSize: 150, radius: 18 };

function ScissorsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
    </svg>
  );
}

// One project, presented as a ticket. Body = cover art, title and summary. Stub = project number, stack and a
// "tear to open" cue. Below it: highlights plus an action row that changes once the stub has been torn off.
export default function ProjectTicket({ project, index }) {
  const [torn, setTorn] = useState(false);
  const art = useMemo(() => ticketArt(project), [project]);
  const number = String(index + 1).padStart(2, '0');
  const accent = project.colors[0];

  return (
    <article className="group w-full max-w-[540px]">
      <div className="relative">
        {/* Soft glow in the project's colours that fades in when the ticket is hovered. */}
        <div
          className="pointer-events-none absolute -inset-x-6 -inset-y-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(55% 60% at 50% 55%, ${accent}40, transparent 72%)` }}
          aria-hidden="true"
        />

        <TearTicket
          {...TICKET}
          image={art}
          imageAlt={`${project.title} cover artwork`}
          imageRadius={TICKET.radius - 8}
          torn={torn}
          onTear={() => setTorn(true)}
          ariaLabel={`Tear off the stub to open ${project.title}`}
          rotate={index % 2 === 0 ? -1.2 : 1.2}
          tiltMax={8}
          tiltReach={220}
          parallax={8}
          background="#141926"
          stubBackground="#1a2132"
          color="#ffffff"
          stub={
            <div className="flex h-full flex-col justify-between py-5 pl-[22px] pr-4 text-left">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Admit one</p>
                <p className="mt-1 font-mono text-[28px] font-bold leading-none" style={{ color: accent }}>
                  {number}
                </p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Built with</p>
                <ul className="grid list-none gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2 text-[13px] font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden="true" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: accent }}>
                <ScissorsIcon />
                Tear to open
              </p>
            </div>
          }
        >
          <div className="flex h-full flex-col justify-end gap-2 p-5 pr-6 text-left">
            <span
              className="mb-auto mt-1 inline-flex w-fit items-center rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
            >
              No. {number} · {project.kind}
            </span>
            <h3 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">{project.title}</h3>
            <p className="line-clamp-2 text-[13px] leading-[1.5] text-white/80">{project.summary}</p>
          </div>
        </TearTicket>
      </div>
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc

      <div className="mt-4 grid min-h-[84px] content-start gap-3 px-1">
        <ul className="flex list-none flex-wrap gap-2">
          {project.highlights.map((item) => (
<<<<<<< HEAD
            <li
              key={item}
              className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[13px] text-white"
            >
=======
            <li key={item} className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[13px] text-white">
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 text-[14px]">
<<<<<<< HEAD
          <ul className="flex list-none gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="text-[13px] text-white/50">
                {tag}
              </li>
            ))}
          </ul>
=======
          {torn ? (
            <button
              type="button"
              onClick={() => setTorn(false)}
              className="cursor-pointer text-soft underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
            >
              Put the stub back
            </button>
          ) : (
            <span className="text-muted">Pull the stub away to tear it off.</span>
          )}
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
<<<<<<< HEAD
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 py-2 font-semibold text-[#1a1407] shadow-[0_10px_30px_-10px_rgba(242,179,91,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: accent }}
          >
            Open project
=======
            className={
              torn
                ? 'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 py-2 font-semibold text-[#1a1407] shadow-[0_10px_30px_-10px_rgba(242,179,91,0.7)] transition-transform duration-300 hover:-translate-y-0.5'
                : 'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-teal/40 px-4 py-1.5 font-medium text-white transition-colors duration-300 hover:border-lavender hover:text-lavender'
            }
          >
            {torn ? 'Open project' : 'View on GitHub'}
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7abc88f4a54f10c5e0877ae2c1b4e1bdd13c83fc
