import { brandIcons } from '../../data/icons';

const stroke = {
  viewBox: '0 0 24 24',
  width: 22,
  height: 22,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function MailIcon() {
  return (
    <svg {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg {...stroke}>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg {...stroke}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...stroke}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg {...stroke}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function BrandIcon({ name }) {
  if (name === 'mail') return <MailIcon />;
  const brand = brandIcons[name];
  return (
    <svg viewBox={brand.viewBox} width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d={brand.path} />
    </svg>
  );
}
