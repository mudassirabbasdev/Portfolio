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

      <div className="mt-4 grid min-h-[84px] content-start gap-3 px-1">
        <ul className="flex list-none flex-wrap gap-2">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[13px] text-white"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 text-[14px]">
          <ul className="flex list-none gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="text-[13px] text-white/50">
                {tag}
              </li>
            ))}
          </ul>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 py-2 font-semibold text-[#1a1407] shadow-[0_10px_30px_-10px_rgba(242,179,91,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: accent }}
          >
            Open project
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
}