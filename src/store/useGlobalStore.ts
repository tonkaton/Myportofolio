import { create } from "zustand"

export type CursorMode = 'default' | 'laser' | 'crosshair' | 'neon'

interface GlobalStore {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (v: boolean) => void
  sceneReady: boolean
  setSceneReady: (v: boolean) => void
  isTerminalOpen: boolean
  setIsTerminalOpen: (v: boolean) => void
  isGlitchMode: boolean
  setIsGlitchMode: (v: boolean) => void
  cursorMode: CursorMode
  setCursorMode: (m: CursorMode) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),
  sceneReady: false,
  setSceneReady: (v) => set({ sceneReady: v }),
  isTerminalOpen: false,
  setIsTerminalOpen: (v) => set({ isTerminalOpen: v }),
  isGlitchMode: false,
  setIsGlitchMode: (v) => set({ isGlitchMode: v }),
  cursorMode: 'default',
  setCursorMode: (m) => set({ cursorMode: m }),
}))
