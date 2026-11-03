// Builds the artwork shown on a project ticket: the project's own two gradient colours, a soft highlight,
// a few thin rings and a large monogram. Returned as an SVG data URI so no extra image files are needed.
export function ticketArt({ colors = ['#5fd4c4', '#c4a6ff'], monogram = '' }) {
  const [from, to] = colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="h" cx="0.18" cy="0.05" r="0.85">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="400" fill="url(#g)"/>
  <rect width="640" height="400" fill="url(#h)"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.5">
    <circle cx="560" cy="70" r="70"/>
    <circle cx="560" cy="70" r="120"/>
    <circle cx="560" cy="70" r="170"/>
  </g>
  <text x="620" y="250" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="240" fill="#0a0d14" fill-opacity="0.2">${monogram}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
