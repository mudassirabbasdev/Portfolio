// Canvas scenes used as section backgrounds. Each export is a createScene factory.
// Keep these as module-level constants so the hook does not restart on every render.
const TAU = Math.PI * 2;

// Hero: a slowly rotating, tilted galaxy with parallax toward the cursor.
export const galaxyScene = (w, h) => {
  const maxR = Math.hypot(w, h) * 0.55;
  const count = Math.min(600, Math.floor((w * h) / 1800));
  const stars = Array.from({ length: count }, () => ({
    r: Math.pow(Math.random(), 0.7) * maxR,
    a: Math.random() * TAU,
    size: Math.random() * 1.4 + 0.3,
    depth: Math.random() * 0.8 + 0.2,
    twinkle: Math.random() * 2 + 0.5,
    hue: 190 + Math.random() * 120,
  }));

  return (ctx, t, p) => {
    const cx = w * 0.66;
    const cy = h * 0.5;

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.9);
    glow.addColorStop(0, 'rgba(242, 179, 91, 0.18)');
    glow.addColorStop(0.4, 'rgba(95, 212, 196, 0.06)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      const speed = 0.04 / (0.25 + s.r / maxR);
      const angle = s.a + t * speed;
      const x = cx + Math.cos(angle) * s.r + p.x * s.depth * 25;
      const y = cy + Math.sin(angle) * s.r * 0.42 + p.y * s.depth * 25;
      const alpha = 0.35 + 0.65 * Math.abs(Math.sin(t * s.twinkle + s.a));
      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, TAU);
      ctx.fillStyle = `hsla(${s.hue}, 80%, 82%, ${alpha})`;
      ctx.fill();
    }
  };
};

// Projects: drifting particles that link to neighbours and part around the cursor.
export const particlesScene = (w, h) => {
  const count = Math.min(80, Math.floor((w * h) / 16000));
  const pts = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));

  return (ctx, t, p) => {
    const mx = ((p.x + 1) / 2) * w;
    const my = ((p.y + 1) / 2) * h;

    for (const q of pts) {
      q.x += q.vx;
      q.y += q.vy;
      if (q.x < 0 || q.x > w) q.vx *= -1;
      if (q.y < 0 || q.y > h) q.vy *= -1;
      if (p.active) {
        const dx = q.x - mx;
        const dy = q.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) {
          q.x += (dx / d) * 1.5;
          q.y += (dy / d) * 1.5;
        }
      }
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i];
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(242, 179, 91, ${0.18 * (1 - d / 130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = 'rgba(236, 230, 216, 0.7)';
    for (const q of pts) {
      ctx.beginPath();
      ctx.arc(q.x, q.y, 1.6, 0, TAU);
      ctx.fill();
    }
  };
};

// Skills: layered sine waves that shift with the cursor.
export const wavesScene = (w, h) => (ctx, t, p) => {
  for (let i = 0; i < 5; i++) {
    const base = h * (0.35 + i * 0.09);
    const hue = 180 + i * 12;
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, `hsla(${hue}, 80%, 65%, 0)`);
    gradient.addColorStop(0.5, `hsla(${hue}, 80%, 65%, 0.45)`);
    gradient.addColorStop(1, `hsla(${hue}, 80%, 65%, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y =
        base +
        Math.sin(x * 0.005 + t * (0.6 + i * 0.15) + i) * (28 + i * 4) +
        Math.cos(x * 0.0025 - t * 0.35) * 18 +
        p.x * (10 + i * 4) * Math.sin(x * 0.003 + i);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};
