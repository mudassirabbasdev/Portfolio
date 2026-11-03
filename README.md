# Mudassir Abbas, portfolio

React 18 + Vite + Tailwind CSS v4 + Motion (`motion/react`). The animated headline uses GSAP, loaded on demand.

## Run it

    npm install
    npm run dev        # local dev server
    npm run build      # production build in dist/
    npm run preview    # serve the production build locally
    npm run lint       # hook rules, unused code, bad JSX

## Customise

| What | Where |
| --- | --- |
| Name, links, skills, project cards, contact rows | `src/data/portfolio.js` |
| Resume button | put your CV in `public/` and set `profile.resume` (e.g. `'/resume.pdf'`). The button stays hidden while it is `'#'`. |
| Project ticket details (type, highlights, colours) | the `projects` array in `src/data/portfolio.js` |
| Contact form delivery | set `VITE_CONTACT_ENDPOINT` (see `.env.example`). Without it the form opens the visitor's email app. |
| Colours, fonts, shared animations | `src/index.css` (`@theme` block) |

## How it is built

- **Sections** live in `src/components/` and share one `Section` wrapper (`min-height: 100svh`, grows with its content).
- **Background**: one fixed WebGL dot field (`backgrounds/SiteBackground.jsx`) behind the whole page.
- **Custom cursor**: `ui/NeonCursor` (mouse devices only). Pass `variant="brackets"` for the crosshair style.
- **Third-party UI pieces** (React Bits copies) are in `ui/PillNav`, `ui/MaskedHeading`, `ui/TearTicket`, `ui/StarBorder`, `backgrounds/reactbits`.

## Performance notes

- Fonts are self-hosted from `public/fonts` (Latin only); there is no third-party request on the critical path.
- The WebGL background, the cursor and the GSAP headline are separate chunks that load after the page has painted.
  Touch devices never download the cursor.
- Motion runs through `LazyMotion` with the small `m` components, so unused features are not shipped.
- Decorative bobbing uses CSS animations (`animate-float`) instead of JavaScript.
- Every animation respects `prefers-reduced-motion`.
- Images are WebP. Add new ones with explicit `width`/`height` to avoid layout shift.

## Gotcha

Component CSS that is not inside a Tailwind layer (for example `.masked-heading { margin: 0 }`) beats Tailwind utility
classes. If a margin or padding class seems to be ignored on a third-party component, put it on a wrapper element instead.
