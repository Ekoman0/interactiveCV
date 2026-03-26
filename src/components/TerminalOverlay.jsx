import { useState, useEffect, useRef } from 'react'

export default function TerminalOverlay({ onDone, onCancel }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'CV-OS v1.0.4 - Interactive Terminal' },
    { type: 'output', text: "Type 'help' to see available commands." },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus()

    // Unity WebGL genel olarak klavyeyi ele geçirip her tuşta preventDefault çağırır.
    // React form olaylarının çalışması ve harflerin yazılabilmesi için
    // Terminal açık olduğu sürece klavye olaylarında preventDefault'u devreden çıkarıyoruz.
    const originalPreventDefault = KeyboardEvent.prototype.preventDefault;
    KeyboardEvent.prototype.preventDefault = function() {
      // Terminal açıkken Unity'nin tuşları bloke etmesine izin verme
    };

    return () => {
      KeyboardEvent.prototype.preventDefault = originalPreventDefault;
    }
  }, [])

  // Scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    
    if (!cmd) return

    let output = null
    let shouldExit = false
    let shouldStart = false

    switch (cmd) {
      case 'help':
        output = [
          'Available commands:',
          '',
          '[NAVIGATION]',
          '  start, cv       : Web sitesine (Portfolyo) geçiş yap',
          '',
          '[GAMES]',
          '  games           : Tüm oyunları listele',
          '  play <game>     : Seçili oyunu oyna (örn: play juice, play zombie)',
          '',
          '[LINKS & INFO]',
          '  projects        : Projelerimi listele',
          '  github          : GitHub profilimi aç',
          '  linkedin        : LinkedIn profilimi aç',
          '  contact         : İletişim bilgilerimi göster',
          '',
          '[SYSTEM]',
          '  clear           : Terminali temizle',
          '  exit, quit      : Terminali kapat ve odaya dön'
        ].join('\n')
        break
      case 'start':
      case 'cv':
      case 'portfolio':
        output = 'Sisteme geçiş yapılıyor...'
        shouldStart = true
        break
      case 'games':
        output = [
          'Oyun Listesi (Oynamak için "play <isim>" yazın):',
          '  zombie       : Zombie Defense (3D Strateji)',
          '  juice        : Make Juice (2D Bulmaca)',
          '  truck        : Truck Station Control (2D Bulmaca)',
          '  mine         : Mine Wife (2D Simülasyon)',
          '  core         : Core Defense (2D Strateji)',
          '  sheep        : Uyku Çiftliği Koyun Saymaca (2D Gündelik)',
        ].join('\n')
        break
      case 'play zombie':
        output = 'Zombie Defense başlatılıyor...'
        window.open('https://appetize.io/app/b_gmfkmpgnwioixjaqmwjrbat5s4', '_blank')
        break
      case 'play juice':
        output = 'Make Juice başlatılıyor...'
        window.open('https://appetize.io/app/b_ewrk5snuzaa3msoiw336ctvkni', '_blank')
        break
      case 'play truck':
        output = 'Truck Station Control başlatılıyor...'
        window.open('https://appetize.io/app/b_vov3faj3yuu6fqdv73e5ubv3wm', '_blank')
        break
      case 'play mine':
        output = 'Mine Wife Play Store sayfası açılıyor...'
        window.open('https://play.google.com/store/apps/details?id=com.DefaultCompany.MineWife', '_blank')
        break
      case 'play core':
        output = 'Core Defense başlatılıyor...'
        window.open('https://appetize.io/app/b_g4cgkdf4vmndnpeyum772nbpce', '_blank')
        break
      case 'play sheep':
        output = 'Uyku Çiftliği Koyun Saymaca başlatılıyor...'
        window.open('https://appetize.io/app/b_4akrfzr4tqnslu37aar2csrldq', '_blank')
        break
      case 'projects':
        output = [
          'Projeler Listesi:',
          '  [01] My Doctor - C# WinForms Sağlık Uygulaması',
          '  [02] IoT Cat Litter Monitor - ESP8266 C++ Sensör Projesi',
          '  [03] Scrabble Game - Online Multiplayer Web Oyunu',
          '  [04] Yorgunluk Takip - Python YOLO AI Sistemi',
          '  [05] Pota Track - C# IoT Endüstriyel Staj Projesi',
          '  [06] HTML Educational Game - İngilizce Öğrenme Oyunu',
          '',
          'Tüm kodlar için "github" yazarak profilime gidebilirsiniz.'
        ].join('\n')
        break
      case 'github':
        output = 'GitHub profilim yeni sekmede açılıyor...'
        window.open('https://github.com/Ekoman0', '_blank')
        break
      case 'linkedin':
        output = 'LinkedIn profilim yeni sekmede açılıyor...'
        window.open('https://www.linkedin.com/in/erkan-dursun-/', '_blank')
        break
      case 'contact':
        output = [
          'İletişim Bilgileri:',
          '  Email    : erkandursun791@gmail.com',
          '  LinkedIn : type "linkedin"',
          '  GitHub   : type "github"'
        ].join('\n')
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'exit':
      case 'quit':
        shouldExit = true
        break
      default:
        if (cmd.startsWith('play ')) {
          output = `Oyun bulunamadı: ${cmd.replace('play ', '')}. 'games' yazarak oyun listesini görebilirsiniz.`
        } else {
          output = `Command not found: ${cmd}. Type 'help' for a list of commands.`
        }
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', text: cmd },
      ...(output ? [{ type: 'output', text: output }] : [])
    ])
    setInput('')

    if (shouldStart) {
      setTimeout(() => {
        onDone()
      }, 800)
    }

    if (shouldExit) {
      if (onCancel) onCancel()
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 7000,
      background: 'rgba(0,0,0,0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={() => inputRef.current?.focus()}>
      <div style={{
        background: '#0a0a14',
        border: '1px solid #c8ff41',
        borderRadius: 8,
        padding: '32px 40px',
        width: 'min(640px, 90vw)',
        height: 'min(480px, 80vh)',
        boxShadow: '0 0 40px rgba(200,255,65,0.2)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#c8ff41', marginBottom: 16 }}>
          Terminal — erkan@portfolio:~
        </div>
        
        <div style={{
          flex: 1,
          overflowY: 'auto',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.9rem',
          lineHeight: 1.7,
        }}>
          {history.map((item, i) => (
            <div key={i} style={{ marginBottom: 4, whiteSpace: 'pre-wrap', color: item.type === 'command' ? '#f0f0f0' : '#a0a0a0' }}>
              {item.type === 'command' && <span style={{ color: '#c8ff41', marginRight: 8 }}>&gt;</span>}
              {item.text}
            </div>
          ))}
          
          <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <span style={{ color: '#c8ff41', marginRight: 8 }}>&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f0f0f0',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                outline: 'none',
                flex: 1,
                padding: 0
              }}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
