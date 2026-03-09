import { useGlobalStore, type CursorMode } from '../../../store/useGlobalStore'

const MODES: { mode: CursorMode; label: string; icon: string; color: string }[] = [
  { mode: 'default',   label: 'NEON RING', icon: '◎', color: '#00ffff' },
  { mode: 'laser',     label: 'LASER',     icon: '⊕', color: '#ff0040' },
  { mode: 'crosshair', label: 'CROSSHAIR', icon: '⊞', color: '#ffff00' },
  { mode: 'neon',      label: 'MAGENTA',   icon: '◉', color: '#ff00ff' },
]

export const CursorModeSwitcher = () => {
  const { cursorMode, setCursorMode } = useGlobalStore()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {MODES.map(({ mode, label, icon, color }) => {
        const active = cursorMode === mode
        return (
          <button
            key={mode}
            title={label}
            onClick={() => setCursorMode(mode)}
            style={{
              width: '26px', height: '26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? `${color}18` : 'transparent',
              border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
              color: active ? color : 'rgba(255,255,255,0.3)',
              fontSize: '0.85rem',
              cursor: 'none',
              transition: 'all 0.2s ease',
              boxShadow: active ? `0 0 8px ${color}50` : 'none',
              clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
            }}
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}
