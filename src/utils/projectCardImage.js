// Builds an SVG data-URI "cover image" for a project so it can be used by <InfiniteSpiral />.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function projectCardImage(project, width = 280, height = 200) {
  const [c1, c2] = project.gradient.match(/#[0-9a-fA-F]{3,8}/g) ?? ['#F2B35B', '#E07A5F'];
  const glyph = project.title.split(' ').map((w) => w[0]).join('').slice(0, 2);

  const tags = project.tags.slice(0, 3);
  let x = 20;
  const pills = tags
    .map((tag) => {
      const w = tag.length * 6.6 + 18;
      const out = `<rect x="${x}" y="${height - 40}" width="${w}" height="22" rx="11" fill="none" stroke="#0a0d14" stroke-opacity=".45"/><text x="${x + w / 2}" y="${height - 25}" font-size="11" text-anchor="middle" fill="#0a0d14" font-family="system-ui,sans-serif">${esc(tag)}</text>`;
      x += w + 6;
      return out;
    })
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<radialGradient id="s" cx=".3" cy=".2" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#s)"/>
<text x="20" y="72" font-size="56" fill="#0a0d14" fill-opacity=".85" font-family="Georgia,serif">${esc(glyph)}</text>
<text x="20" y="${height - 64}" font-size="20" fill="#0a0d14" font-family="Georgia,serif">${esc(project.title)}</text>
${pills}
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Cover for ChromaGrid cards: gradient, sheen and big initials only (ChromaGrid prints title/subtitle itself).
export function projectCoverImage(project, width = 600, height = 300) {
  const [c1, c2] = project.gradient.match(/#[0-9a-fA-F]{3,8}/g) ?? ['#F2B35B', '#E07A5F'];
  const glyph = project.title.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<radialGradient id="s" cx=".3" cy=".2" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#s)"/>
<text x="36" y="${height - 36}" font-size="130" fill="#0a0d14" fill-opacity=".85" font-family="Georgia,serif">${esc(glyph)}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
