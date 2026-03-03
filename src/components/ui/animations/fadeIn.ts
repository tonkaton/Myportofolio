import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeIn = (
  target: Element | string,
  options: {
    delay?: number
    duration?: number
    y?: number
    x?: number
    scrollTrigger?: Element | string
  } = {}
) => {
  const { delay = 0, duration = 0.8, y = 30, x = 0, scrollTrigger } = options

  const config: gsap.TweenVars = {
    opacity: 0,
    y,
    x,
  }

  const toConfig: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    x: 0,
    duration,
    delay,
    ease: 'power3.out',
  }

  if (scrollTrigger) {
    toConfig.scrollTrigger = {
      trigger: scrollTrigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }

  return gsap.fromTo(target, config, toConfig)
}
