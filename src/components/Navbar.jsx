import { useEffect, useState } from 'react';
import PillNav from './ui/PillNav/PillNav';
import { BrandIcon } from './ui/Icons';
import { profile } from '../data/portfolio';

const links = [
  ['#top', 'Home'],
  ['#about', 'About'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#contact', 'Contact'],
];

const items = links.map(([href, label]) => ({ href, label }));

const socials = [
  { label: 'GitHub', href: profile.github, icon: 'github' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
];

export default function Navbar() {
  const [active, setActive] = useState('#top');
  const [scrolled, setScrolled] = useState(false);

  // Mark the link of whichever section crosses the middle of the viewport.
  useEffect(() => {
    const sections = links.map(([href]) => document.getElementById(href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { rootMargin: '-45% 0px -54% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Solid black header background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // The header ignores the pointer so the page underneath stays clickable; only the nav and the social buttons opt back in.
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 py-[clamp(10px,2svh,20px)] transition-colors duration-300 ${
        scrolled ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container-x relative">

        {/* Logo inside PillNav — far left */}
        <div className="pointer-events-auto absolute left-0 top-0 flex h-[52px] items-center">
          <PillNav
            logo={<img src="/logo-small.webp" alt="" width="128" height="70" draggable={false} />}
            logoAlt={`${profile.name} home`}
            logoHref="#top"
            items={[]}
            activeHref={active}
            ariaLabel="Logo"
            size="lg"
            layout="split"
            surface="glass"
            barColor="rgba(10, 13, 20, 0.72)"
            className="pointer-events-auto [&_.pill-nav\_\_bar]:hidden [&_.pill-nav\_\_rim]:hidden"
            style={{ '--pn-mark': '38px' }}
          />
        </div>

        {/* Nav links pill — centered */}
        <div className="flex justify-center">
          <PillNav
            items={items}
            activeHref={active}
            ariaLabel="Main"
            size="lg"
            layout="split"
            itemStyle="plain"
            hoverEffect="glide"
            indicator="pill"
            surface="glass"
            barColor="rgba(10, 13, 20, 0.72)"
            textColor="#ffffff"
            highlightColor="#c4a6ff"
            className="pointer-events-auto"
            style={{ '--pn-mark': '38px' }}
          />
        </div>

        {/* Social icons — far right */}
        <div className="pointer-events-auto absolute right-0 top-0 flex h-[52px] items-center gap-2 max-lg:hidden">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="grid h-[44px] w-[44px] place-items-center rounded-full border border-white/10 bg-ink/70 text-white backdrop-blur-[20px] transition-[transform,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-lavender hover:text-lavender"
            >
              <BrandIcon name={item.icon} />
            </a>
          ))}
        </div>

      </div>
    </header>
  );
}