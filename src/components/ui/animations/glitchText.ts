export const triggerGlitch = (element: HTMLElement, duration = 600) => {
  const original = element.textContent || ''
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`01'
  
  let frame = 0
  const totalFrames = Math.floor(duration / 16)
  
  const animate = () => {
    if (frame >= totalFrames) {
      element.textContent = original
      return
    }
    
    const progress = frame / totalFrames
    
    element.textContent = original
      .split('')
      .map((char, i) => {
        // Restore characters progressively left to right
        const threshold = (i / original.length)
        if (progress > threshold + 0.3) return char
        if (char === ' ') return char
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')
    
    frame++
    requestAnimationFrame(animate)
  }
  
  animate()
}

export const startGlitchLoop = (element: HTMLElement, interval = 5000) => {
  const timer = setInterval(() => triggerGlitch(element, 400), interval)
  return () => clearInterval(timer)
}
