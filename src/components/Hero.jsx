import { useEffect, useState, useCallback } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

/* ══════════════════════════════════════════════════════════════
   HERO — Unity WebGL Embed
   ══════════════════════════════════════════════════════════════
   Unity'den gelen 'unity-open-cv' custom event'ini dinleyerek
   React tarafında CV sayfasına geçiş yapıyoruz.
   ══════════════════════════════════════════════════════════════ */

export default function Hero({ onEnterPC }) {
  const [loadPct, setLoadPct] = useState(0);
  const [isNearPC, setIsNearPC] = useState(false);

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl:     import.meta.env.BASE_URL + 'unityroombuild/Build/unityroombuild.loader.js',
    dataUrl:       import.meta.env.BASE_URL + 'unityroombuild/Build/unityroombuild.data.unityweb',
    frameworkUrl:  import.meta.env.BASE_URL + 'unityroombuild/Build/unityroombuild.framework.js.unityweb',
    codeUrl:       import.meta.env.BASE_URL + 'unityroombuild/Build/unityroombuild.wasm.unityweb',
  });

  // Yükleme yüzdesi
  useEffect(() => {
    setLoadPct(Math.round(loadingProgression * 100));
  }, [loadingProgression]);

  // Unity'den gelen eventleri dinle
  useEffect(() => {
    const handleOpenCV = () => {
      if (onEnterPC) onEnterPC();
    };
    
    // 1: Yakın, 0: Uzak
    const handleNearPC = (e) => {
      setIsNearPC(e.detail === 1);
    };

    window.addEventListener('unity-open-cv', handleOpenCV);
    window.addEventListener('unity-near-pc', handleNearPC);
    return () => {
      window.removeEventListener('unity-open-cv', handleOpenCV);
      window.removeEventListener('unity-near-pc', handleNearPC);
    };
  }, [onEnterPC]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#0a0a0d',
      overflow: 'hidden',
    }}>

      {/* ── LOADING EKRANI ── */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background: '#0a0a0d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#c8ff41',
            letterSpacing: '-2px',
          }}>
            ED_
          </div>

          {/* Progress Bar */}
          <div style={{
            width: 'min(320px, 70vw)',
            height: 6,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${loadPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c8ff41, #88cc22)',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* Terminal Text */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: 'rgba(200,255,65,0.6)',
            letterSpacing: '2px',
          }}>
            {loadPct < 30 && '> LOADING ASSETS...'}
            {loadPct >= 30 && loadPct < 70 && '> BUILDING ROOM...'}
            {loadPct >= 70 && loadPct < 100 && '> ALMOST READY...'}
            {loadPct >= 100 && '> INITIALIZING...'}
            {' '}{loadPct}%
          </div>
        </div>
      )}

      {/* ── UNITY CANVAS ── */}
      <Unity
        unityProvider={unityProvider}
        style={{
          width: '100%',
          height: '100%',
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
        devicePixelRatio={window.devicePixelRatio}
        matchWebGLToCanvasSize={true}
        tabIndex={1}
      />

      {/* ── KONTROLLER (SADECE BİLGİSAYARA YAKLAŞINCA GÖRÜNÜR) ── */}
      {(isLoaded && isNearPC) && (
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(10, 10, 15, 0.85)',
          border: '1px solid rgba(200, 255, 65, 0.4)',
          borderRadius: 8,
          padding: '12px 32px',
          display: 'flex', gap: 40,
          pointerEvents: 'none',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          zIndex: 20,
          backdropFilter: 'blur(4px)',
          animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#c8ff41', fontSize: '1.2rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2 }}>[ E ]</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>TERMİNALİ AÇ</div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
              (Komut Sistemiyle Projeleri ve Oyunları Keşfet)
            </div>
          </div>
        </div>
      )}

      {/* ── GENEL KONTROL BİLGİSİ (HER ZAMAN GÖRÜNÜR) ── */}
      {isLoaded && (
        <div style={{
          position: 'absolute', bottom: 24, right: 30,
          background: 'rgba(10, 10, 15, 0.65)',
          border: '1px solid rgba(200, 255, 65, 0.15)',
          borderRadius: 8,
          padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 10,
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
          textAlign: 'right',
          zIndex: 15
        }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
            <span style={{ color: '#c8ff41', fontWeight: 700 }}>WASD</span> İLE HAREKET ET
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
            NESNELERİ BUL VE ETKİLEŞİME GEÇ
          </div>
        </div>
      )}
    </div>
  );
}
