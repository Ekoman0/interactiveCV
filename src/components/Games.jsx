import { useState, useRef } from 'react'

const GAMES = [
  {
    id: 'zombie-defense',
    name: 'Zombie Defense',
    type: '3D // Strateji',
    desc: 'Zombilere karşı savunma hattı kur! Unity C# ile geliştirilmiş 3 boyutlu strateji oyunu.',
    emoji: '🧟',
    iconUrl: 'https://appetizeio-static.s3.amazonaws.com/icons/ilhfzbac5vmppnvp7bppdvyyra_icon.png',
    bg: 'radial-gradient(ellipse at 50% 30%, #3d0000 0%, #1a0000 60%, #0d0007 100%)',
    tags: ['Unity', 'C#', 'Android', '3D', 'Strateji'],
    playUrl: 'https://appetize.io/app/b_gmfkmpgnwioixjaqmwjrbat5s4',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.AnanassGames.ZombieDefense'
  },
  {
    id: 'make-juice',
    name: 'Make Juice',
    type: '2D // Bulmaca',
    desc: 'Meyve suyu tarifleri ve eğlenceli bulmacalarla dolu renkli 2D Unity oyunu.',
    emoji: '🍊',
    iconUrl: 'https://appetizeio-static.s3.amazonaws.com/icons/72xg3zqvbdefidv2f4j7la75ii_icon.png',
    bg: 'radial-gradient(ellipse at 50% 30%, #3d1f00 0%, #1a0e00 60%, #0d0a00 100%)',
    tags: ['Unity', 'C#', 'Android', '2D', 'Bulmaca'],
    playUrl: 'https://appetize.io/app/b_ewrk5snuzaa3msoiw336ctvkni',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.DefaultCompany.MakeJuiceBerry'
  },
  {
    id: 'truck-station',
    name: 'Truck Station Control',
    type: '2D // Bulmaca',
    desc: 'Tır istasyonunu yönet, yükleri doğru rotalara ilet. Strateji ve bulmaca bir arada.',
    emoji: '🚛',
    iconUrl: 'https://appetizeio-static.s3.amazonaws.com/icons/l6lb3uxscrr2ujucbaxjix6qny_icon.png',
    bg: 'radial-gradient(ellipse at 50% 30%, #001833 0%, #000d1a 60%, #00070d 100%)',
    tags: ['Unity', 'C#', 'Android', '2D', 'Bulmaca'],
    playUrl: 'https://appetize.io/app/b_vov3faj3yuu6fqdv73e5ubv3wm',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.TruckStationControl.com.unity.template.mobile2D'
  },
  {
    id: 'mine-wife',
    name: 'Mine Wife',
    type: '2D // Simülasyon',
    desc: 'Madenci hayatını simüle et, işleri organize et, aileyle zaman geçir.',
    emoji: '⛏️',
    iconUrl: null,
    bg: 'radial-gradient(ellipse at 50% 30%, #1a0033 0%, #0d001a 60%, #07000d 100%)',
    tags: ['Unity', 'C#', 'Android', '2D', 'Simülasyon'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.DefaultCompany.MineWife'
  },
  {
    id: 'core-defense',
    name: 'Core Defense',
    type: '2D // Strateji',
    desc: 'Çekirdeği savun! Düşman dalgalarına karşı gerçek zamanlı strateji kur.',
    emoji: '🛡️',
    iconUrl: 'https://appetizeio-static.s3.amazonaws.com/icons/dcxl3fiatkiqv74f42tji7cfue_icon.png',
    bg: 'radial-gradient(ellipse at 50% 30%, #001a08 0%, #000d04 60%, #000700 100%)',
    tags: ['Unity', 'C#', 'Android', '2D', 'Strateji'],
    playUrl: 'https://appetize.io/app/b_g4cgkdf4vmndnpeyum772nbpce',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.CorexDefense.com.unity.template.mobile2D'
  },
  {
    id: 'sheep-counter',
    name: 'Uyku Çiftliği Koyun Saymaca',
    type: '2D // Gündelik',
    desc: 'Uykuya dalmana yardımcı olacak rahatlatıcı koyun saymaca oyunu.',
    emoji: '🐑',
    iconUrl: 'https://appetizeio-static.s3.amazonaws.com/icons/mxy6v6myrcdadpfnztuyzpyi4a_icon.png',
    bg: 'radial-gradient(ellipse at 50% 30%, #0d1a33 0%, #070d1a 60%, #04070d 100%)',
    tags: ['Unity', 'C#', 'Android', '2D', 'Gündelik'],
    playUrl: 'https://appetize.io/app/b_4akrfzr4tqnslu37aar2csrldq',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.DefaultCompany.SheepCounterFarm'
  }
]

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' })
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Yatay ve Dikey düzlemde 0 ile 1 arası koordinat alma
    const px = (e.clientX - rect.left) / rect.width  
    const py = (e.clientY - rect.top) / rect.height
    
    // Abartısız olması için max dönüşü +-12 derece ayarlıyoruz.
    const rotateY = (px - 0.5) * 16
    const rotateX = (0.5 - py) * 16
    
    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none',
      zIndex: 10
    })
  }
  
  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      zIndex: 1
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

function Modal({ game, onClose }) {
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <span className="modal-head-title">// {game.name} — PLAY INFO</span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-content">
          <h3>{game.emoji} {game.name}</h3>
          <p>{game.desc}</p>
          <div className="modal-steps">
            <div className="modal-steps-title">// Nasıl Oynanır</div>
            <div className="modal-step">
              <span className="step-dot">1</span>
              <span>appetize.io'ya APK'yı yükle — ücretsiz hesap yeterli</span>
            </div>
            <div className="modal-step">
              <span className="step-dot">2</span>
              <span>Aldığın play linkini paylaş, biz de butona ekliyoruz</span>
            </div>
            <div className="modal-step">
              <span className="step-dot">3</span>
              <span>Ziyaretçiler tarayıcıdan dokunmatik simülasyonla oynuyor</span>
            </div>
          </div>
          <a
            href="https://appetize.io/upload"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lime"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            APK Yükle →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Games() {
  const [modal, setModal] = useState(null)

  return (
    <section id="games" className="games-section">
      <div className="games-inner">
        <div className="section-label">
          <span className="section-num">// 02</span>
          <div className="section-line" />
          <span className="section-name">Oyunlar</span>
        </div>

        <h2 className="big-title reveal">
          <span className="dim">GAME</span><br />
          <span className="bright">SELECT</span>
        </h2>

        <div className="games-scroll">
          {GAMES.map((g, i) => (
            <TiltCard
              className={`game-card reveal reveal-delay-${(i % 3) + 1}`}
              key={g.id}
            >
              <div className="game-card-top" style={{ '--game-bg': g.bg }}>
                {g.iconUrl ? (
                  <img src={g.iconUrl} alt={g.name} className="game-icon-img" />
                ) : (
                  <span className="game-emoji">{g.emoji}</span>
                )}
                <span className="game-hud-label">{g.type}</span>
                <span className={`game-play-indicator ${g.playUrl ? '' : 'offline'}`} />
              </div>
              <div className="game-card-body">
                <div className="game-card-name">{g.name}</div>
                <div className="game-card-desc">{g.desc}</div>
                <div className="game-tags">
                  {g.tags.map(t => <span className="game-tag" key={t}>{t}</span>)}
                </div>
                <div className="game-card-actions">
                  {g.playUrl ? (
                    <a
                      href={g.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm btn-sm-lime"
                    >
                      ▶ OYNA
                    </a>
                  ) : (
                    <button
                      className="btn-sm btn-sm-coming"
                      onClick={g.id === 'mine-wife' ? undefined : () => setModal(g)}
                      style={g.id === 'mine-wife' ? { cursor: 'default' } : {}}
                    >
                      🔜 YAKINDA
                    </button>
                  )}
                  {g.playStoreUrl && (
                    <a
                      href={g.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm btn-sm-ghost"
                      title="Google Play Store'dan İndir"
                      style={{ padding: '9px 12px' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </a>
                  )}
                  <a
                    href="https://github.com/Ekoman0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sm btn-sm-ghost"
                    title="GitHub"
                    style={{ padding: '9px 14px' }}
                  >
                    GH
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {modal && <Modal game={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
