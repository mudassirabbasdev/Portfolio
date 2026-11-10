import './section.css';

// Shared page-section wrapper.
// Sections are at least one viewport tall (section-screen) and grow with their content, so nothing is
// squeezed or scaled down on shorter laptop screens. The top padding clears the fixed navbar; content is
// vertically centred in the space that remains.
// Pass `screen={false}` when a parent already sets the section height.
// `shade` adds a plain background (colour/gradient classes) for sections without an animated one.
export default function Section({ id, className = '', shade = '', background = null, screen = true, children }) {
  const height = screen ? 'section-screen' : 'flex-1 min-h-0';

  return (
    <section
      id={id}
      className={`${height} relative flex flex-col overflow-hidden isolate pt-[calc(var(--nav-h)+clamp(16px,2svh,28px))] pb-[clamp(24px,4svh,48px)] ${className} ${shade}`.trim()}
    >
      {background && <div className="absolute inset-0 z-0 pointer-events-none">{background}</div>}
      <div className="container-x flex-1 min-h-0 flex flex-col">
        <div className="relative flex-1 min-h-0 w-full flex flex-col [justify-content:safe_center]">{children}</div>
      </div>
    </section>
  );
}
