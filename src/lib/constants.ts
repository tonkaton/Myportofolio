import type { NavLink, Project, Skill, Certificate } from '../types/project'

export const NAV_LINKS: NavLink[] = [
  { label: 'HOME',     href: '#home'         },
  { label: 'ABOUT',    href: '#about'        },
  { label: 'PROJECTS', href: '#projects'     },
  { label: 'SKILLS',   href: '#skills'       },
  { label: 'CERTS',    href: '#certificates' },
  { label: 'CONTACT',  href: '#contact'      },
]

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'WEB3_PLATFORM',
    description: 'Decentralized Web3 application developed at Codiroom — integrating smart contracts, wallet connect, and responsive UI.',
    tags: ['React', 'Solidity', 'Web3.js', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2024,
  },
  {
    id: '02',
    title: 'MOBILE_APP',
    description: 'Cross-platform mobile application with modern UI, REST API integration, and real-time data synchronization.',
    tags: ['React Native', 'Node.js', 'REST API'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2024,
  },
  {
    id: '03',
    title: 'CMS_ECOMMERCE',
    description: 'Full e-commerce platform built with WordPress & OpenCart. Custom theme, payment gateway, and inventory management.',
    tags: ['WordPress', 'OpenCart', 'PHP', 'MySQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: 2022,
  },
  {
    id: '04',
    title: 'COMPANY_PORTAL',
    description: 'Internal web portal for PT. TerminalTujuh — dashboard, user management, and CMS integration using PHP & Laravel.',
    tags: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: 2022,
  },
]

export const SKILLS: Skill[] = [
  { name: 'JavaScript',              level: 90, category: 'frontend' },
  { name: 'PHP / Laravel',           level: 85, category: 'backend'  },
  { name: 'Frontend (HTML/CSS/JS)',   level: 92, category: 'frontend' },
  { name: 'React / Next.js',         level: 82, category: 'frontend' },
  { name: 'Web3 & Blockchain',       level: 75, category: 'backend'  },
  { name: 'Mobile App Dev',          level: 72, category: 'tools'    },
  { name: 'UI/UX Design',            level: 80, category: 'tools'    },
  { name: 'WordPress / OpenCart',    level: 88, category: 'tools'    },
  { name: 'Node.js',                 level: 70, category: 'backend'  },
  { name: 'Figma',                   level: 78, category: 'tools'    },
]

export const PERSONAL_INFO = {
  name:     'KATON',
  title:    'SOFTWARE ENGINEER',
  subtitle: 'Frontend Dev • Web3 • Project Manager',
  bio:      'Software Engineer with experience in web, Web3, and mobile application development. Proven ability to fulfill multiple roles — delivering client-focused digital solutions from inception to launch.',
  location: 'JAKARTA, INDONESIA',
  email:    'katonkurnia28@gmail.com',
  phone:    '087776131793',
  github:   'https://github.com/katondev',
  linkedin: 'https://linkedin.com/in/katondev',
}

export const CERTIFICATES: Certificate[] = [
  {
    id: '01',
    title: 'MASUKKAN NAMA SERTIFIKAT',
    issuer: 'NAMA ISSUER / PLATFORM',
    date: '2024',
    credentialUrl: '#',
    category: 'frontend',
  },
  {
    id: '02',
    title: 'MASUKKAN NAMA SERTIFIKAT',
    issuer: 'NAMA ISSUER / PLATFORM',
    date: '2024',
    credentialUrl: '#',
    category: 'backend',
  },
  {
    id: '03',
    title: 'MASUKKAN NAMA SERTIFIKAT',
    issuer: 'NAMA ISSUER / PLATFORM',
    date: '2023',
    credentialUrl: '#',
    category: 'cloud',
  },
]
