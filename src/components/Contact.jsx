import { Fragment, useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import Section from './Section';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { buttonBase, buttonVariants } from './ui/buttonStyles';
import { BrandIcon, MailIcon, PinIcon, CopyIcon, CheckIcon, ExternalIcon } from './ui/Icons';
import { contactRows, profile } from '../data/portfolio';
import { zoomIn, fadeUp, stagger, viewportOnce } from '../utils/animations';

// Set VITE_CONTACT_ENDPOINT (see .env.example) to a Formspree / Getform / own-API URL that accepts JSON.
// Without it the form falls back to opening the visitor's email app with the message pre-filled.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const emptyForm = { name: '', email: '', message: '' };

const statusCopy = {
  sent: { tone: 'text-teal', text: 'Thanks, your message has been sent. I will reply soon.' },
  mailto: { tone: 'text-teal', text: 'Your email app should open with the message ready to send.' },
  error: { tone: 'text-rose-300', text: `Could not send right now. Please try again or email ${profile.email}.` },
};

const iconTone = {
  purple: 'bg-[linear-gradient(135deg,#8b5cf6,#6d4aff)]',
  blue: 'bg-[linear-gradient(135deg,#0ea5e9,#2563eb)]',
  github: 'bg-[#24292f]',
  linkedin: 'bg-[#0a66c2]',
};

const controlClass =
  'w-full rounded-xl bg-white/[0.03] border border-line px-4 py-[clamp(8px,1.5svh,12px)] text-white placeholder:text-muted/70 [font:inherit] text-[clamp(0.85rem,2svh,1rem)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-white/25 focus:outline-none focus:border-teal focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(95,212,196,0.16)]';

function Field({ label, multiline = false, className = '', ...props }) {
  const Control = multiline ? 'textarea' : 'input';
  return (
    <label className={`flex flex-col gap-[clamp(3px,0.7svh,8px)] text-[clamp(0.75rem,1.8svh,0.92rem)] text-soft ${className}`}>
      <span>{label}</span>
      <Control {...props} className={`${controlClass} ${multiline ? 'flex-1 min-h-[clamp(72px,12svh,140px)] resize-none' : ''}`} />
    </label>
  );
}

function RowIcon({ name }) {
  if (name === 'mail') return <MailIcon />;
  if (name === 'pin') return <PinIcon />;
  return <BrandIcon name={name} />;
}

// Lets long URLs wrap after a slash ("linkedin.com/in/" / "name") instead of breaking in the middle of a word.
const softBreaks = (value) => value.split(/(?<=\/)/).map((part, i) => <Fragment key={i}>{i > 0 && <wbr />}{part}</Fragment>);

// One contact row. Copy rows write their value to the clipboard, link rows open in a new tab, the rest are static.
function ContactRow({ row }) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(0);
  const interactive = row.copy || row.href;

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const content = (
    <>
      <span className={`w-[clamp(34px,5.6svh,48px)] h-[clamp(34px,5.6svh,48px)] rounded-[14px] shrink-0 grid place-items-center text-white ${iconTone[row.tone]}`}>
        <RowIcon name={row.icon} />
      </span>
      <span className="grid gap-0.5 flex-1 min-w-0">
        <span className="text-[clamp(0.62rem,1.5svh,0.78rem)] tracking-[0.16em] uppercase text-muted">{copied ? 'Copied to clipboard' : row.label}</span>
        <span className="text-[clamp(0.8rem,1.9svh,1.02rem)] max-[480px]:text-[0.8rem] font-bold leading-snug [overflow-wrap:anywhere]">{softBreaks(row.value)}</span>
      </span>
      {interactive && (
        <span className="grid place-items-center text-muted shrink-0">
          {row.copy ? (copied ? <CheckIcon /> : <CopyIcon />) : <ExternalIcon />}
        </span>
      )}
    </>
  );

  const base = 'flex items-center gap-[clamp(10px,2svh,18px)] w-full px-[clamp(12px,2.2svh,20px)] py-[clamp(6px,1.4svh,12px)] rounded-[18px] bg-ink/70 border border-line text-white text-left';
  const hover = 'cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-lavender/45 hover:shadow-[0_18px_40px_-24px_rgba(196,166,255,0.55)]';

  if (row.copy) {
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(row.value);
        setCopied(true);
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopied(false), 1800);
      } catch {
        /* clipboard unavailable: the value is still visible on screen */
      }
    };
    return (
      <m.button type="button" className={`${base} ${hover}`} variants={fadeUp} onClick={copy}>
        {content}
      </m.button>
    );
  }

  if (row.href) {
    return (
      <m.a className={`${base} ${hover}`} variants={fadeUp} href={row.href} target="_blank" rel="noreferrer">
        {content}
      </m.a>
    );
  }

  return (
    <m.div className={base} variants={fadeUp}>
      {content}
    </m.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const resetTimer = useRef(0);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const finish = (next) => {
    setStatus(next);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 7000);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (new FormData(e.currentTarget).get('_gotcha')) return; // honeypot: bots fill it, people never see it

    const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    setStatus('sending');

    if (!CONTACT_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n${payload.name} (${payload.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      finish('mailto');
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setForm(emptyForm);
      finish('sent');
    } catch {
      finish('error');
    }
  };

  const message = statusCopy[status];

  return (
    <Section id="contact">
      <div className="grid grid-cols-2 gap-[clamp(16px,4svh,48px)_clamp(32px,5vw,72px)] items-stretch [@media(max-width:900px)_and_(max-aspect-ratio:5/4)]:grid-cols-1">
        <Reveal className="flex flex-col h-full">
          <SectionHeading lead="Let's build something" accent="useful together." size="text-[clamp(1.6rem,min(3.8vw,5.6svh),3.4rem)]" />
          <p className="text-white/80 max-w-[44ch] text-balance text-[clamp(0.95rem,0.35vw+0.85rem,1.1rem)] leading-[1.5]">
            Have a project in mind, or just want to say hi? Send a message and I'll get back to you.
          </p>
          <m.div
            className="grid gap-[clamp(6px,1.6svh,16px)] mt-auto pt-[clamp(10px,3svh,32px)]"
            variants={stagger(0.15, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {contactRows.map((row) => (
              <ContactRow key={row.label} row={row} />
            ))}
          </m.div>
        </Reveal>

        <Reveal variant={zoomIn} delay={0.15} className="h-full">
          <form
            className="flex flex-col h-full gap-[clamp(8px,1.8svh,16px)] p-[clamp(14px,2.6svh,26px)] rounded-3xl bg-ink/75 border border-line"
            onSubmit={submit}
            aria-busy={status === 'sending'}
          >
            <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name" required maxLength={80} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required maxLength={120} />
            <Field label="Message" name="message" value={form.message} onChange={update} placeholder="Tell me about your project..." className="flex-1 min-h-0" multiline required minLength={10} maxLength={2000} />

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="flex items-center gap-4 min-h-[clamp(44px,7svh,60px)]">
              <m.button
                type="submit"
                className={`${buttonBase} ${buttonVariants.primary} shrink-0`}
                disabled={status === 'sending'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </m.button>
              <p
                className={`flex-1 min-w-0 text-[clamp(0.7rem,1.6svh,0.85rem)] leading-snug line-clamp-3 ${message?.tone ?? ''}`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {message?.text}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
