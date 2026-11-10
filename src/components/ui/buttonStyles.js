// Shared button classes. MagneticButton and the contact form both use these.
export const buttonBase =
  "relative inline-flex items-center gap-2.5 px-[clamp(18px,3svh,28px)] py-[clamp(9px,1.9svh,16px)] rounded-full border font-semibold text-[clamp(0.85rem,2svh,1rem)] cursor-pointer overflow-hidden transition-[box-shadow,background-color,color,border-color] duration-300 after:absolute after:inset-0 after:content-[''] after:-translate-x-[120%] after:transition-transform after:duration-[800ms] hover:after:translate-x-[120%] disabled:opacity-70 disabled:cursor-wait";

export const buttonVariants = {
  primary:
    "border-transparent bg-amber text-[#1a1407] shadow-[0_10px_40px_-10px_rgba(242,179,91,0.6)] hover:shadow-[0_16px_50px_-8px_rgba(242,179,91,0.8)] after:bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)]",
  light:
    "border-transparent bg-white text-ink shadow-[0_10px_40px_-12px_rgba(255,255,255,0.35)] after:bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)]",
  ghost:
    "border-line bg-white/[0.02] text-white hover:border-teal hover:text-teal after:bg-[linear-gradient(105deg,transparent_30%,rgba(95,212,196,0.25)_50%,transparent_70%)]",
};
