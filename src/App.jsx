import { useEffect, useRef, useState, useCallback, Component } from 'react'
import Navbar from './components/Navbar'
import BootScreen from './components/BootScreen'
import TerminalOverlay from './components/TerminalOverlay'
import Hero from './components/Hero'
import About from './components/About'
import Games from './components/Games'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { err: null } }
  static getDerivedStateFromError(e) { return { err: e } }
  componentDidCatch(e) { console.error('Hero crash:', e) }
  render() {
    if (this.state.err) return (
      <div style={{ color:'#c8ff41', fontFamily:'monospace', padding:32 }}>
        <div>Hero hatası: {this.state.err.message}</div>
      </div>
    )
    return this.props.children
  }
}

function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const move = e => {
      if (dot.current)  { dot.current.style.left  = e.clientX+'px'; dot.current.style.top  = e.clientY+'px' }
      if (ring.current) { ring.current.style.left = e.clientX+'px'; ring.current.style.top = e.clientY+'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}



export default function App() {
  const [booted,     setBooted]     = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const handleEnterPC = useCallback(() => {
    if (transitioning || portfolioOpen) return
    setTransitioning(true)
  }, [transitioning, portfolioOpen])

  const handleTransitionDone = useCallback(() => {
    setTransitioning(false)
    setPortfolioOpen(true)
    // Küçük gecikme ile smooth scroll
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  useEffect(() => {
    if (!portfolioOpen) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [portfolioOpen])

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <CustomCursor />
      <BootScreen onDone={() => setBooted(true)} />

      {booted && (
        <>
          {/* RPG Oda — Unity WebGL */}
          <section style={{
            position: portfolioOpen ? 'relative' : 'fixed',
            inset: portfolioOpen ? 'auto' : 0,
            width: '100%',
            height: '100vh',
            zIndex: portfolioOpen ? 'auto' : 100,
          }}>
            <ErrorBoundary>
              <Hero onEnterPC={handleEnterPC} />
            </ErrorBoundary>
          </section>

          {/* Etkileşimli Terminal */}
          {transitioning && <TerminalOverlay onDone={handleTransitionDone} onCancel={() => setTransitioning(false)} />}

          {/* Portfolio içeriği */}
          {portfolioOpen && (
            <>
              <Navbar />
              <main>
                <About />
                <Games />
                <Projects />
                <Skills />
                <Contact />
              </main>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  )
}
