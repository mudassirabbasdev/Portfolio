import { motion } from 'framer-motion';
import Section from './Section';
import { fadeUp, lineUp, stagger } from '../utils/animations';

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

// Short statement section that sits directly after the hero.
export default function Intro() {
  return (
    <Section id="intro" className="section--intro">
      <motion.div
        className="intro"
        variants={stagger(0.1, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.span className="intro__pill" variants={fadeUp}>
          <PersonIcon />
          About me
        </motion.span>

        <h2 className="intro__title">
          <span className="line">
            <motion.span variants={lineUp} style={{ display: 'block' }}>
              Frontend first.
            </motion.span>
          </span>
          <span className="line">
            <motion.span variants={lineUp} style={{ display: 'block' }}>
              <span className="hero__gradient">Full-stack in progress.</span>
            </motion.span>
          </span>
        </h2>
      </motion.div>
    </Section>
  );
}
