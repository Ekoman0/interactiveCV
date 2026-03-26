import { useEffect, useRef } from 'react'

export default function Stars() {
  const containerRef = useRef(null)

  useEffect(() => {
    const stars = []
    const count = 80
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = Math.random() * 100 + 'vw'
      star.style.top = Math.random() * 100 + 'vh'
      star.style.setProperty('--dur', (Math.random() * 4 + 2) + 's')
      star.style.setProperty('--delay', (Math.random() * 5) + 's')
      star.style.setProperty('--max-opacity', (Math.random() * 0.5 + 0.2).toFixed(2))
      star.style.width = (Math.random() * 2 + 1) + 'px'
      star.style.height = star.style.width
      document.body.appendChild(star)
      stars.push(star)
    }
    return () => stars.forEach(s => s.remove())
  }, [])

  return null
}
