const PROJECTS = [
  {
    id: 'my-doctor',
    num: '01',
    icon: '🩺',
    name: 'My Doctor',
    desc: 'Hastaların doktorlarla randevu alıp online konsültasyon yapabildiği C# masaüstü uygulaması.',
    tags: ['C#', '.NET', 'SQL', 'WinForms', 'Sağlık'],
    color: 'var(--lime)',
    link: 'https://github.com/Ekoman0',
  },
  {
    id: 'iot-cat',
    num: '02',
    icon: '🐱',
    name: 'IoT Cat Litter Monitor',
    desc: 'ESP8266 + MQ135 ile çalışan IoT tabanlı kedi kum kutusu koku takip sistemi. Eşik aşılınca bildirim.',
    tags: ['ESP8266', 'IoT', 'MQ135', 'C++', 'Sensör'],
    color: '#41e0ff',
    link: 'https://github.com/Ekoman0',
  },
  {
    id: 'scrabble',
    num: '03',
    icon: '🔤',
    name: 'Scrabble Game',
    desc: 'Türkçe Scrabble\'ın gelişmiş versiyonu. İnternet üzerinden online veya offline oynanabilir.',
    tags: ['JavaScript', 'Socket.io', 'Web', 'Online', 'Oyun'],
    color: '#ec4899',
    link: 'https://github.com/Ekoman0',
  },
  {
    id: 'yorgunluk',
    num: '04',
    icon: '🚗',
    name: 'Yorgunluk Takip Sistemi',
    desc: 'Python + YOLO ile sürücü yorgunluk, telefon kullanımı, sigara, duman ve bayılma tespiti.',
    tags: ['Python', 'YOLO', 'OpenCV', 'AI', 'Gerçek Zamanlı'],
    color: '#f59e0b',
    link: 'https://github.com/Ekoman0',
  },
  {
    id: 'pota-track',
    num: '05',
    icon: '🏭',
    name: 'Pota Track',
    desc: 'Çelik fabrikaları için stajda geliştirilen pota takip sistemi. Üretim süreçlerini optimize eder.',
    tags: ['C#', 'IoT', 'SQL', 'Endüstriyel', 'Staj'],
    color: '#06b6d4',
    secret: true,
    link: '#',
  },
  {
    id: 'edu-game',
    num: '06',
    icon: '📚',
    name: 'HTML Educational Game',
    desc: 'İngilizceyi oyun oynayarak öğreten interaktif web sitesi. Kelime oyunları ve mini quiz\'ler.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Eğitim', 'Gamification'],
    color: '#10b981',
    link: 'https://github.com/Ekoman0',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-label">
        <span className="section-num">// 03</span>
        <div className="section-line" />
        <span className="section-name">Projeler</span>
      </div>

      <h2 className="big-title reveal">
        <span className="dim">BUILD</span><br />
        <span className="bright">LOGS</span>
      </h2>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div
            className={`proj-card reveal reveal-delay-${(i % 3) + 1}`}
            key={p.id}
            style={{ '--proj-color': p.color }}
          >
            <div className="proj-header">
              <div className="proj-icon">{p.icon}</div>
              <span className="proj-num">// {p.num}</span>
            </div>
            <div className="proj-name">{p.name}</div>
            <div className="proj-desc">
              {p.desc}
              {p.secret && (
                <span style={{ display:'block', marginTop: 6, fontSize: '0.78rem', color: 'var(--muted)' }}>
                  🔒 Görseller gizli — staj projesi
                </span>
              )}
            </div>
            <div className="proj-tags">
              {p.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">
              GitHub → <span style={{ fontSize: '0.9em' }}>↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
