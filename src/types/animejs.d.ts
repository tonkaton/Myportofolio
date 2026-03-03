declare module 'animejs' {
  interface AnimeParams {
    targets?: any
    duration?: number
    delay?: number | Function
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

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance
    stagger(value: number | string, options?: object): Function
    timeline(params?: AnimeParams): AnimeInstance
    set(targets: any, props: object): void
    get(targets: any, prop: string): string | number
    remove(targets: any): void
    running: AnimeInstance[]
    easings: { [key: string]: Function }
  }

  const anime: AnimeStatic
  export default anime
}
