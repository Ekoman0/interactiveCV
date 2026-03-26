export default function About() {
  const stats = [
    { label: 'Unity Oyunları',     val: '06' },
    { label: 'Platform',           val: 'Android' },
    { label: 'Ana Dil',            val: 'C# / Py' },
    { label: 'AI Deneyimi',        val: 'YOLO v8' },
  ]


  const techs = ['Unity 3D/2D','C#','Python','YOLO','OpenCV','ESP8266',
                 'Arduino','SQL','HTML/CSS','JavaScript','React','Socket.io']

  return (
    <section id="about" className="section">
      <div className="section-label">
        <span className="section-num">// 01</span>
        <div className="section-line" />
        <span className="section-name">Hakkımda</span>
      </div>

      <h2 className="big-title reveal">
        <span className="dim">HER</span><br />
        <span className="bright">DALDA</span>
      </h2>

      <div className="about-layout">
        <div className="about-text reveal reveal-delay-1">
          <p>
            Merhaba, ben <strong>Erkan Dursun</strong>. Unity ile <span className="lime">strateji oyunlarından</span> simülasyonlara,
            C# masaüstü uygulamalarından Python tabanlı yapay zeka sistemlerine uzanan geniş bir yelpazede
            geliştirme yapıyorum.
          </p>
          <p>
            Çelik fabrikası stajında pota takip sistemi geliştirdim. <strong>YOLO</strong> ile gerçek zamanlı
            sürücü güvenlik sistemi kurdum. Türkçe online Scrabble oyunu yazdım.
            IoT sensörü ile kedi tuvaleti koku takibi yaptım.
          </p>
          <p>
            Benim için kod yazmak bir araç — <span className="lime">problem çözmek ise asıl iş.</span>
          </p>

          <div className="tech-grid">
            {techs.map(t => <span className="tech-chip" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="about-right reveal reveal-delay-2">
          {stats.map(s => (
            <div className="stat-row" key={s.label}>
              <span className="stat-row-label">{s.label}</span>
              <span className="stat-row-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
