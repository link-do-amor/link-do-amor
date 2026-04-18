import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function getMediaType(url) {
  if (!url) return 'none'
  const lower = url.toLowerCase()

  if (
    lower.includes('.mp3') ||
    lower.includes('.wav') ||
    lower.includes('.ogg') ||
    lower.includes('.m4a')
  ) {
    return 'audio'
  }

  if (lower.includes('spotify.com')) return 'spotify'
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube'

  return 'none'
}

function getEmbedUrl(url) {
  if (!url) return ''

  try {
    if (url.includes('spotify.com')) {
      return url.replace('open.spotify.com/', 'open.spotify.com/embed/')
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    if (url.includes('youtube.com/watch?v=')) {
      const parsed = new URL(url)
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    return ''
  } catch {
    return ''
  }
}

function getAccent(accent) {
  if (accent === 'roxo') {
    return {
      soft: 'rgba(208,108,255,0.16)',
      gradient: 'linear-gradient(90deg, #d06cff, #8b5cf6)',
      text: '#f3ddff'
    }
  }

  if (accent === 'vinho') {
    return {
      soft: 'rgba(201,71,109,0.16)',
      gradient: 'linear-gradient(90deg, #d85f87, #7c1635)',
      text: '#ffdce8'
    }
  }

  return {
    soft: 'rgba(255,110,168,0.16)',
    gradient: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
    text: '#ffe0ed'
  }
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
        <div style={topRibbonStyle}>Cartinha não encontrada 💔</div>
        <div style={centerBoxStyle}>
          <h1 style={{ marginTop: 0 }}>Ops...</h1>
          <p>Essa cartinha não existe ou foi removida.</p>
        </div>
      </main>
    )
  }

  if (data.status !== 'aprovado') {
    return (
      <main style={pageStyle}>
        <div style={topRibbonStyle}>Essa cartinha é especial 💖</div>
        <div style={lockedBoxStyle}>
          <h1 style={lockedTitleStyle}>Cartinha bloqueada</h1>
          <p style={lockedTextStyle}>
            Essa surpresa só pode ser aberta após a confirmação do pagamento.
          </p>
          <a href="/" style={lockedButtonStyle}>
            Criar minha cartinha
          </a>
        </div>
      </main>
    )
  }

  const payload = data.payload || {}
  const accent = getAccent(payload.accent)
  const mediaType = getMediaType(payload.musicUrl)
  const mediaEmbedUrl = getEmbedUrl(payload.musicUrl)
  const photos = Array.isArray(payload.photos) ? payload.photos : []

  const whatsappNumber = String(payload.whatsapp || '').replace(/\D/g, '')
  const whatsappText = encodeURIComponent(
    payload.fromName
      ? `Oi ${payload.fromName}, eu vi sua cartinha e amei 💖`
      : 'Eu vi sua cartinha e amei 💖'
  )

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/55${whatsappNumber}?text=${whatsappText}`
    : `https://wa.me/?text=${whatsappText}`

  const novaCartinhaUrl = '/'

  return (
    <main style={pageStyle}>
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        @media (max-width: 1100px) {
          .surprise-layout { grid-template-columns: 1fr !important; }
          .photo-grid { grid-template-columns: 1fr !important; }
          .reply-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ ...topRibbonStyle, background: accent.gradient }}>
        Responda essa mensagem e demonstre seu amor 💖
      </div>

      <div style={heartsOverlayStyle}>
        <span style={{ ...heartStyle, top: '8%', left: '6%', color: '#ff6b8a' }}>❤</span>
        <span style={{ ...heartStyle, top: '18%', left: '28%', color: '#ffd166' }}>❤</span>
        <span style={{ ...heartStyle, top: '12%', right: '10%', color: '#b56cff' }}>❤</span>
        <span style={{ ...heartStyle, top: '42%', right: '6%', color: '#7ee7ff' }}>❤</span>
        <span style={{ ...heartStyle, bottom: '18%', left: '10%', color: '#ff9bd2' }}>❤</span>
        <span style={{ ...heartStyle, bottom: '10%', right: '24%', color: '#c3ff6b' }}>❤</span>
      </div>

      <section className="surprise-layout" style={surpriseLayoutStyle}>
        <div style={leftPanelStyle}>
          <div style={terminalHeaderStyle}>
            <div style={terminalDotsStyle}>
              <span style={{ ...dotStyle, background: '#ff6b8a' }} />
              <span style={{ ...dotStyle, background: '#ff89a1' }} />
              <span style={{ ...dotStyle, background: '#ffadc0' }} />
            </div>
            <div style={terminalFileStyle}>cartinha.txt</div>
          </div>

          <div style={terminalBodyStyle}>
            <p style={terminalLineStyle}>┌─ Cartinha Especial Criada</p>
            <p style={terminalLineStyle}>│</p>
            <p style={terminalLineStyle}>│ Para: {payload.toName || 'Pessoa especial'}</p>
            <p style={terminalLineStyle}>│ De: {payload.fromName || 'Alguém especial'}</p>
            <p style={terminalLineStyle}>│ Status: entregue com amor</p>
            <p style={terminalLineStyle}>└──────────────────────────────</p>
          </div>

          {photos.length > 0 && (
            <div className="photo-grid" style={{ ...photoGridStyle, padding: 20 }}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  style={photoStyle}
                />
              ))}
            </div>
          )}
        </div>

        <div style={rightPanelStyle}>
          <div style={badgeStyle(accent)}>Mensagem Especial 💌</div>

          <h1 style={surpriseTitleStyle(accent)}>
            {payload.toName
              ? `${payload.toName}, essa cartinha é sua`
              : 'Essa cartinha é sua'}
          </h1>

          <div style={messageBoxStyle}>
            {payload.message || 'Uma mensagem especial foi preparada para você.'}
          </div>

          {mediaType !== 'none' && (
            <div style={mediaCardStyle}>
              <div style={mediaTitleStyle}>Nossa música 🎵</div>

              {mediaType === 'audio' && (
                <audio controls style={{ width: '100%' }}>
                  <source src={payload.musicUrl} />
                </audio>
              )}

              {mediaType === 'spotify' && mediaEmbedUrl && (
                <iframe
                  src={mediaEmbedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={iframeStyle}
                />
              )}

              {mediaType === 'youtube' && mediaEmbedUrl && (
                <div style={videoWrapStyle}>
                  <iframe
                    src={mediaEmbedUrl}
                    title="YouTube player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={videoIframeStyle}
                  />
                </div>
              )}
            </div>
          )}

          <div style={{ ...ctaBoxStyle, background: accent.soft }}>
            <div style={ctaTextStyle}>
              Responda essa mensagem e demonstre seu amor 💖
            </div>

            <div className="reply-grid" style={replyGridStyle}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ ...replyButtonStyle, background: accent.gradient }}
              >
                Responder no WhatsApp
              </a>

              <a
                href={novaCartinhaUrl}
                style={{ ...replyButtonStyle, ...secondaryReplyButtonStyle }}
              >
                Criar outra cartinha
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top, rgba(120,10,25,0.28), transparent 20%), radial-gradient(circle at bottom, rgba(180,35,60,0.18), transparent 18%), linear-gradient(180deg, #1a0208 0%, #120106 100%)',
  color: '#fff',
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  position: 'relative',
  overflow: 'hidden'
}

const topRibbonStyle = {
  width: '100%',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 800,
  fontSize: 16,
  padding: '14px 20px',
  position: 'relative',
  zIndex: 2
}

const heartsOverlayStyle = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  opacity: 0.22
}

const heartStyle = {
  position: 'absolute',
  fontSize: 26,
  textShadow: '0 0 18px rgba(255,255,255,0.18)'
}

const centerBoxStyle = {
  maxWidth: 600,
  margin: '80px auto',
  padding: 30,
  borderRadius: 24,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  position: 'relative',
  zIndex: 2
}

const lockedBoxStyle = {
  maxWidth: 760,
  margin: '120px auto',
  padding: 36,
  borderRadius: 28,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2
}

const lockedTitleStyle = {
  marginTop: 0,
  fontSize: 42
}

const lockedTextStyle = {
  fontSize: 20,
  lineHeight: 1.7,
  color: '#f5dfe6'
}

const lockedButtonStyle = {
  display: 'inline-block',
  marginTop: 20,
  textDecoration: 'none',
  background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 22px',
  fontWeight: 800
}

const surpriseLayoutStyle = {
  maxWidth: 1400,
  margin: '0 auto',
  padding: '60px 28px',
  display: 'grid',
  gridTemplateColumns: '0.9fr 1.1fr',
  gap: 36,
  alignItems: 'start',
  position: 'relative',
  zIndex: 2
}

const leftPanelStyle = {
  background: '#1a1a1f',
  borderRadius: 30,
  overflow: 'hidden',
  boxShadow: '0 30px 80px rgba(0,0,0,0.42)',
  border: '1px solid rgba(255,255,255,0.06)'
}

const rightPanelStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 30,
  padding: 30,
  backdropFilter: 'blur(12px)'
}

const terminalHeaderStyle = {
  background: '#3b3740',
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const terminalDotsStyle = {
  display: 'flex',
  gap: 10
}

const dotStyle = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  display: 'inline-block'
}

const terminalFileStyle = {
  color: '#ddd1da',
  fontWeight: 700,
  fontSize: 18
}

const terminalBodyStyle = {
  padding: 28,
  fontFamily: '"Courier New", monospace',
  fontSize: 20,
  color: '#efe4ec',
  lineHeight: 1.8
}

const terminalLineStyle = {
  margin: 0
}

const badgeStyle = (accent) => ({
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: 999,
  background: accent.soft,
  color: accent.text,
  fontWeight: 800,
  fontSize: 14,
  marginBottom: 18
})

const surpriseTitleStyle = (accent) => ({
  fontSize: 'clamp(42px, 5vw, 60px)',
  lineHeight: 1.02,
  marginTop: 0,
  marginBottom: 20,
  fontWeight: 900,
  background: accent.gradient,
  WebkitBackgroundClip: 'text',
  color: 'transparent'
})

const messageBoxStyle = {
  padding: 24,
  borderRadius: 24,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  fontSize: 20,
  lineHeight: 1.85,
  whiteSpace: 'pre-wrap'
}

const mediaCardStyle = {
  marginTop: 18,
  padding: 18,
  borderRadius: 22,
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.08)'
}

const mediaTitleStyle = {
  color: '#ffe0ec',
  fontWeight: 800,
  marginBottom: 12
}

const iframeStyle = {
  border: 'none',
  borderRadius: 16
}

const videoWrapStyle = {
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%',
  borderRadius: 18,
  overflow: 'hidden'
}

const videoIframeStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 'none'
}

const ctaBoxStyle = {
  marginTop: 24,
  padding: 22,
  borderRadius: 22,
  border: '1px solid rgba(255,255,255,0.08)'
}

const ctaTextStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: '#fff',
  marginBottom: 16,
  textAlign: 'center'
}

const replyGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12
}

const replyButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 999,
  padding: '18px 22px',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900,
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center'
}

const secondaryReplyButtonStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.14)'
}

const photoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  marginTop: 18
}

const photoStyle = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.10)'
}
