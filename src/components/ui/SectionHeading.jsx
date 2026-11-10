// One heading style for every section: bold sans, white lead and a teal-to-lavender accent.
// Hero and About import the same tokens so all section titles stay consistent.
export const headingSize = 'text-[clamp(1.7rem,min(5.6vw,7.4svh),4.8rem)]';
export const headingClass = `font-sans font-extrabold ${headingSize} leading-[1.1] tracking-[-0.025em]`;
export const gradientText = 'bg-[linear-gradient(90deg,var(--color-teal),var(--color-lavender))] bg-clip-text text-transparent';

export default function SectionHeading({ lead, accent, size = headingSize, className = '' }) {
  return (
    <h2 className={`${headingClass.replace(headingSize, size)} text-balance mb-[clamp(4px,1.2svh,16px)] ${className}`.trim()}>
      <span className="text-white">{lead}</span>{' '}
      <span className={`inline-block pb-[0.1em] ${gradientText}`}>{accent}</span>
    </h2>
  );
}
