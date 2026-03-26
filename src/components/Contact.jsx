export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-label">
        <span className="section-num">// 05</span>
        <div className="section-line" />
        <span className="section-name">İletişim</span>
      </div>

      <h2 className="contact-big reveal">
        LET'S<br /><span>TALK</span>
      </h2>

      <p className="contact-sub reveal reveal-delay-1">
        Yeni bir proje, iş teklifi veya sadece merhaba mı? Her zaman buradayım.
      </p>

      <div className="contact-links reveal reveal-delay-2" style={{ position: 'relative', zIndex: 100 }}>
        <a
          href="mailto:erkandursun791@gmail.com"
          className="contact-link primary"
        >
          ✉️ erkandursun791@gmail.com
        </a>
        <a
          href="https://github.com/Ekoman0"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          ⌗ GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/erkan-dursun-/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          💼 LinkedIn
        </a>
      </div>
    </section>
  )
}
