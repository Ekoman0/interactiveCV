import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#about',    label: '01 // Hakkımda' },
    { href: '#games',    label: '02 // Oyunlar'  },
    { href: '#projects', label: '03 // Projeler' },
    { href: '#skills',   label: '04 // Yetenekler' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-logo" href="#hero">ED_</a>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta-link" onClick={() => setOpen(false)}>
            İletişim →
          </a>
        </li>
      </ul>

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menü"
      >
        <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
      </button>
    </nav>
  )
}
