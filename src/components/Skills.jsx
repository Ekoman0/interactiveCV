import { useState } from 'react'

const INVENTORY = [
  { id: 'cs', name: 'C# / .NET', type: 'Core Resource', rarity: 'Legendary', desc: 'Sistemin bel kemiği. Oyun mantığı, yapay zeka algoritmaları ve complex veri yapıları için kullandığım en temel efsanevi bileşen.', icon: '📜' },
  { id: 'unity', name: 'Unity Engine', type: 'Artifact', rarity: 'Mythic', desc: 'Hayal gücünü oynanabilir gerçekliğe dönüştüren kadim motor. 2D/3D fizik, UI sistemleri ve ışıklandırma sırları bu eşyanın içinde gizli.', icon: '🎲' },
  { id: 'python', name: 'Python', type: 'Utility', rarity: 'Epic', desc: 'Veri süreçleri, API çözümleri ve hızlı prototipleme görevleri için çantamda taşıdığım bitmek bilmeyen iksir.', icon: '🧪' },
  { id: 'yolo', name: 'YOLO Vision', type: 'Augmentation', rarity: 'Rare', desc: 'Gerçek zamanlı nesne tespiti sağlayan sibernetik göz eklentisi. Sürücü güvenlik ve sanayideki takip sistemlerinde aktifleştirdim.', icon: '👁️' },
  { id: 'html', name: 'HTML/CSS', type: 'Blueprint', rarity: 'Uncommon', desc: 'Verinin estetikle buluştuğu ana iskelet formülü. İnşa ettiğim her web yapısının temeline dökülen sağlam beton.', icon: '📐' },
  { id: 'react', name: 'React UI', type: 'Module', rarity: 'Epic', desc: 'Dinamik, saniyede onlarca kez render alan ama yorulmayan interaktif arayüz yapı taşı. State yönetim büyüleri dahil.', icon: '⚛️' },
  { id: 'sql', name: 'SQL Database', type: 'Storage', rarity: 'Uncommon', desc: 'Milyonlarca satır veriyi kayıpsız tutabilen antik arşiv. Geniş ilişkisel veri bağlama sistemi barındırıyor.', icon: '🗄️' },
  { id: 'iot', name: 'IoT / ESP8266', type: 'Hardware', rarity: 'Rare', desc: 'Fiziksel dünya ile dijital dünya arasında kablosuz köprü kuran minik çip. Tuvalet kokusu dahil her şeyi oyuna bağlar.', icon: '🔌' },
  { id: 'android', name: 'Android Build', type: 'Export Module', rarity: 'Epic', desc: 'Yazılan kodları paketleyip mobil cihazlara sığdıran yayın modülü. Milyarlarca ekrana uyumluluk şifreli.', icon: '📱' },
  { id: 'socket', name: 'Socket.io', type: 'Network', rarity: 'Rare', desc: 'Sistemlerin gecikmesiz, anlık ve gerçek zamanlı konuşmasını sağlayan telepati ağı (Scrabble müttefiki).', icon: '📡' },
]

export default function Skills() {
  const [activeItem, setActiveItem] = useState(INVENTORY[0])

  return (
    <section id="skills" className="section">
      <div className="section-label">
        <span className="section-num">// 04</span>
        <div className="section-line" />
        <span className="section-name">Envanter (Yetenekler)</span>
      </div>

      <h2 className="big-title reveal">
        <span className="dim">SKILL</span><br />
        <span className="bright">INVENTORY</span>
      </h2>

      <div className="inventory-layout reveal reveal-delay-1">
        
        {/* Sol: Slot Grid */}
        <div className="inventory-grid">
          {INVENTORY.map(item => (
            <div 
              key={item.id} 
              className={`inventory-slot rarity-${item.rarity.toLowerCase()} ${activeItem.id === item.id ? 'selected' : ''}`}
              onMouseEnter={() => setActiveItem(item)}
            >
              <span className="slot-icon">{item.icon}</span>
            </div>
          ))}
          {/* Boş slotlar (Envanter hissi için tamamlama) */}
          {[...Array(6)].map((_, i) => (
             <div key={`empty-${i}`} className="inventory-slot empty" />
          ))}
        </div>

        {/* Sağ: Item Details */}
        <div className={`inventory-details rarity-${activeItem.rarity.toLowerCase()}`}>
          <div className="detail-header">
            <div className="detail-icon-large">{activeItem.icon}</div>
            <div className="detail-title-area">
              <h3 className="detail-name">{activeItem.name}</h3>
              <div className="detail-meta">
                <span className="detail-type">{activeItem.type}</span>
                <span className="detail-rarity">{activeItem.rarity}</span>
              </div>
            </div>
          </div>
          <div className="detail-separator" />
          <p className="detail-desc">{activeItem.desc}</p>
        </div>

      </div>
    </section>
  )
}
