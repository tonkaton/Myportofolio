import type { NavLink, Project, Skill } from '../types/project'

export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
]

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'NEURAL_DASHBOARD',
    description: 'AI-powered analytics platform with real-time data visualization and predictive insights using machine learning algorithms.',
    tags: ['React', 'Three.js', 'Python', 'TensorFlow'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2024,
  },
  {
    id: '02',
    title: 'CYBER_COMMERCE',
    description: 'Next-gen e-commerce experience with AR product preview, holographic UI, and seamless Web3 payment integration.',
    tags: ['Next.js', 'WebGL', 'Solidity', 'GSAP'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2024,
  },
  {
    id: '03',
    title: 'VOID_PROTOCOL',
    description: 'Decentralized social network built on blockchain with encrypted messaging, NFT avatars, and DAO governance.',
    tags: ['Vue.js', 'Ethereum', 'IPFS', 'WebRTC'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: 2023,
  },
  {
    id: '04',
    title: 'MATRIX_OS',
    description: 'Browser-based operating system simulation with custom terminal, file manager, and immersive cyberpunk aesthetics.',
    tags: ['TypeScript', 'Canvas API', 'WebAssembly'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: 2023,
  },
]

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'Three.js / R3F', level: 80, category: '3d' },
  { name: 'GSAP / Anime.js', level: 85, category: 'frontend' },
  { name: 'Node.js', level: 78, category: 'backend' },
  { name: 'Python', level: 72, category: 'backend' },
  { name: 'WebGL / GLSL', level: 65, category: '3d' },
  { name: 'Blender', level: 60, category: '3d' },
  { name: 'Docker / DevOps', level: 70, category: 'tools' },
  { name: 'Figma / UI Design', level: 82, category: 'tools' },
]

export const PERSONAL_INFO = {
  name: 'KATON',
  title: 'CREATIVE DEVELOPER',
  subtitle: 'Full-Stack • 3D • Interactive',
  bio: `I craft immersive digital experiences at the intersection of code and creativity. 
  Specializing in high-performance web applications, 3D interactive worlds, and 
  cutting-edge UI that pushes the boundaries of what's possible in the browser.`,
  location: 'JAKARTA, INDONESIA',
  email: 'katon@cyber.dev',
  github: 'https://github.com/katondev',
  linkedin: 'https://linkedin.com/in/katondev',
}
