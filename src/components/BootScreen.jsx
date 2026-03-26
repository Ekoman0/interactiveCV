import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'INITIALIZING PORTFOLIO SYSTEM...',
  'LOADING GAME ENGINE MODULES...',
  'IMPORTING PROJECT DATABASE...',
  'COMPILING SKILL TREE...',
  'SYSTEM READY.',
]

export default function BootScreen({ onDone }) {
  const [pct, setPct] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    // Progress bar
    const barTimer = setTimeout(() => {
      setPct(100)
    }, 80)

    // Rotate lines every 400ms
    const lineTimer = setInterval(() => {
      setLineIdx(i => (i + 1) % BOOT_LINES.length)
    }, 380)

    // Hide after 2.2s
    const hideTimer = setTimeout(() => {
      setHiding(true)
      setTimeout(onDone, 700)
    }, 2200)

    return () => {
      clearTimeout(barTimer)
      clearInterval(lineTimer)
      clearTimeout(hideTimer)
    }
  }, [onDone])

  return (
    <div className={`boot-screen ${hiding ? 'hidden' : ''}`}>
      <div className="boot-logo">ED_</div>
      <div className="boot-bar-wrap">
        <div className="boot-label">ERKAN DURSUN — PORTFOLIO v2.0</div>
        <div className="boot-bar">
          <div className={`boot-bar-fill ${pct ? 'go' : ''}`} />
        </div>
        <div className="boot-text">&gt; {BOOT_LINES[lineIdx]}</div>
      </div>
    </div>
  )
}
