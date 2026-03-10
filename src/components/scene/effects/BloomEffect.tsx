import { EffectComposer, Bloom } from "@react-three/postprocessing"

const isMobile = window.matchMedia("(max-width: 768px)").matches

export const BloomEffect = ({ degraded = false }: { degraded?: boolean }) => {
  return (
    <EffectComposer multisampling={degraded ? 0 : 4}>
      <Bloom
        intensity={degraded ? 0.8 : 1.5}
        luminanceThreshold={degraded ? 0.4 : 0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={degraded ? 0.4 : 0.8}
      />
    </EffectComposer>
  )
}