import { lazy, Suspense } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useAfterIdle from './utils/useAfterIdle';

// Decorative extras load in their own chunks, after the page has painted.
const SiteBackground = lazy(() => import('./components/backgrounds/SiteBackground'));
const NeonCursor = lazy(() => import('./components/ui/NeonCursor/NeonCursor'));

// Only devices with a real mouse get the custom cursor (touch devices never download it).
const hasMouse = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function App() {
  const extrasReady = useAfterIdle();

  return (
    // LazyMotion + the small `m` components keep unused Motion features (drag, layout) out of the bundle.
    // reducedMotion="user" turns off Motion transforms for people who request less motion.
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100000] rounded-full bg-white px-5 py-2.5 font-semibold text-ink shadow-lg"
        >
          Skip to content
        </a>

        {extrasReady && (
          <Suspense fallback={null}>
            <SiteBackground />
            {hasMouse() && <NeonCursor />}
          </Suspense>
        )}

        <Navbar />
        <main id="main">
          <div className="section-screen flex flex-col">
            <Hero />
            <TechMarquee />
          </div>
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
