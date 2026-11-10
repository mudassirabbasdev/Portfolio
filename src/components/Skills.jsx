import { m } from 'motion/react';
import Section from './Section';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import StarCard from './ui/StarCard';
import CountUp from './ui/CountUp';
import { skills, tools } from '../data/portfolio';
import { bounceIn, cardIn, stagger, ease, viewportOnce } from '../utils/animations';

export default function Skills() {
  return (
  <Section id="skills" className="!pt-[calc(var(--nav-h)+clamp(4px,0.5svh,8px))] !pb-[clamp(4px,0.5svh,8px)]"> 
      <Reveal className="mb-[clamp(10px,3.6svh,48px)]">
        <SectionHeading lead="Skills and" accent="tools" />
        <p className="text-white/80 max-w-[52ch] text-[clamp(0.95rem,0.35vw+0.85rem,1.1rem)] leading-[1.5]">Where I spend most of my time, and how confident I feel in each area.</p>
      </Reveal>

      <m.div
        className="grid grid-cols-3 gap-[clamp(8px,2.4svh,24px)_24px] mb-[clamp(10px,4svh,56px)] [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:grid-cols-1"
        variants={stagger(0.1, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {skills.map((group) => (
          <StarCard key={group.name} variant={cardIn} max={5} color="#5fd4c4" radius={20} padding="clamp(12px,2.8svh,28px)">
            <h3 className="text-[clamp(0.9rem,2.1svh,1.05rem)] font-semibold mb-[clamp(6px,2.4svh,24px)]">{group.name}</h3>
            {group.items.map((skill, si) => (
              <div className="mb-[clamp(6px,1.9svh,18px)] last:mb-0" key={skill.name}>
                <div className="flex justify-between text-[clamp(0.75rem,1.8svh,0.92rem)] text-soft mb-[clamp(3px,0.8svh,8px)]">
                  <span>{skill.name}</span>
                  <CountUp to={skill.level} suffix="%" />
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                  <m.div
                    className="relative overflow-hidden h-full rounded-full origin-left bg-[linear-gradient(90deg,var(--color-teal),var(--color-amber))] after:absolute after:inset-0 after:content-[''] after:-translate-x-full after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] after:animate-bar-shine"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.level / 100 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.3, ease, delay: 0.2 + si * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </StarCard>
        ))}
      </m.div>

      <h3 className="text-[clamp(0.8rem,2svh,1rem)] font-semibold text-muted mb-[clamp(6px,1.8svh,18px)]">Also working with</h3>
      <m.ul
        className="flex flex-wrap gap-[clamp(6px,1.4svh,12px)] list-none"
        variants={stagger(0.2, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {tools.map((tool) => (
          <m.li
            key={tool}
            variants={bounceIn}
            className="px-[clamp(10px,2svh,18px)] py-[clamp(4px,1.1svh,10px)] rounded-[14px] text-[clamp(0.75rem,1.8svh,0.95rem)] border border-line bg-ink/70 transition-[border-color,transform] duration-300 hover:border-teal hover:-translate-y-[3px]"
          >
            {tool}
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
