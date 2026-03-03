/// <reference types="vite/client" />

declare module '*.glb' {
  const src: string
  export default src
}

declare module '*.gltf' {
  const src: string
  export default src
}

declare module '*.ttf' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

// animejs v3 type declaration (no @types/animejs available)
declare module 'animejs' {
  interface AnimeParams {
    targets?: any
    duration?: number
    delay?: number | ((el: Element, i: number, total: number) => number)
    loop?: boolean | number
    direction?: 'normal' | 'reverse' | 'alternate'
    easing?: string
    autoplay?: boolean
    keyframes?: object[]
    [key: string]: any
  }

  interface AnimeInstance {
    play(): void
    pause(): void
    restart(): void
    reverse(): void
    seek(time: number): void
    finished: Promise<void>
  }

  interface StaggerOptions {
    start?: number | string
    direction?: 'normal' | 'reverse'
    easing?: string
    grid?: [number, number]
    axis?: 'x' | 'y'
    from?: number | string
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance
    stagger(value: number | string, options?: StaggerOptions): (el: Element, i: number) => number
    timeline(params?: AnimeParams): AnimeInstance & { add(params: AnimeParams, offset?: number | string): AnimeInstance }
    set(targets: any, props: object): void
    get(targets: any, prop: string): string | number
    remove(targets: any): void
    running: AnimeInstance[]
    easings: { [key: string]: Function }
  }

  const anime: AnimeStatic
  export default anime
}
