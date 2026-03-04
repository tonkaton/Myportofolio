import { useEffect, useRef } from 'react'
import { useGlobalStore } from '../store/useGlobalStore'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export const useGlobalKeyboard = () => {
  const store = useGlobalStore

  // Refs so listener never needs to re-register
  const terminalRef = useRef(useGlobalStore.getState().isTerminalOpen)
  const glitchRef   = useRef(useGlobalStore.getState().isGlitchMode)

  useEffect(() => {
    // Keep refs in sync with store without causing re-renders
    const unsub = useGlobalStore.subscribe((s) => {
      terminalRef.current = s.isTerminalOpen
      glitchRef.current   = s.isGlitchMode
    })

    let konamiProgress = 0
    let konamiTimer: ReturnType<typeof setTimeout>

    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA'

      if (e.key === '`' && !inInput) {
        e.preventDefault()
        store.getState().setIsTerminalOpen(!terminalRef.current)
        return
      }

      if (e.key === KONAMI[konamiProgress]) {
        konamiProgress++
        clearTimeout(konamiTimer)
        konamiTimer = setTimeout(() => { konamiProgress = 0 }, 2000)
        if (konamiProgress === KONAMI.length) {
          konamiProgress = 0
          triggerKonami(store.getState().setIsGlitchMode, glitchRef.current)
        }
      } else {
        konamiProgress = 0
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearTimeout(konamiTimer)
      unsub()
    }
  }, []) // Empty deps — listener registered ONCE only
}

const triggerKonami = (setIsGlitchMode: (v: boolean) => void, current: boolean) => {
  const flash = document.createElement('div')
  flash.style.cssText = `position:fixed;inset:0;z-index:99998;pointer-events:none;
    background:linear-gradient(135deg,rgba(0,255,255,0.3),rgba(255,0,255,0.3));
    animation:konami-flash 0.8s ease forwards;`
  document.body.appendChild(flash)

  const style = document.createElement('style')
  style.textContent = `@keyframes konami-flash {
    0%{opacity:1;transform:skewX(-5deg)} 50%{opacity:0.5;transform:skewX(3deg)} 100%{opacity:0;transform:skewX(0)}
  }`
  document.head.appendChild(style)
  setTimeout(() => { flash.remove(); style.remove() }, 900)

  setIsGlitchMode(!current)

  const msg = document.createElement('div')
  msg.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    z-index:99999;font-family:monospace;font-size:clamp(14px,2vw,20px);
    color:#00ffff;text-shadow:0 0 20px #00ffff;text-align:center;
    pointer-events:none;letter-spacing:0.2em;animation:konami-msg 2.5s ease forwards;`
  msg.textContent = '⬆⬆⬇⬇⬅➡⬅➡ B A — CHEAT CODE ACTIVATED'
  document.body.appendChild(msg)

  const msgStyle = document.createElement('style')
  msgStyle.textContent = `@keyframes konami-msg {
    0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)}
    20%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}
    80%{opacity:1;transform:translate(-50%,-50%) scale(1)}
    100%{opacity:0;transform:translate(-50%,-50%) scale(0.9)}
  }`
  document.head.appendChild(msgStyle)
  setTimeout(() => { msg.remove(); msgStyle.remove() }, 2600)
}
