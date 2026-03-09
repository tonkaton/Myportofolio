import { EffectComposer, Bloom } from "@react-three/postprocessing"

const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches

export const SceneEffects = () => (
  <EffectComposer multisampling={0} enableNormalPass={false}>
    <Bloom
      intensity={isMobile ? 0.6 : 1.0}
      luminanceThreshold={0.15}
      luminanceSmoothing={0.7}
      mipmapBlur
      radius={isMobile ? 0.3 : 0.6}
    />
  </EffectComposer>
)
