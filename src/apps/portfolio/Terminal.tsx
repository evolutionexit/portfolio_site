import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Terminal.module.css'

interface Line {
  type: 'ps1' | 'output' | 'accent' | 'dim' | 'err' | 'warn' | 'info' | 'blank'
  text: string
}

function ps1Line(cmd: string): Line[] {
  return [{ type: 'ps1', text: cmd }]
}

function out(...lines: [Line['type'], string][]): Line[] {
  return lines.map(([type, text]) => ({ type, text }))
}

const PROJECTS = [
  { name: 'Adaline', status: 'active', desc: 'firmware C + React dashboard' },
  { name: 'portfolio_site', status: 'live', desc: 'React + Vite + TS + i18n' },
  { name: 'CartPole-PPO', status: 'done', desc: 'Q-Learning vs PPO — PyTorch' },
  { name: 'Louvre3D', status: 'done', desc: 'tour virtuel — NSI Olympiades' },
]

type CommandFn = (args: string) => { lines: Line[]; navigate?: string; open?: string }

const COMMANDS: Record<string, CommandFn> = {
  help: () => ({ lines: out(
    ['accent', 'available commands:'],
    ['blank', ''],
    ['info',   '  Navigation'],
    ['output', '  home         →  page d\'accueil'],
    ['output', '  projets      →  voir mes projets'],
    ['output', '  about        →  à propos de moi'],
    ['output', '  contact      →  me contacter'],
    ['blank', ''],
    ['info',   '  Info'],
    ['output', '  whoami       →  qui suis-je ?'],
    ['output', '  ls           →  lister les projets'],
    ['output', '  stack        →  ma stack technique'],
    ['output', '  github       →  ouvrir GitHub'],
    ['output', '  cv           →  télécharger le CV'],
    ['blank', ''],
    ['info',   '  Fun'],
    ['output', '  sudo         →  escalade de privilèges'],
    ['output', '  neofetch     →  system info'],
    ['output', '  clear        →  effacer le terminal'],
    ['blank', ''],
  )}),

  whoami: () => ({ lines: out(
    ['output', 'Michel Moors'],
    ['blank',  ''],
    ['info',   '  Développeur embarqué & web.'],
    ['info',   '  Je construis des systèmes matériel-logiciel.'],
    ['info',   '  Bientôt à l\'UNIGE → en route vers l\'EPFL.'],
    ['blank',  ''],
    ['dim',    '  uid=1000(mmoors) gid=1000(mmoors) groups=sudo'],
    ['blank',  ''],
  )}),

  ls: () => ({ lines: [
    { type: 'accent', text: 'projects/' },
    { type: 'blank',  text: '' },
    ...PROJECTS.map(p => ({
      type: 'output' as Line['type'],
      text: `  drwxr-xr-x  ${p.name.padEnd(18)} [${p.status.padEnd(6)}]  ${p.desc}`,
    })),
    { type: 'blank',  text: '' },
    { type: 'dim',    text: `${PROJECTS.length} directories` },
    { type: 'blank',  text: '' },
  ]}),

  stack: () => ({ lines: out(
    ['accent', 'tech stack:'],
    ['blank',  ''],
    ['info',   '  Embedded'],
    ['output', '  C · TinyUSB · lwIP · CMake · Pico SDK'],
    ['blank',  ''],
    ['info',   '  Backend / Infra'],
    ['output', '  Python · Mosquitto MQTT · Cloudflare Tunnel · Linux'],
    ['blank',  ''],
    ['info',   '  Frontend'],
    ['output', '  React · TypeScript · Vite · CSS Modules'],
    ['blank',  ''],
    ['info',   '  ML'],
    ['output', '  PyTorch · Gymnasium · PPO · Q-Learning'],
    ['blank',  ''],
  )}),

  github: () => ({ lines: out(
    ['accent', 'opening github.com/evolutionexit ...'],
    ['blank',  ''],
  ), open: 'https://github.com/evolutionexit' }),

  cv: () => ({ lines: out(
    ['accent', 'downloading cv.pdf ...'],
    ['blank',  ''],
  ), open: '/cv.pdf' }),

  sudo: () => ({ lines: out(
    ['warn', '[sudo] password for mmoors:'],
    ['err',  'mmoors is not in the sudoers file. This incident will be reported.'],
    ['blank', ''],
  )}),

  neofetch: () => ({ lines: out(
    ['blank',  ''],
    ['accent', '         .´´´´´`.        mmoors@debian'],
    ['accent', '        /  ·   · \\       -------------'],
    ['accent', '       |    ___   |       OS: Debian GNU/Linux 12'],
    ['accent', '        \\  \\___/ /        Host: Raspberry Pi 5'],
    ['accent', '         `._____´         Shell: bash 5.2.15'],
    ['blank',  ''],
    ['output', '  Location   Haute-Savoie, FR'],
    ['output', '  School     UNIGE (incoming)'],
    ['output', '  Goal       EPFL / ETH MSc'],
    ['output', '  Hobbies    chess · sports · embedded systems'],
    ['blank',  ''],
  )}),

  home:     () => ({ lines: out(['accent', '→ navigating to /...']),     navigate: '/' }),
  projets:  () => ({ lines: out(['accent', '→ navigating to /projects...']), navigate: '/projects' }),
  projects: () => ({ lines: out(['accent', '→ navigating to /projects...']), navigate: '/projects' }),
  about:    () => ({ lines: out(['accent', '→ navigating to /about...']),    navigate: '/about' }),
  contact:  () => ({ lines: out(['accent', '→ navigating to /contact...']),  navigate: '/contact' }),
}

const BOOT_LINES: Line[] = [
  { type: 'dim',   text: 'Debian GNU/Linux 12 (bookworm)' },
  { type: 'dim',   text: 'Last login: Mon Jun 15 09:41:22 2026' },
  { type: 'blank', text: '' },
  { type: 'info',  text: '  Bienvenue. Type `help` to see available commands.' },
  { type: 'blank', text: '' },
]

export default function Terminal() {
  const navigate = useNavigate()
  const [lines, setLines] = useState<Line[]>(BOOT_LINES)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setHistory(h => [raw, ...h])
    setHistIdx(-1)

    const newLines: Line[] = [...ps1Line(raw)]

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const handler = COMMANDS[cmd]
    if (handler) {
      const result = handler(cmd)
      newLines.push(...result.lines)
      if (result.navigate) {
        setTimeout(() => navigate(result.navigate!), 350)
      }
      if (result.open) {
        setTimeout(() => window.open(result.open, '_blank', 'noopener'), 350)
      }
    } else {
      newLines.push(
        { type: 'err',    text: `bash: ${cmd}: command not found` },
        { type: 'dim',    text: 'Type `help` to see available commands.' },
        { type: 'blank',  text: '' },
      )
    }

    setLines(l => [...l, ...newLines])
  }, [navigate])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistory(h => {
        const next = Math.min(histIdx + 1, h.length - 1)
        setHistIdx(next)
        if (h[next] !== undefined) setInput(h[next])
        return h
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      setHistIdx(next)
      setInput(next < 0 ? '' : history[next] ?? '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.toLowerCase()
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial) && k !== partial)
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      <div className={styles.titlebar}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.tbTitle}>mmoors@debian — bash</span>
      </div>

      <div className={styles.body} ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type]}`}>
            {line.type === 'ps1'
              ? <><span className={styles.ps1text}>mmoors@debian:~$</span>{' '}{line.text}</>
              : line.text || '\u00A0'
            }
          </div>
        ))}
      </div>

      <div className={styles.inputRow}>
        <span className={styles.promptLabel}>mmoors@debian:~$&nbsp;</span>
        <input
          ref={inputRef}
          className={styles.inp}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="type a command..."
          aria-label="terminal input"
        />
      </div>

      <div className={styles.hint}>
        try:&nbsp; help &nbsp;·&nbsp; ls &nbsp;·&nbsp; projets &nbsp;·&nbsp; whoami &nbsp;·&nbsp; stack &nbsp;·&nbsp; neofetch
      </div>
    </div>
  )
}
