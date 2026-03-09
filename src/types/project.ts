export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  year: number
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'tools' | '3d' | 'other'
  icon?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  category: 'frontend' | 'backend' | 'cloud' | 'design' | 'other'
}
