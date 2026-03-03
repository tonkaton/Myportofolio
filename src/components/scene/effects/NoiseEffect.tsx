import { Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export const NoiseEffect = () => {
  return (
    <>
      <Noise
        opacity={0.04}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </>
  )
}
