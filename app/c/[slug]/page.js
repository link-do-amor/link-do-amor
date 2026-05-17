'use client'

import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function getMusicEmbed(url) {
  if (!url) return null

  if (url.includes('spotify.com')) {
    return url.replace('open.spotify.com/', 'open.spotify.com/embed/')
  }

  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('v=')[1]?.split('&')[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  return null
}

export default function CartinhaPage() {
  const params = useParams()
  const slug = params?.slug

  const [loading, setLoading] = useState(true)
  const [cartinha, setCartinha] = useState(null)
  const [error, setError] = useState(false)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    async function loadCartinha() {
      const { data, error } = await supabase
        .from('cartinhas')
        .select('payload, status')
        .eq('slug', slug)
        .single()

      if (error || !data?.payload) {
        setError(true)
      } else {
        setCartinha(data)
      }

      setLoading(false)
    }

    if (slug) loadCartinha()
  }, [slug])

  if (loading) {
    return (
      <main style={pageStyle}>
        <div style={statusBoxStyle}>
          <h1>Preparando sua cartinha... 💌</h1>
        </div>
      </main>
    )
  }

  if (error || !cartinha?.payload) {
    return (
      <main style={pageStyle}>
        <div style={statusBoxStyle}>
          <h1>Cartinha não encontrada 💔</h1>
          <p>Essa cartinha não existe ou foi removida.</p>
        </div>
      </main>
    )
  }

  if (cartinha.status !== 'aprovado') {
    return (
      <main style={pageStyle}>
        <div style={statusBoxStyle}>
          <h1>Cartinha bloqueada 🔒</h1>
          <p>Essa surpresa será liberada após a confirmação do pagamento.</p>
          <a href="/" style={primaryButtonStyle}>Voltar ao site</a>
        </div>
      </main>
    )
  }

  const p = cartinha.payload || {}
  const photos = Array.isArray(p.photos) ? p.photos : []
  const musicEmbed = getMusicEmbed(p.musicUrl)

  const whatsappNumber = String(p.whatsapp || '').replace(/\D/g, '')
  const whatsappText = encodeURIComponent(
    p.fromName
      ? `Oi ${p.fromName}, eu vi sua cartinha e amei 💖`
      : 'Eu vi sua cartinha e amei 💖'
  )

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/55${whatsappNumber}?text=${whatsappText}`
    : `https://wa.me/?text=${whatsappText}`

  return (
    <main style={pageStyle}>
      <style>{`
        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: .38; transform: scale(1); }
          50% { opacity: .9; transform: scale(1.08); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(130%); }
        }

        @keyframes openLetter {
          from { opacity: 0; transform: scale(.94) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes envelopePop {
          from { opacity: 0; transform: scale(.86) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 820px) {
          .letter-paper {
            padding: 46px 24px 42px !important;
          }

          .letter-title {
            font-size: 42px !important;
          }

          .letter-message {
            font-size: 25px !important;
          }

          .signature {
            font-size: 54px !important;
          }

          .photo-grid {
            grid-template-columns: 1fr !important;
          }

          .actions {
            grid-template-columns: 1fr !important;
          }

          .candle {
            display: none !important;
          }
        }
      `}</style>

      <div style={glowOneStyle} />
      <div style={glowTwoStyle} />
      <div style={glowThreeStyle} />

      <div style={floatingRoseOneStyle}>🌹</div>
      <div style={floatingRoseTwoStyle}>🌹</div>
      <div style={floatingHeartOneStyle}>❤</div>
      <div style={floatingHeartTwoStyle}>❤</div>
      <div style={floatingSparkleStyle}>✨</div>

      {!opened ? (
        <section style={envelopeSectionStyle}>
          <div style={envelopeStyle} onClick={() => setOpened(true)}>
            <div style={envelopeFlapStyle} />
            <div style={envelopeBodyStyle}>
              <div style={sealStyle}>❤</div>
              <p style={envelopeSmallStyle}>Uma mensagem especial</p>
              <h1 style={envelopeTitleStyle}>Toque para abrir</h1>
              <p style={envelopeTextStyle}>
                Essa cartinha foi feita com carinho para você.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section style={topStyle}>
            <div style={lineStyle} />
            <span style={topTextStyle}>CARTINHA ESPECIAL</span>
            <div style={lineStyle} />
          </section>

          <p style={subtitleStyle}>
            Feita com carinho, guardada como memória.
          </p>

          <section style={sceneStyle}>
            <div className="candle" style={candleStyle}>
              <div style={flameStyle} />
            </div>

            <article className="letter-paper" style={paperStyle}>
              <div style={paperTextureStyle} />
              <div style={paperShineStyle} />

              <div style={dateStyle}>
                {new Intl.DateTimeFormat('pt-BR').format(new Date())}
              </div>

              <div style={heartTopStyle}>♡</div>

              <h1 className="letter-title" style={letterTitleStyle}>
                Minha {p.toName || 'pessoa especial'},
              </h1>

              <div style={underlineStyle} />

              <div className="letter-message" style={messageStyle}>
                {p.message || 'Uma mensagem especial foi escrita para você.'}
              </div>

              <div style={finalPhraseStyle}>
                Te amo mais do que as palavras conseguem dizer.
              </div>

              <div style={signatureWrapStyle}>
                <span style={signatureLabelStyle}>Com todo meu amor,</span>
                <span className="signature" style={signatureStyle}>
                  {p.fromName || 'Alguém especial'}
                </span>
              </div>

              <div style={heartBottomStyle}>♡</div>
            </article>

            {photos.length > 0 && (
              <section style={memoriesStyle}>
                <span style={sectionLabelStyle}>MEMÓRIAS</span>
                <h2 style={sectionTitleStyle}>Momentos que merecem ficar</h2>

                <div className="photo-grid" style={photoGridStyle}>
                  {photos.map((photo, index) => (
                    <div key={index} style={photoFrameStyle(index)}>
                      <img
                        src={photo}
                        alt={`Memória ${index + 1}`}
                        style={photoStyle}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {p.musicUrl && (
              <section style={musicBoxStyle}>
                <span style={sectionLabelStyle}>TRILHA SONORA</span>
                <h2 style={sectionTitleStyle}>Nossa música 🎵</h2>

                {musicEmbed ? (
                  <iframe
                    src={musicEmbed}
                    width="100%"
                    height={p.musicUrl.includes('spotify') ? '152' : '315'}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    style={iframeStyle}
                  />
                ) : (
                  <a href={p.musicUrl} target="_blank" rel="noreferrer" style={musicLinkStyle}>
                    Abrir música
                  </a>
                )}
              </section>
            )}

            <div style={quoteStyle}>
              “Você é meu hoje e todos os meus amanhãs.”
            </div>

            <div className="actions" style={actionsStyle}>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" style={primaryButtonStyle}>
                💖 Responder essa cartinha
              </a>

              <a href="/" style={secondaryButtonStyle}>
                Criar outra cartinha
              </a>
            </div>

            <p style={footerNoteStyle}>
              Criado com Link do Amor 💌
            </p>
          </section>
        </>
      )}
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  padding: '28px 18px 60px',
  color: '#fff',
  fontFamily: 'Georgia, serif',
  background:
    'radial-gradient(circle at 20% 12%, rgba(255,90,95,0.30), transparent 24%), radial-gradient(circle at 78% 18%, rgba(255,184,92,0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(140,0,20,0.50), transparent 35%), linear-gradient(180deg, #2b0207 0%, #120002 100%)',
  position: 'relative',
  overflow: 'hidden'
}

const envelopeSectionStyle = {
  minHeight: '84vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 3
}

const envelopeStyle = {
  width: 'min(92vw, 520px)',
  minHeight: 340,
  cursor: 'pointer',
  position: 'relative',
  animation: 'envelopePop .8s ease both',
  filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.55))'
}

const envelopeFlapStyle = {
  position: 'absolute',
  top: 0,
  left: '8%',
  width: '84%',
  height: 170,
  background: 'linear-gradient(180deg, #ff8ca8, #a5152b)',
  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
  borderRadius: '20px 20px 0 0',
  zIndex: 2
}

const envelopeBodyStyle = {
  position: 'absolute',
  inset: '86px 0 0',
  borderRadius: 30,
  background:
    'linear-gradient(135deg, #7d0719 0%, #d94764 52%, #7d0719 100%)',
  border: '1px solid rgba(255,255,255,0.18)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 28,
  textAlign: 'center'
}

const sealStyle = {
  width: 78,
  height: 78,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  background: 'linear-gradient(135deg, #ffd4de, #ff5c7a)',
  color: '#8c061b',
  fontSize: 38,
  boxShadow: '0 14px 40px rgba(0,0,0,0.28)',
  marginBottom: 20
}

const envelopeSmallStyle = {
  textTransform: 'uppercase',
  letterSpacing: 3,
  color: 'rgba(255,255,255,0.72)',
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  fontWeight: 900,
  margin: 0
}

const envelopeTitleStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 'clamp(38px, 8vw, 62px)',
  margin: '10px 0',
  lineHeight: 1
}

const envelopeTextStyle = {
  maxWidth: 360,
  color: 'rgba(255,255,255,0.78)',
  fontFamily: 'Arial, sans-serif',
  fontSize: 17,
  lineHeight: 1.55,
  margin: 0
}

const glowOneStyle = {
  position: 'fixed',
  top: 80,
  left: -90,
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'rgba(255,60,100,0.20)',
  filter: 'blur(85px)',
  animation: 'glowPulse 5s infinite'
}

const glowTwoStyle = {
  position: 'fixed',
  right: -100,
  bottom: 90,
  width: 340,
  height: 340,
  borderRadius: '50%',
  background: 'rgba(255,150,70,0.16)',
  filter: 'blur(85px)',
  animation: 'glowPulse 7s infinite'
}

const glowThreeStyle = {
  position: 'fixed',
  top: '40%',
  left: '42%',
  width: 260,
  height: 260,
  borderRadius: '50%',
  background: 'rgba(255,210,150,0.08)',
  filter: 'blur(90px)'
}

const floatingRoseOneStyle = {
  position: 'fixed',
  top: '13%',
  left: '5%',
  fontSize: 56,
  opacity: 0.45,
  animation: 'floatSoft 7s ease-in-out infinite',
  pointerEvents: 'none'
}

const floatingRoseTwoStyle = {
  position: 'fixed',
  right: '5%',
  bottom: '16%',
  fontSize: 62,
  opacity: 0.42,
  animation: 'floatSoft 8s ease-in-out infinite',
  pointerEvents: 'none'
}

const floatingHeartOneStyle = {
  position: 'fixed',
  top: '24%',
  right: '9%',
  color: '#ff7a8e',
  fontSize: 32,
  opacity: 0.45,
  animation: 'floatSoft 6s ease-in-out infinite',
  pointerEvents: 'none'
}

const floatingHeartTwoStyle = {
  position: 'fixed',
  bottom: '22%',
  left: '8%',
  color: '#ffb1bc',
  fontSize: 30,
  opacity: 0.42,
  animation: 'floatSoft 8s ease-in-out infinite',
  pointerEvents: 'none'
}

const floatingSparkleStyle = {
  position: 'fixed',
  top: '52%',
  right: '12%',
  fontSize: 34,
  opacity: 0.40,
  animation: 'floatSoft 6.5s ease-in-out infinite',
  pointerEvents: 'none'
}

const topStyle = {
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  color: '#ffd7a3',
  position: 'relative',
  zIndex: 2
}

const lineStyle = {
  flex: 1,
  height: 1,
  background: 'rgba(255,215,163,0.34)'
}

const topTextStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: 2.2
}

const subtitleStyle = {
  textAlign: 'center',
  color: '#ffd7a3',
  margin: '14px 0 34px',
  fontSize: 17,
  position: 'relative',
  zIndex: 2
}

const sceneStyle = {
  width: '100%',
  maxWidth: 920,
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  animation: 'fadeUp .9s ease both'
}

const paperStyle = {
  position: 'relative',
  padding: '68px 52px 60px',
  borderRadius: 18,
  overflow: 'hidden',
  background:
    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.40), transparent 24%), linear-gradient(180deg, #f6d1a0 0%, #e5ae75 100%)',
  color: '#2d0f0a',
  border: '1px solid rgba(110,50,15,0.36)',
  boxShadow:
    '0 42px 110px rgba(0,0,0,0.55), inset 0 0 44px rgba(120,50,10,0.18)',
  animation: 'openLetter .9s ease both',
  transformOrigin: 'top center'
}

const paperTextureStyle = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(90deg, rgba(70,25,5,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(70,25,5,0.035) 1px, transparent 1px)',
  backgroundSize: '26px 26px',
  opacity: 0.35,
  pointerEvents: 'none'
}

const paperShineStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '42%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
  animation: 'shimmer 4.8s infinite',
  pointerEvents: 'none'
}

const dateStyle = {
  position: 'absolute',
  top: 24,
  right: 34,
  fontFamily: '"Comic Sans MS", cursive',
  fontSize: 15,
  color: '#4c1a14'
}

const heartTopStyle = {
  textAlign: 'center',
  fontSize: 46,
  color: '#c94b5b',
  marginBottom: 6
}

const letterTitleStyle = {
  fontFamily: '"Brush Script MT", "Segoe Script", cursive',
  fontSize: 'clamp(44px, 8vw, 68px)',
  fontWeight: 400,
  margin: 0,
  color: '#2c0c08'
}

const underlineStyle = {
  width: 250,
  height: 3,
  borderRadius: 999,
  background: '#d85b68',
  margin: '8px 0 30px',
  transform: 'rotate(-2deg)'
}

const messageStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(28px, 5vw, 38px)',
  lineHeight: 1.64,
  whiteSpace: 'pre-wrap',
  color: '#28100b'
}

const finalPhraseStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(26px, 5vw, 36px)',
  marginTop: 34,
  paddingBottom: 8,
  borderBottom: '3px solid rgba(216,91,104,0.72)',
  color: '#28100b'
}

const signatureWrapStyle = {
  marginTop: 44,
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  gap: 20,
  flexWrap: 'wrap'
}

const signatureLabelStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(24px, 5vw, 34px)'
}

const signatureStyle = {
  fontFamily: '"Brush Script MT", "Segoe Script", cursive',
  fontSize: 'clamp(54px, 12vw, 90px)',
  lineHeight: 0.9,
  color: '#3b0d09',
  borderBottom: '4px solid rgba(216,91,104,0.76)'
}

const heartBottomStyle = {
  position: 'absolute',
  right: 42,
  bottom: 30,
  color: '#d85b68',
  fontSize: 42
}

const candleStyle = {
  position: 'absolute',
  top: -30,
  right: -12,
  width: 78,
  height: 94,
  borderRadius: '22px 22px 12px 12px',
  background: 'linear-gradient(180deg, #fff0d0, #d18a45)',
  boxShadow: '0 0 52px rgba(255,170,70,0.86)',
  zIndex: 4
}

const flameStyle = {
  width: 24,
  height: 42,
  borderRadius: '50%',
  background: 'linear-gradient(180deg, #fff9a8, #ff7b1a)',
  margin: '10px auto 0',
  boxShadow: '0 0 26px rgba(255,170,60,1)'
}

const memoriesStyle = {
  marginTop: 34,
  padding: 24,
  borderRadius: 30,
  background: 'rgba(255,255,255,0.075)',
  border: '1px solid rgba(255,255,255,0.13)',
  backdropFilter: 'blur(10px)'
}

const sectionLabelStyle = {
  display: 'block',
  textAlign: 'center',
  color: '#ffb8c7',
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 2,
  marginBottom: 8
}

const sectionTitleStyle = {
  margin: '0 0 20px',
  textAlign: 'center',
  color: '#ffd7a3',
  fontFamily: 'Arial, sans-serif',
  fontSize: 28
}

const photoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16
}

const photoFrameStyle = (index) => ({
  padding: 8,
  borderRadius: 18,
  background: 'rgba(255,230,190,0.10)',
  transform: index % 2 === 0 ? 'rotate(-1.4deg)' : 'rotate(1.4deg)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.25)'
})

const photoStyle = {
  width: '100%',
  height: 245,
  objectFit: 'cover',
  borderRadius: 14,
  display: 'block'
}

const musicBoxStyle = {
  marginTop: 26,
  padding: 24,
  borderRadius: 30,
  background: 'rgba(255,255,255,0.075)',
  border: '1px solid rgba(255,255,255,0.13)',
  textAlign: 'center',
  backdropFilter: 'blur(10px)'
}

const iframeStyle = {
  border: 'none',
  borderRadius: 18
}

const musicLinkStyle = {
  color: '#fff',
  fontWeight: 900
}

const quoteStyle = {
  margin: '36px 0 24px',
  textAlign: 'center',
  color: '#ffd7a3',
  fontFamily: '"Segoe Script", cursive',
  fontSize: 27
}

const actionsStyle = {
  maxWidth: 600,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 14
}

const primaryButtonStyle = {
  display: 'block',
  textAlign: 'center',
  textDecoration: 'none',
  padding: '17px 24px',
  borderRadius: 999,
  background: 'linear-gradient(90deg, #ff5c68, #9b1c24)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  fontSize: 18,
  fontWeight: 900,
  boxShadow: '0 16px 40px rgba(255,60,80,0.30)'
}

const secondaryButtonStyle = {
  display: 'block',
  textAlign: 'center',
  textDecoration: 'none',
  padding: '17px 24px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  fontSize: 18,
  fontWeight: 900
}

const footerNoteStyle = {
  marginTop: 28,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.50)',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 700
}

const statusBoxStyle = {
  width: '100%',
  maxWidth: 640,
  margin: '120px auto',
  padding: 34,
  borderRadius: 28,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  fontFamily: 'Arial, sans-serif'
}
