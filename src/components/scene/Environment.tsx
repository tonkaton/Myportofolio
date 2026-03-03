import { Environment as DreiEnvironment } from '@react-three/drei'

export const Environment = () => {
  return (
    <DreiEnvironment
      preset="night"
      background={false}
    />
  )
}
