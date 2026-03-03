import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Vector2 } from "three"

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
      {!isMobile && !degraded && (
        <ChromaticAberration
          offset={new Vector2(0.002, 0.002)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
      )}
    </EffectComposer>
  )
}
