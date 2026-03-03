export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
  return clamp(mapped, outMin, outMax)
}

export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min

export const randomInt = (min: number, max: number): number =>
  Math.floor(randomBetween(min, max + 1))

export const degToRad = (deg: number): number => (deg * Math.PI) / 180

export const isMobile = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ')
