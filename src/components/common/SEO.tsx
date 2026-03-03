import { useEffect } from 'react'
import { PERSONAL_INFO } from '../../lib/constants'

interface SEOProps {
  title?: string
  description?: string
}

export const SEO = ({
  title = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
  description = PERSONAL_INFO.bio.trim(),
}: SEOProps) => {
  useEffect(() => {
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }
  }, [title, description])

  return null
}
