import { useEffect, useRef, useState } from 'react';
import './NeonCursor.css';

/*
  NeonCursor: a premium neon cursor for mouse devices.

  - Default: a glowing ring with a bright centre dot. The dot follows the pointer with no easing, the ring follows
    with a smooth, frame-rate independent ease.
  - Hover (links, buttons): the ring expands and turns hollow with a brighter glow; the dot shrinks.
  - Text fields: the ring slims into a caret. Press: the ring squeezes and releases concentric ripples plus sparks.
  - A canvas layer draws the smooth fading trail and small glowing particles. Light bloom sits under the cursor.
  - variant="brackets" swaps the ring for four rounded corner brackets (crosshair style).
  - Everything is pointer-events: none. The animation loop sleeps whenever nothing is moving.
  - Touch devices are skipped entirely; prefers-reduced-motion drops the trail, particles and ripples.

  Usage: <NeonCursor />  (mount it once, near the root of the app)
*/

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="range"]), textarea, [contenteditable="true"]';
const INTERACTIVE = 'a[href], button, [role="button"], summary, label, select, [data-cursor="hover"]';
const TAU = Math.PI * 2;

const hexToRgb = (hex) => {
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [168, 85, 247];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = (c, a) => `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;

// Pre-rendered soft glow sprite. Drawing it with drawImage is far cheaper than a blur or shadow per particle.
const makeGlow = (rgb) => {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, rgba(rgb, 1));
  grad.addColorStop(0.35, rgba(rgb, 0.35));
  grad.addColorStop(1, rgba(rgb, 0));
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
};

// Flatter falloff than makeGlow: neighbouring trail samples melt together instead of reading as separate beads.
const makeSoft = (rgb) => {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, rgba(rgb, 1));
  grad.addColorStop(0.4, rgba(rgb, 0.55));
  grad.addColorStop(0.75, rgba(rgb, 0.12));
  grad.addColorStop(1, rgba(rgb, 0));
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
};

const classify = (el) => {
  if (!(el instanceof Element)) return 'idle';
  if (el.closest(TEXT_FIELD)) return 'text';
  if (el.closest(INTERACTIVE)) return 'link';
  return 'idle';
};

export default function NeonCursor({
  color = '#A855F7',
  colorSoft = '#C084FC',
  colorLight = '#E9D5FF',
  size = 34,
  variant = 'ring',
  trail = true,
  trailLife = 0.75,
  particles = true,
  clickBurst = true,
  bloom = true,
  hideNativeCursor = true,
  zIndex = 99999,
  className = '',
}) {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const bloomRef = useRef(null);
  const frameRef = useRef(null);
  const boxRef = useRef(null);
  const dotRef = useRef(null);

  // Live settings: read inside the animation loop, so changing a prop never restarts the effect.
  const settingsRef = useRef({});
  settingsRef.current = { trail, trailLife: Math.max(0.2, trailLife), particles, clickBurst, variant };

  // Only mount on devices with a real mouse (and follow the media query if it changes).
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const frameEl = frameRef.current;
    const boxEl = boxRef.current;
    const dotEl = dotRef.current;
    if (!root || !canvas || !frameEl || !boxEl || !dotEl) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    const html = document.documentElement;
    if (hideNativeCursor) html.classList.add('neon-cursor-active');

    const rgbP = hexToRgb(color);
    const rgbS = hexToRgb(colorSoft);
    const rgbL = hexToRgb(colorLight);
    const spriteP = makeGlow(rgbP);
    const softS = makeSoft(rgbS);
    const softP = makeSoft(rgbP);
    const softL = makeSoft(rgbL);
    const spriteL = makeGlow(rgbL);

    // px/py = raw pointer, fx/fy = eased bracket position, tx/ty = last trail sample.
    const st = {
      w: 1, h: 1,
      px: 0, py: 0, fx: 0, fy: 0, tx: 0, ty: 0, tt: 0, lpx: 0, lpy: 0,
      scale: 1, spread: 0, speed: 0,
      shown: false, down: false, mode: 'idle',
    };
    const trailPts = [];
    const parts = [];
    const rings = [];
    const flashes = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5); // capped to stay light on 4K screens
      st.w = Math.max(1, root.clientWidth);
      st.h = Math.max(1, root.clientHeight);
      canvas.width = Math.round(st.w * ratio);
      canvas.height = Math.round(st.h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const setMode = (mode) => {
      if (mode === st.mode) return;
      st.mode = mode;
      root.classList.toggle('is-link', mode === 'link');
      root.classList.toggle('is-text', mode === 'text');
    };

    /* ---------- spawners ---------- */
    const dust = (x, y) => {
      if (parts.length > 140) return;
      const a = Math.random() * TAU;
      const sp = 10 + Math.random() * 40;
      const life = 0.5 + Math.random() * 0.55;
      parts.push({
        x: x + (Math.random() - 0.5) * 6, y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        drag: 1.6, g: -14, life, max: life, spark: false,
        size: 0.7 + Math.random() * 1.1, sprite: Math.random() < 0.5 ? spriteL : spriteP,
      });
    };

    const burst = (x, y, t) => {
      // Three concentric ripples, like the "On Click" state of the design, plus a flash, sparks and dust.
      rings.push(
        { x, y, t0: t, delay: 0, dur: 0.65, r0: 10, r1: 56, lw: 2, rgb: rgbS },
        { x, y, t0: t, delay: 0.08, dur: 0.85, r0: 8, r1: 86, lw: 1.6, rgb: rgbP },
        { x, y, t0: t, delay: 0.17, dur: 1.05, r0: 6, r1: 118, lw: 1.1, rgb: rgbP }
      );
      flashes.push({ x, y, t0: t, dur: 0.4 });
      const sparks = 12;
      const base = Math.random() * TAU;
      for (let i = 0; i < sparks; i++) {
        const a = base + (i / sparks) * TAU + (Math.random() - 0.5) * 0.35;
        const sp = 140 + Math.random() * 210;
        const life = 0.45 + Math.random() * 0.4;
        const pick = [rgbL, rgbS, rgbP][i % 3];
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, drag: 4.2, g: 0, life, max: life, spark: true, size: 1 + Math.random() * 1.1, rgb: pick });
      }
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * TAU;
        const sp = 40 + Math.random() * 100;
        const life = 0.6 + Math.random() * 0.5;
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, drag: 2.4, g: -10, life, max: life, spark: false, size: 1 + Math.random() * 1.4, sprite: i % 2 ? spriteL : spriteP });
      }
    };

    /* ---------- drawing ---------- */
    const drawTrail = (t, life) => {
      const n = trailPts.length;
      if (n < 2) return;
      for (let i = 0; i < n; i++) {
        const a = trailPts[Math.max(0, i - 1)];
        const b = trailPts[Math.min(n - 1, i + 1)];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const ag = Math.min(1, (t - trailPts[i].t) / life);
        const fade = Math.pow(1 - ag, 1.6);
        if (fade < 0.01) continue;
        // Lateral wobble grows with age, so the older part of the trail drifts like fluid.
        const wob = Math.sin(t * 10 + i * 0.45) * ag * 5;
        const x = trailPts[i].x + (-dy / len) * wob;
        const y = trailPts[i].y + (dx / len) * wob;
        const r = (2.5 + trailPts[i].w * 1.5) * Math.pow(1 - ag, 0.9) + 1; // head about 8px, tapering to 1px
        const halo = ag < 0.5 ? softS : softP;
        const R = r * 2.2;
        ctx.globalAlpha = 0.11 * fade;
        ctx.drawImage(halo, x - R, y - R, R * 2, R * 2);
        if (ag < 0.6) {
          const c = r * 1.1;
          ctx.globalAlpha = 0.24 * fade * (1 - ag / 0.6);
          ctx.drawImage(softL, x - c, y - c, c * 2, c * 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawRings = (t) => {
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        const p = (t - r.t0 - r.delay) / r.dur;
        if (p >= 1) { rings.splice(i, 1); continue; }
        if (p < 0) continue;
        const e = 1 - Math.pow(1 - p, 3);
        const rad = r.r0 + (r.r1 - r.r0) * e;
        const a = Math.pow(1 - p, 1.6);
        ctx.beginPath();
        ctx.arc(r.x, r.y, rad, 0, TAU);
        ctx.strokeStyle = rgba(r.rgb, 0.18 * a);
        ctx.lineWidth = r.lw * 5 * (1 - p) + 1;
        ctx.stroke();
        ctx.strokeStyle = rgba(r.rgb, 0.95 * a);
        ctx.lineWidth = r.lw * (1 - p) + 0.4;
        ctx.stroke();
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        const p = (t - f.t0) / f.dur;
        if (p >= 1) { flashes.splice(i, 1); continue; }
        const e = 1 - Math.pow(1 - p, 2);
        const r = 24 + 70 * e;
        ctx.globalAlpha = (1 - p) * 0.85;
        ctx.drawImage(spriteP, f.x - r, f.y - r, r * 2, r * 2);
        const r2 = r * 0.45;
        ctx.globalAlpha = (1 - p) * 0.9;
        ctx.drawImage(spriteL, f.x - r2, f.y - r2, r2 * 2, r2 * 2);
        ctx.globalAlpha = 1;
      }
    };

    const drawParticles = (dt) => {
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= dt;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        const drag = Math.exp(-dt * p.drag);
        p.vx *= drag;
        p.vy = p.vy * drag + p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const a = p.life / p.max;
        if (p.spark) {
          ctx.strokeStyle = rgba(p.rgb, a);
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.035, p.y - p.vy * 0.035);
          ctx.stroke();
        } else {
          const r = p.size * 3.4;
          ctx.globalAlpha = a * 0.9;
          ctx.drawImage(p.sprite, p.x - r, p.y - r, r * 2, r * 2);
          ctx.globalAlpha = 1;
        }
      }
    };

    /* ---------- main loop (sleeps when idle) ---------- */
    const frame = (now) => {
      raf = 0;
      const t = now / 1000;
      const dt = last ? Math.min(0.05, Math.max(0.001, t - last)) : 1 / 60;
      last = t;
      const cfg = settingsRef.current;

      // Brackets ease toward the pointer (frame-rate independent). Reduced motion snaps.
      const k = reduce ? 1 : 1 - Math.exp(-dt / 0.055);
      st.fx += (st.px - st.fx) * k;
      st.fy += (st.py - st.fy) * k;

      // Pointer speed (smoothed) drives trail thickness, dust and a slight spread of the brackets.
      const inst = Math.hypot(st.px - st.lpx, st.py - st.lpy) / dt;
      st.lpx = st.px;
      st.lpy = st.py;
      st.speed += (inst - st.speed) * (1 - Math.exp(-dt / 0.08));

      // Ring: expands on hover, squeezes on press. Brackets: tighten on hover, squeeze on press.
      const ring = cfg.variant !== 'brackets';
      const scaleTarget = st.down ? (ring ? 0.82 : 0.78) : st.mode === 'link' ? (ring ? 1.65 : 0.72) : 1;
      const spreadTarget = reduce ? 0 : Math.min(0.2, st.speed / 7000);
      st.scale += (scaleTarget - st.scale) * (1 - Math.exp(-dt / 0.07));
      st.spread += (spreadTarget - st.spread) * (1 - Math.exp(-dt / 0.1));

      frameEl.style.transform = `translate3d(${st.fx.toFixed(2)}px, ${st.fy.toFixed(2)}px, 0)`;
      boxEl.style.transform = `scale(${(st.scale * (1 + st.spread)).toFixed(3)})`;
      if (bloomRef.current) bloomRef.current.style.transform = `translate3d(${st.fx.toFixed(2)}px, ${st.fy.toFixed(2)}px, 0) translate(-50%, -50%)`;

      // Trail samples and dust (skipped entirely for reduced motion).
      if (!reduce && st.shown) {
        const dist = Math.hypot(st.px - st.tx, st.py - st.ty);
        if (dist > 1.2) {
          if (cfg.trail) {
            // Fill the gap between two frames with evenly spaced points (and interpolated timestamps), so a fast flick
            // or a dropped frame still leaves one continuous ribbon that fades evenly.
            const w = 1.8 + Math.min(2.6, st.speed / 700);
            const steps = Math.min(40, Math.ceil(dist / 3.5));
            for (let i = 1; i <= steps; i++) {
              const f = i / steps;
              trailPts.push({ x: st.tx + (st.px - st.tx) * f, y: st.ty + (st.py - st.ty) * f, t: st.tt + (t - st.tt) * f, w });
            }
            while (trailPts.length > 220) trailPts.shift();
          }
          if (cfg.particles && Math.random() < Math.min(0.6, st.speed / 1800)) dust(st.px, st.py);
          st.tx = st.px;
          st.ty = st.py;
        }
        st.tt = t;
      }
      while (trailPts.length && t - trailPts[0].t > cfg.trailLife) trailPts.shift();

      ctx.clearRect(0, 0, st.w, st.h);
      ctx.globalCompositeOperation = 'lighter';
      drawTrail(t, cfg.trailLife);
      drawRings(t);
      drawParticles(dt);
      ctx.globalCompositeOperation = 'source-over';

      const settled =
        Math.abs(st.px - st.fx) < 0.15 && Math.abs(st.py - st.fy) < 0.15 &&
        Math.abs(scaleTarget - st.scale) < 0.003 && st.spread < 0.002 && st.speed < 8;
      const alive = trailPts.length || parts.length || rings.length || flashes.length;
      if (!settled || alive) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, st.w, st.h);
        last = 0;
      }
    };

    const wake = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
    };

    /* ---------- events ---------- */
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      st.px = e.clientX;
      st.py = e.clientY;
      if (!st.shown) {
        // First move (or re-entering the window): appear exactly under the pointer, no flying in from the corner.
        st.fx = st.tx = st.lpx = st.px;
        st.fy = st.ty = st.lpy = st.py;
        st.tt = performance.now() / 1000;
        st.shown = true;
        root.classList.add('is-ready');
      }
      dotEl.style.transform = `translate3d(${st.px}px, ${st.py}px, 0) translate(-50%, -50%)`; // zero-lag dot
      setMode(classify(e.target));
      wake();
    };

    const onDown = (e) => {
      if (e.pointerType === 'touch') return;
      st.down = true;
      root.classList.add('is-down');
      if (!reduce && settingsRef.current.clickBurst && st.shown) burst(e.clientX, e.clientY, performance.now() / 1000);
      wake();
    };

    const onUp = () => {
      st.down = false;
      root.classList.remove('is-down');
      wake();
    };

    const onLeave = () => {
      st.shown = false;
      st.down = false;
      root.classList.remove('is-ready', 'is-down');
    };

    // While scrolling with a still mouse, the element under the pointer changes: keep the hover state honest.
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf || !st.shown) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        setMode(classify(document.elementFromPoint(st.px, st.py)));
        wake();
      });
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
      } else {
        wake();
      }
    };

    resize();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', resize);
    html.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', resize);
      html.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      html.classList.remove('neon-cursor-active');
    };
  }, [enabled, color, colorSoft, colorLight, hideNativeCursor]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className={`neon-cursor neon-cursor--${variant === 'brackets' ? 'brackets' : 'ring'}${className ? ` ${className}` : ''}`}
      style={{ '--nc-primary': color, '--nc-soft': colorSoft, '--nc-light': colorLight, '--nc-size': `${size}px`, zIndex }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="neon-cursor__canvas" />
      {bloom && <div ref={bloomRef} className="neon-cursor__bloom" />}
      <div ref={frameRef} className="neon-cursor__frame">
        <div ref={boxRef} className="neon-cursor__box">
          {variant === 'brackets' ? (
            <div className="neon-cursor__corners">
              <span className="neon-cursor__corner neon-cursor__corner--tl" />
              <span className="neon-cursor__corner neon-cursor__corner--tr" />
              <span className="neon-cursor__corner neon-cursor__corner--bl" />
              <span className="neon-cursor__corner neon-cursor__corner--br" />
            </div>
          ) : (
            <div className="neon-cursor__ring" />
          )}
        </div>
      </div>
      <div ref={dotRef} className="neon-cursor__dot" />
    </div>
  );
}
