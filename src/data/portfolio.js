// Replace this placeholder content with your own details.
export const profile = {
  name: 'Mudassir Abbas',
  role: 'Front-End Developer',
  badge: 'MERN Stack Developer',
  handle: 'mudassir',
  resume: '#', // put your CV in /public (e.g. /public/resume.pdf) and set this to '/resume.pdf' to show the Download Resume button
  intro:
    'A passionate MERN stack developer from Pakistan, focused on building fast, responsive and user-friendly web applications that solve real problems and create impact.',
  bio: [
    'I work across the stack, with most of my time spent on product engineering: turning a rough idea into a feature people use every day.',
    'Outside of client work I build tools for small teams and keep a close eye on performance, accessibility, and the details that make an interface feel calm.',
  ],
  email: 'devmudassir0705@gmail.com',
  github: 'https://github.com/mudassirabbasdev',
  linkedin: 'https://www.linkedin.com/in/mudassirabbasdev/',
  location: 'Punjab, Pakistan',
  x: '#',
};

// Initials derived from the name, used in the navbar and About card.
export const initials = profile.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

// Project cards. `colors` drive the ticket artwork, `kind` and `highlights` are the extra details shown on each
// ticket. They are written from each project's summary, so edit them freely to match what you built.
export const projects = [
  {
    title: 'E-Commerce React',
    monogram: 'ER',
    summary: 'A React-based e-commerce storefront built with JavaScript.',
    kind: 'Storefront UI',
    highlights: ['Component-based React UI', 'Storefront layout', 'Built with JavaScript'],
    tags: ['JavaScript', 'React'],
    colors: ['#F2B35B', '#E07A5F'],
    gradient: 'linear-gradient(135deg, #F2B35B 0%, #E07A5F 100%)',
    link: 'https://github.com/mudassirabbasdev/E-Commerce-React',
  },
  {
    title: 'MSW Consultancy',
    monogram: 'MC',
    summary: 'A modern, responsive consultancy homepage that showcases services, builds trust and keeps the experience easy to follow.',
    kind: 'Business website',
    highlights: ['Responsive homepage', 'Services showcase', 'Trust-building layout'],
    tags: ['HTML', 'CSS'],
    colors: ['#5FD4C4', '#3A7CA5'],
    gradient: 'linear-gradient(135deg, #5FD4C4 0%, #3A7CA5 100%)',
    link: 'https://github.com/mudassirabbasdev/MSW',
  },
  {
    title: 'Spotify Clone',
    monogram: 'SC',
    summary: "A responsive replica of Spotify's core UI and layout.",
    kind: 'UI clone',
    highlights: ['Responsive layout', "Replicates Spotify's core UI", 'HTML, CSS and JavaScript'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    colors: ['#B8A4FF', '#5C4B99'],
    gradient: 'linear-gradient(135deg, #B8A4FF 0%, #5C4B99 100%)',
    link: 'https://github.com/mudassirabbasdev',
  },
  {
    title: 'Interactive Web Forms',
    monogram: 'IW',
    summary: 'Fully validated registration forms with modular JavaScript.',
    kind: 'Form UI',
    highlights: ['Input validation', 'Modular JavaScript', 'Registration flow'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    colors: ['#F7E7CE', '#9FB6A0'],
    gradient: 'linear-gradient(135deg, #F7E7CE 0%, #9FB6A0 100%)',
    link: 'https://github.com/mudassirabbasdev',
  },
];

export const skills = [
  {
    name: 'Frontend',
    items: [
      { name: 'React', level: 92 },
      { name: 'CSS and layout', level: 88 },
      { name: 'Framer Motion', level: 82 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Laravel and PHP', level: 88 },
      { name: 'Node.js', level: 80 },
      { name: 'REST and GraphQL APIs', level: 84 },
    ],
  },
  {
    name: 'Delivery',
    items: [
      { name: 'Git and CI pipelines', level: 86 },
      { name: 'Docker', level: 74 },
      { name: 'Automated testing', level: 80 },
    ],
  },
];

export const tools = ['Vite', 'PostgreSQL', 'MySQL', 'Redis', 'Shopify APIs', 'Figma', 'AWS', 'Linux'];

export const stats = [
  { label: 'Years building for the web', value: 6, suffix: '+' },
  { label: 'Projects shipped', value: 30, suffix: '+' },
  { label: 'Clients served', value: 18, suffix: '' },
];

// About section copy. `highlight` is rendered brighter inside the first paragraph.
export const aboutText = {
  intro: {
    before: "I'm a BSCS student who enjoys turning ideas into ",
    highlight: 'fast, responsive websites with thoughtful interfaces',
    after: '. Alongside freelance frontend work, I\'m learning backend development, REST APIs, and authentication as I build with MongoDB, Express, React, and Node.js.',
  },
  goal: 'My goal is simple: create interfaces that feel effortless to use, write code that is easy to maintain, and keep growing toward complete, end-to-end MERN applications.',
};

// Info cards in the About section. `icon` is a key in About.jsx; `tone` picks the accent colour.
export const infoCards = [
  { label: 'Based in', value: 'Punjab, Pakistan', icon: 'pin', tone: 'blue' },
  { label: 'Education', value: 'BSCS, Computer Science', icon: 'cap', tone: 'purple' },
  { label: 'Work', value: 'Freelance Web Developer', icon: 'briefcase', tone: 'pink' },
  { label: 'Availability', value: 'Open to freelance projects', icon: 'check', tone: 'green' },
];

// Contact rows. `copy` rows copy their value to the clipboard, `href` rows open a link, the rest are plain info.
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
export const contactRows = [
  { label: 'Email (tap to copy)', value: profile.email, icon: 'mail', tone: 'purple', copy: true },
  { label: 'GitHub', value: bare(profile.github), icon: 'github', tone: 'github', href: profile.github },
  { label: 'LinkedIn', value: bare(profile.linkedin), icon: 'linkedin', tone: 'linkedin', href: profile.linkedin },
  { label: 'Based in', value: profile.location, icon: 'pin', tone: 'blue' },
];

// Footer copy.
export const footer = {
  tagline: 'MERN stack developer building fast, responsive and user-friendly web applications that solve real problems.',
  navigate: [
    ['#top', 'Home'],
    ['#about', 'About'],
    ['#projects', 'Projects'],
    ['#skills', 'Skills'],
    ['#contact', 'Contact'],
  ],
  services: ['Responsive web design', 'React interfaces', 'MERN stack applications'],
  status: 'Open to freelance projects',
};
