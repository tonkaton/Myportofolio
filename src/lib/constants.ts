import { Instagram } from 'lucide-react'
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
    title: 'Botak Engine Speed',
    description: 'Smart Service for Your Motorcycle - Monitor your bike’s maintenance history and earn loyalty rewards every time you service your motorcycle.',
    tags: ['React', 'Express.js', 'Sequelize', 'TypeScript', 'Mysql'],
    liveUrl: '#',
    githubUrl: 'https://github.com/tonkaton/ProjectBengkel',
    featured: true,
    year: 2025,
  },
  {
    id: '02',
    title: 'OlaATK',
    description: 'Everything You Need for Printing & Office Supplies - From photocopy and printing to complete stationery products, OlaATK helps students and professionals get their work done faster.',
    tags: ['React', 'Node.js', 'Express.js', 'Prisma', 'Mysql'],
    liveUrl: '#',
    githubUrl: 'https://github.com/tonkaton/OlaATK',
    featured: true,
    year: 2026,
  },
  {
    id: '03',
    title: 'IJM - CarShowroom',
    description: 'Find Your Perfect Used Car - Quality pre-owned vehicles with trusted service and competitive prices at IJM (Istana Jaya Motor).',
    tags: ['PHP', 'Boostrap', 'Javascript', 'MySQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/tonkaton/Codiroom-Car-Showroom-CMS-',
    featured: false,
    year: 2023,
  },
  {
    id: '04',
    title: 'Codiroom - SoftwareHouse',
    description: 'Code the Future - Web3 development, mobile apps, and professional websites built by Codiroom for modern businesses.',
    tags: ['TypeScript', 'React-SWC', 'BrutalismStyle',],
    liveUrl: '#',
    githubUrl: 'https://github.com/tonkaton/Codiroom',
    featured: false,
    year: 2026,
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
  github:   'https://github.com/tonkaton',
  Instagram: 'https://www.instagram.com/kaatonnn/',
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
