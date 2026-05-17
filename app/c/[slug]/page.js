import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

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

export default async function CartinhaPage({ params }) {
  const { data, error } = await supabase
    .from('cartinhas')
    .select('payload, status')
    .eq('slug', params.slug)
    .single()

  if (error || !data?.payload) {
    return (
      <main style={pageStyle}>
        <div style={boxStyle}>
          <h1>Cartinha não encontrada 💔</h1>
          <p>Essa cartinha não existe ou foi removida.</p>
        </div>
      </main>
    )
  }

  if (data.status !== 'aprovado') {
    return (
      <main style={pageStyle}>
        <div style={boxStyle}>
          <h1>Cartinha bloqueada 🔒</h1>
          <p>Essa surpresa será liberada após a confirmação do pagamento.</p>
          <a href="/" style={buttonStyle}>Voltar ao site</a>
        </div>
      </main>
    )
  }

  const p = data.payload || {}
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        @keyframes glow {
          0%, 100% { opacity: .45; transform: scale(1); }
          50% { opacity: .9; transform: scale(1.08); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @media (max-width: 760px) {
          .letter-paper {
            padding: 42px 24px !important;
          }

          .letter-title {
            font-size: 42px !important;
          }

          .letter-message {
            font-size: 25px !important;
          }

          .photo-grid {
            grid-template-columns: 1fr !important;
          }

          .actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={glowOneStyle} />
      <div style={glowTwoStyle} />

      <div style={petalOneStyle}>🌹</div>
      <div style={petalTwoStyle}>💌</div>
      <div style={petalThreeStyle}>❤️</div>
      <div style={petalFourStyle}>✨</div>

      <section style={headerStyle}>
        <div style={smallLineStyle} />
        <span style={headerTextStyle}>CARTINHA ESPECIAL</span>
        <div style={smallLineStyle} />
      </section>

      <p style={subtitleStyle}>
        Uma mensagem feita com carinho, só para você.
      </p>

      <section style={sceneStyle}>
        <div style={candleStyle}>
          <div style={flameStyle} />
        </div>

        <article className="letter-paper" style={paperStyle}>
          <div style={paperShineStyle} />

          <div style={paperDateStyle}>
            {new Intl.DateTimeFormat('pt-BR').format(new Date())}
          </div>

          <div style={heartStyle}>♡</div>

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
            <span style={signatureStyle}>{p.fromName || 'Alguém especial'}</span>
          </div>

          <div style={bottomHeartStyle}>♡</div>
        </article>

        {photos.length > 0 && (
          <section style={photoSectionStyle}>
            <h2 style={photoTitleStyle}>Nossas memórias 📸</h2>

            <div className="photo-grid" style={photoGridStyle}>
              {photos.map((photo, index) => (
                <div key={index} style={photoFrameStyle}>
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
            <h2 style={musicTitleStyle}>Nossa música 🎵</h2>

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
          <a href={whatsappUrl} target="_blank" rel="noreferrer" style={buttonStyle}>
            💖 Responder essa cartinha
          </a>

          <a href="/" style={secondaryButtonStyle}>
            Criar outra cartinha
          </a>
        </div>
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  padding: '28px 18px 60px',
  color: '#fff',
  fontFamily: 'Georgia, serif',
  background:
    'radial-gradient(circle at 20% 12%, rgba(255,90,95,0.26), transparent 26%), radial-gradient(circle at 80% 18%, rgba(255,184,92,0.18), transparent 25%), linear-gradient(180deg, #2a0207 0%, #100002 100%)',
  position: 'relative',
  overflow: 'hidden'
}

const glowOneStyle = {
  position: 'fixed',
  top: 80,
  left: -90,
  width: 300,
  height: 300,
  borderRadius: '50%',
  background: 'rgba(255,60,100,0.18)',
  filter: 'blur(80px)',
  animation: 'glow 5s infinite'
}

const glowTwoStyle = {
  position: 'fixed',
  right: -100,
  bottom: 90,
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'rgba(255,150,70,0.16)',
  filter: 'blur(80px)',
  animation: 'glow 7s infinite'
}

const petalOneStyle = {
  position: 'fixed',
  top: '12%',
  left: '6%',
  fontSize: 44,
  opacity: 0.5,
  animation: 'float 6s ease-in-out infinite'
}

const petalTwoStyle = {
  position: 'fixed',
  top: '22%',
  right: '8%',
  fontSize: 38,
  opacity: 0.45,
  animation: 'float 7s ease-in-out infinite'
}

const petalThreeStyle = {
  position: 'fixed',
  bottom: '18%',
  left: '9%',
  fontSize: 34,
  opacity: 0.42,
  animation: 'float 8s ease-in-out infinite'
}

const petalFourStyle = {
  position: 'fixed',
  bottom: '12%',
  right: '14%',
  fontSize: 36,
  opacity: 0.42,
  animation: 'float 6.5s ease-in-out infinite'
}

const headerStyle = {
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  color: '#ffd7a3',
  position: 'relative',
  zIndex: 2
}

const smallLineStyle = {
  flex: 1,
  height: 1,
  background: 'rgba(255,215,163,0.34)'
}

const headerTextStyle = {
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
  maxWidth: 900,
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  animation: 'fadeUp .9s ease both'
}

const paperStyle = {
  position: 'relative',
  padding: '64px 48px 58px',
  borderRadius: 16,
  overflow: 'hidden',
  background:
    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.38), transparent 24%), linear-gradient(180deg, #f6d1a0 0%, #e4ae74 100%)',
  color: '#2d0f0a',
  border: '1px solid rgba(110,50,15,0.36)',
  boxShadow:
    '0 38px 100px rgba(0,0,0,0.52), inset 0 0 44px rgba(120,50,10,0.17)'
}

const paperShineStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '40%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
  animation: 'shimmer 4.5s infinite',
  pointerEvents: 'none'
}

const paperDateStyle = {
  position: 'absolute',
  top: 24,
  right: 34,
  fontFamily: '"Comic Sans MS", cursive',
  fontSize: 15,
  color: '#4c1a14'
}

const heartStyle = {
  textAlign: 'center',
  fontSize: 44,
  color: '#c94b5b',
  marginBottom: 6
}

const letterTitleStyle = {
  fontFamily: '"Brush Script MT", "Segoe Script", cursive',
  fontSize: 'clamp(42px, 8vw, 66px)',
  fontWeight: 400,
  margin: 0,
  color: '#2c0c08'
}

const underlineStyle = {
  width: 240,
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

const bottomHeartStyle = {
  position: 'absolute',
  right: 42,
  bottom: 30,
  color: '#d85b68',
  fontSize: 42
}

const candleStyle = {
  position: 'absolute',
  top: -28,
  right: -12,
  width: 78,
  height: 94,
  borderRadius: '22px 22px 12px 12px',
  background: 'linear-gradient(180deg, #fff0d0, #d18a45)',
  boxShadow: '0 0 48px rgba(255,170,70,0.82)',
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

const photoSectionStyle = {
  marginTop: 30,
  padding: 22,
  borderRadius: 26,
  background: 'rgba(255,255,255,0.075)',
  border: '1px solid rgba(255,255,255,0.13)',
  backdropFilter: 'blur(10px)'
}

const photoTitleStyle = {
  marginTop: 0,
  textAlign: 'center',
  color: '#ffd7a3',
  fontFamily: 'Arial, sans-serif'
}

const photoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16
}

const photoFrameStyle = {
  padding: 8,
  borderRadius: 18,
  background: 'rgba(255,230,190,0.10)',
  transform: 'rotate(-1deg)'
}

const photoStyle = {
  width: '100%',
  height: 240,
  objectFit: 'cover',
  borderRadius: 14,
  display: 'block'
}

const musicBoxStyle = {
  marginTop: 24,
  padding: 22,
  borderRadius: 26,
  background: 'rgba(255,255,255,0.075)',
  border: '1px solid rgba(255,255,255,0.13)',
  textAlign: 'center'
}

const musicTitleStyle = {
  color: '#ffd7a3',
  fontFamily: 'Arial, sans-serif',
  marginTop: 0
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
  margin: '34px 0 24px',
  textAlign: 'center',
  color: '#ffd7a3',
  fontFamily: '"Segoe Script", cursive',
  fontSize: 27
}

const actionsStyle = {
  maxWidth: 560,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 14
}

const buttonStyle = {
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

const boxStyle = {
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
  zIndex: 2
}
