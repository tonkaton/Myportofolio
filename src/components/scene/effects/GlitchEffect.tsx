import { Glitch } from "@react-three/postprocessing"
import { GlitchMode } from "postprocessing"
import { Vector2 } from "three"

export const GlitchEffect = () => {
  return (
    <Glitch
      delay={new Vector2(8, 15)}
      duration={new Vector2(0.1, 0.3)}
      strength={new Vector2(0.05, 0.1)}
      mode={GlitchMode.SPORADIC}
      active
      ratio={0.85}
    />
  )
}
