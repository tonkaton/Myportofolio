import { create } from "zustand"

interface GlobalStore {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  currentSection: string
  setCurrentSection: (section: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (v: boolean) => void
  cursorPosition: { x: number; y: number }
  setCursorPosition: (pos: { x: number; y: number }) => void
  sceneReady: boolean
  setSceneReady: (v: boolean) => void
  // New features
  isTerminalOpen: boolean
  setIsTerminalOpen: (v: boolean) => void
  isGlitchMode: boolean
  setIsGlitchMode: (v: boolean) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  currentSection: "home",
  setCurrentSection: (section) => set({ currentSection: section }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),
  cursorPosition: { x: 0, y: 0 },
  setCursorPosition: (pos) => set({ cursorPosition: pos }),
  sceneReady: false,
  setSceneReady: (v) => set({ sceneReady: v }),
  isTerminalOpen: false,
  setIsTerminalOpen: (v) => set({ isTerminalOpen: v }),
  isGlitchMode: false,
  setIsGlitchMode: (v) => set({ isGlitchMode: v }),
}))
