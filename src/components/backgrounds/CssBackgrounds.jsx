// Pure-CSS backgrounds (no canvas cost).
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <span className="absolute w-[50vmax] h-[50vmax] rounded-full blur-[90px] opacity-30 animate-drift bg-amber top-[-20%] left-[-10%]" />
      <span className="absolute w-[50vmax] h-[50vmax] rounded-full blur-[90px] opacity-30 bg-teal bottom-[-25%] right-[-10%] [animation:drift_22s_ease-in-out_infinite_alternate_-6s]" />
      <span className="absolute w-[50vmax] h-[50vmax] rounded-full blur-[90px] opacity-[0.18] bg-[#7a5cff] top-[20%] left-[40%] [animation:drift_26s_ease-in-out_infinite_alternate_-12s]" />
    </div>
  );
}

export function GridScanBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-ink [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      aria-hidden="true"
    >
      <span className="absolute left-0 right-0 h-[180px] bg-[linear-gradient(transparent,rgba(242,179,91,0.14),transparent)] animate-scan" />
    </div>
  );
}
