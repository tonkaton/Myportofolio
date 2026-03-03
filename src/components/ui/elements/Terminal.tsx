import { useState, useEffect, useRef } from 'react'
import { useGlobalStore } from '../../../store/useGlobalStore'
import { PERSONAL_INFO, PROJECTS, SKILLS } from '../../../lib/constants'

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system'
  text: string
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '┌─────────────────────────────────────┐',
    '│  AVAILABLE COMMANDS                 │',
    '├─────────────────────────────────────┤',
    '│  whoami      — about me             │',
    '│  ls projects — list all projects    │',
    '│  skills      — view skill matrix    │',
    '│  contact     — get contact info     │',
    '│  social      — social links         │',
    '│  clear       — clear terminal       │',
    '│  exit        — close terminal       │',
    '│  glitch      — toggle glitch mode   │',
    '└─────────────────────────────────────┘',
  ],
  whoami: () => [
    `> ${PERSONAL_INFO.name}`,
    `> ${PERSONAL_INFO.title}`,
    `> ${PERSONAL_INFO.bio}`,
    `> LOCATION: ${PERSONAL_INFO.location}`,
    `> STATUS: AVAILABLE FOR WORK`,
  ],
  'ls projects': () => PROJECTS.map((p, i) =>
    `[${String(i + 1).padStart(2, '0')}] ${p.title.padEnd(30)} ${p.tags.slice(0, 2).join(' | ')}`
  ),
  skills: () => {
    const cats = [...new Set(SKILLS.map(s => s.category))]
    return cats.flatMap(cat => [
      `\n── ${cat.toUpperCase()} ──`,
      ...SKILLS.filter(s => s.category === cat).map(s =>
        `  ${s.name.padEnd(20)} [${'█'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))}] ${s.level}%`
      )
    ])
  },
  contact: () => [
    `EMAIL   : ${PERSONAL_INFO.email}`,
    `GITHUB  : github.com/${PERSONAL_INFO.github}`,
    `LOCATION: ${PERSONAL_INFO.location}`,
  ],
  social: () => [
    `GITHUB  : github.com/${PERSONAL_INFO.github}`,
    `TYPE 'contact' FOR MORE INFO`,
  ],
  clear: () => ['__CLEAR__'],
  exit: () => ['__EXIT__'],
  glitch: () => ['__GLITCH__', 'GLITCH MODE TOGGLED'],
}

const BOOT_SEQUENCE = [
  'KATONPORTO OS v2.0.77 [BUILD 2077]',
  'Copyright (c) 2077 KATON SYSTEMS INC.',
  '',
  'Initializing neural interface...',
  'Loading portfolio data... [OK]',
  'Establishing secure connection... [OK]',
  '',
  'Type "help" for available commands.',
  '',
]

export const Terminal = () => {
  const isOpen = useGlobalStore((s) => s.isTerminalOpen)
  const setIsOpen = useGlobalStore((s) => s.setIsTerminalOpen)
  const setIsGlitchMode = useGlobalStore((s) => s.setIsGlitchMode)
  const isGlitchMode = useGlobalStore((s) => s.isGlitchMode)

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [booted, setBooted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Boot sequence on first open
  useEffect(() => {
    if (isOpen && !booted) {
      setBooted(true)
      let delay = 0
      BOOT_SEQUENCE.forEach((text, i) => {
        setTimeout(() => {
          setLines(prev => [...prev, { type: 'system', text }])
        }, delay)
        delay += i < 3 ? 60 : 120
      })
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, booted])

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines: TerminalLine[] = [{ type: 'input', text: `> ${cmd}` }]

    if (!trimmed) {
      setLines(prev => [...prev, ...newLines])
      return
    }

    const fn = COMMANDS[trimmed]
    if (fn) {
      const result = fn()
      if (result[0] === '__CLEAR__') {
        setLines([])
        return
      }
      if (result[0] === '__EXIT__') {
        setIsOpen(false)
        return
      }
      if (result[0] === '__GLITCH__') {
        setIsGlitchMode(!isGlitchMode)
        newLines.push({ type: 'output', text: result[1] })
      } else {
        result.forEach(text => newLines.push({ type: 'output', text }))
      }
    } else {
      newLines.push({ type: 'error', text: `Command not found: ${trimmed}. Type 'help' for commands.` })
    }

    setLines(prev => [...prev, ...newLines])
    setHistory(prev => [cmd, ...prev.slice(0, 49)])
    setHistoryIdx(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : history[next])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}
    >
      <div style={{
        width: 'min(700px, 92vw)',
        height: 'min(500px, 80vh)',
        background: 'rgba(0, 8, 12, 0.97)',
        border: '1px solid var(--cyan)',
        boxShadow: '0 0 40px rgba(0,255,255,0.2), inset 0 0 40px rgba(0,255,255,0.02)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        fontSize: '0.78rem',
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(0,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: 'var(--cyan)', letterSpacing: '0.2em', fontSize: '0.7rem' }}>
            KATONPORTO_TERMINAL v2.077
          </span>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '2px 8px', cursor: 'none', fontSize: '0.65rem', letterSpacing: '0.1em' }}
          >
            [ESC] CLOSE
          </button>
        </div>

        {/* Output */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line.type === 'input'  ? 'var(--cyan)'
                   : line.type === 'error'  ? 'var(--magenta)'
                   : line.type === 'system' ? 'rgba(0,255,255,0.5)'
                   : 'var(--text-primary)',
              whiteSpace: 'pre',
              lineHeight: 1.6,
              textShadow: line.type === 'input' ? '0 0 8px var(--cyan)' : 'none',
            }}>
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,255,255,0.02)',
        }}>
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 8px var(--cyan)', userSelect: 'none' }}>
            {PERSONAL_INFO.name.toLowerCase()}@portfolio:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--cyan)', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              caretColor: 'var(--cyan)', cursor: 'text',
            }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
