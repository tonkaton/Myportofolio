import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const slideUp = (
  targets: Element | NodeList | string,
  stagger = 0.1,
  trigger?: Element | string
) => {
  const toConfig: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger,
    ease: 'power3.out',
  }

  if (trigger) {
    toConfig.scrollTrigger = {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  }

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 50 },
    toConfig
  )
}

export const revealLeft = (
  target: Element | string,
  trigger?: Element | string
) => {
  const toConfig: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration: 0.9,
    ease: 'power3.out',
  }

  if (trigger) {
    toConfig.scrollTrigger = {
      trigger,
      start: 'top 80%',
    }
  }

  return gsap.fromTo(target, { opacity: 0, x: -60 }, toConfig)
}
