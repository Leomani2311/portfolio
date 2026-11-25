export const profile = {
  name: 'Manikandan R',
  title: 'Full Stack Developer',
  tagline: 'React.js · Node.js · Nest.js · Software Engineer',
  summary:
    'Full Stack Software Developer with 6 years of experience designing and building scalable web applications. Proven success migrating legacy systems to modern architectures, improving performance by up to 45%.',
  phone: '+91 7867063904',
  email: 'manikandan.r.4483@gmail.com',
  linkedin: 'https://www.linkedin.com/in/manikandan-leo2311',
  location: 'Chennai, India',
  // Background removed with scripts/remove_bg.py (full color)
  photo: '/portraits/profile-cutout.webp',
}

export const skills = {
  Frontend: [
    'React.js',
    'Angular',
    'AngularJS',
    'JavaScript (ES6+)',
    'TypeScript',
    'HTML5',
    'CSS3',
    'SCSS',
    'Redux',
    'React Hooks',
    'Context API',
  ],
  Backend: [
    'Node.js',
    'Express.js',
    'Nest.js',
    'RESTful APIs',
    'XML Processing',
    'JWT Authentication',
  ],
  Database: ['MySQL', 'Query Optimization'],
  Testing: ['Jest', 'React Testing Library'],
  Tools: ['Git', 'Postman', 'Docker', 'CI/CD', 'Claude Code CLI', 'Code Review'],
}

export const experience = [
  {
    role: 'Software Developer',
    company: 'Amshuhu iTech Solution Pvt. Ltd.',
    location: 'Chennai, India',
    period: '2022 – Present',
    highlights: [
      'Built scalable React.js and Node.js apps across multi-module ERP platforms.',
      'Migrated legacy Java/JSP and AngularJS systems to React.js and Nest.js.',
      'Improved page load times by up to 45% with lazy loading and code splitting.',
      'Designed JWT-secured REST APIs with 35% faster response times.',
      'Optimized MySQL queries for up to 50% faster reporting and reconciliation.',
    ],
  },
  {
    role: 'QA Analyst',
    company: 'Sanmina India Private Limited',
    location: 'Chennai, India',
    period: '2019 – 2020',
    highlights: [
      'Analyzed manufacturing quality data to drive continuous improvement.',
      'Designed and executed test cases for product quality and compliance.',
      'Tracked defects and performed root-cause analysis to reduce recurring issues.',
    ],
  },
]

export const projects = [
  {
    name: 'Cockpit',
    stack: 'AngularJS → React.js',
    description:
      'Led end-to-end migration of a legacy AngularJS app to React.js with Hooks and Context API.',
    outcomes: ['40% better performance', '45% faster loads', '85% unit test coverage'],
  },
  {
    name: 'Taxrecon',
    stack: 'GST · Tally · CRM',
    description:
      'GST return filing and smart reconciliation platform integrating GSTN, Tally, and CRM imports.',
    outcomes: ['35% fewer reconciliation errors', '50% faster DB queries'],
  },
  {
    name: 'Shell',
    stack: 'Dashboards · RBAC',
    description:
      'Distributor pipeline manager with real-time performance dashboards and role-based access.',
    outcomes: ['Real-time business insights', 'Secure RBAC auth'],
  },
  {
    name: 'ERP Migration',
    stack: 'Java → React · Nest.js',
    description:
      'Migrated a legacy Java/JSP ERP to React.js and Nest.js with Docker and CI/CD.',
    outcomes: ['35% faster APIs', 'JWT auth', 'Automated deployments'],
  },
  {
    name: 'Tally ERP Integration',
    stack: 'Node.js · Angular · MySQL',
    description:
      'Full-stack ERP-to-Tally sync via XML — ledgers, stock, cost centres, and bulk vouchers.',
    outcomes: ['Master sync automation', 'Duplicate detection', 'Upload history tracking'],
  },
]

export type PersonalProject = {
  name: string
  type: string
  stack: string
  description: string
  coreIdea: string[]
  features: string[]
  github?: string
  live?: string
}

export const personalProjects: PersonalProject[] = [
  {
    name: 'Healthcare Platform',
    type: 'Healthcare SaaS',
    stack: 'Next.js · TypeScript · Tailwind CSS · Node.js · FHIR (Medplum)',
    description:
      'Multi-clinic healthcare platform with a Doctor OS, patient app, and clinic admin panel — covering booking, consultation, prescriptions, and billing in one system.',
    coreIdea: [
      'One platform connecting clinics, doctors, and patients end-to-end.',
      'Cut doctors’ paperwork with AI-assisted notes and prescriptions.',
      'Keep patient data secure, separate per clinic, and interoperable via FHIR.',
    ],
    features: [
      'Multi-tenant clinic isolation',
      'Token-based appointment queue',
      'AI scribe & smart prescriptions',
      'WhatsApp alerts & Razorpay payments',
    ],
  },
  {
    name: 'Education Platform',
    type: 'EdTech',
    stack: 'React 19 · TypeScript · Node.js · Express · Prisma · Gemini AI',
    description:
      'Full-stack learning platform with masterclass events, community reviews, a points wallet with rewards, subscriptions, and an AI career advisor.',
    coreIdea: [
      'Make tech learning social through live masterclasses and community reviews.',
      'Reward participation with points learners can redeem for real perks.',
      'Guide every learner’s career path with a personal AI advisor.',
    ],
    features: [
      'JWT auth with bcrypt',
      'Points ledger & reward redemption',
      'AI career advisor (Gemini)',
      'Monorepo with shared API types',
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of Engineering — Electronics and Communication',
    school: 'Maha Barathi Engineering College',
    year: '2018',
  },
  {
    degree: 'Diploma — Electronics and Communication Engineering',
    school: 'Muruga Polytechnic College',
    year: '2014',
  },
]
