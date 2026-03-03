// @ts-ignore
import anime from 'animejs'


export const createGlitchAnimation = (target: Element | string) => {
  return anime({
    targets: target,
    keyframes: [
      { skewX: 0, opacity: 1 },
      { skewX: -5, opacity: 0.8, duration: 50 },
      { skewX: 5, opacity: 1, duration: 50 },
      { skewX: 0, opacity: 0.9, duration: 50 },
      { skewX: -3, opacity: 1, duration: 50 },
      { skewX: 0, opacity: 1, duration: 100 },
    ],
    easing: 'linear',
    loop: false,
    autoplay: false,
  })
}

export const createScanlineAnimation = (target: Element | string) => {
  return anime({
    targets: target,
    translateY: ['-100%', '100%'],
    duration: 2000,
    easing: 'linear',
    loop: true,
    autoplay: false,
  })
}

export const createFadeInAnimation = (
  target: Element | string | NodeList,
  delay = 0
) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutExpo',
    delay,
    autoplay: false,
  })
}

export const createStaggerAnimation = (
  target: Element | string | NodeList,
  staggerDelay = 100
) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 700,
    easing: 'easeOutExpo',
    delay: anime.stagger(staggerDelay),
    autoplay: false,
  })
}

export const createTypewriterAnimation = (
  target: Element | string,
  text: string
) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  let i = 0
  el.textContent = ''

  const interval = setInterval(() => {
    el.textContent += text[i]
    i++
    if (i >= text.length) clearInterval(interval)
  }, 50)

  return () => clearInterval(interval)
}
