import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Vector2 } from "three"
import { Fragment } from "react"

const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches

export const SceneEffects = () => (
  <EffectComposer multisampling={0} disableNormalPass>
    {/* Bloom — hanya pada pixel yang sangat terang (neon glow) */}
    <Bloom
      intensity={isMobile ? 0.6 : 1.0}
      luminanceThreshold={0.15}
      luminanceSmoothing={0.7}
      mipmapBlur
      radius={isMobile ? 0.3 : 0.6}
    />
    {/* Chromatic aberration hanya di desktop, tipis saja */}
    {isMobile ? (
      <Fragment />
    ) : (
      <ChromaticAberration
        offset={new Vector2(0.0008, 0.0008)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
    )}
  </EffectComposer>
)
