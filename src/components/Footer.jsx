import { profile, footer } from '../data/portfolio';
import { BrandIcon, MailIcon, PinIcon } from './ui/Icons';

export default function Footer() {
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');
  const year = new Date().getFullYear();

  const socials = [
    { label: 'GitHub', href: profile.github, icon: 'github' },
    { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
    { label: 'X', href: profile.x, icon: 'x' },
    { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  ].filter((s) => s.href && s.href !== '#'); // hide placeholder links instead of rendering dead icons

  return (
    <footer className="relative z-[1] overflow-hidden pt-[72px] border-t border-line [background:radial-gradient(ellipse_at_20%_0%,rgba(196,166,255,0.14),transparent_55%)]">
      <div className="container-x grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 max-[900px]:grid-cols-2 max-[900px]:gap-10 max-[560px]:grid-cols-1">
        <div>
          <div className="flex items-center gap-3.5 mb-[22px]">
            <img src="/logo-small.webp" alt="" className="h-9 w-auto" width="66" height="36" aria-hidden="true" />
            <span className="font-bold text-xl">
              {firstName} <span className="text-lavender">{lastName}</span>
            </span>
          </div>
          <p className="text-white max-w-[34ch] mb-7 leading-[1.8]">{footer.tagline}</p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-[46px] h-[46px] rounded-[14px] grid place-items-center text-white bg-white/[0.04] border border-line transition-[transform,border-color,color] duration-300 hover:-translate-y-[3px] hover:border-lavender hover:text-lavender"
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lavender tracking-[0.2em] uppercase font-bold mb-[22px]">Navigate</h4>
          <ul className="list-none grid gap-3.5 text-white">
            {footer.navigate.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors duration-300 hover:text-lavender hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lavender tracking-[0.2em] uppercase font-bold mb-[22px]">What I do</h4>
          <ul className="list-none grid gap-3.5 text-white">
            {footer.services.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lavender tracking-[0.2em] uppercase font-bold mb-[22px]">Get in touch</h4>
          <ul className="list-none grid gap-3.5 text-white [&_svg]:shrink-0">
            <li className="flex items-center gap-3">
              <MailIcon />
              <a href={`mailto:${profile.email}`} className="transition-colors duration-300 hover:text-white">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PinIcon />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-3 text-emerald-300">
              <span className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse-dot" aria-hidden="true" />
              {footer.status}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-[72px] text-center whitespace-nowrap select-none pointer-events-none font-extrabold text-[clamp(2.4rem,10.5vw,9rem)] leading-none tracking-[-0.04em] text-white/[0.045]" aria-hidden="true">
        {profile.name.toUpperCase()}
      </div>

      <div className="container-x">
        <div className="mt-10 py-6 border-t border-line text-muted text-[0.9rem] text-center">
          © {year} {profile.name}. Built with React and Motion.
        </div>
      </div>
    </footer>
  );
}
