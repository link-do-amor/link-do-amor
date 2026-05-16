import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const dynamic = 'force-dynamic'

function formatDate() {
  return new Intl.DateTimeFormat('pt-BR').format(new Date())
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
        <div style={cardStyle}>
          <h1 style={titleStyle}>Cartinha não encontrada 💔</h1>
          <p style={textStyle}>Essa cartinha não existe ou foi removida.</p>
        </div>
      </main>
    )
  }

  if (data.status !== 'aprovado') {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Cartinha bloqueada 🔒</h1>
          <p style={textStyle}>Essa surpresa será liberada após a confirmação do pagamento.</p>
          <a href="/" style={buttonStyle}>Voltar ao site</a>
        </div>
      </main>
    )
  }

  const p = data.payload || {}
  const photos = Array.isArray(p.photos) ? p.photos : []

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
      <div style={glowOneStyle} />
      <div style={glowTwoStyle} />

      <section style={headerStyle}>
        <div style={lineStyle} />
        <div style={headerTextStyle}>♥ CARTINHA ESPECIAL ♥</div>
        <div style={lineStyle} />
      </section>

      <p style={subtitleStyle}>Feita com todo meu amor, só para você.</p>

      <section style={sceneStyle}>
        <div style={candleStyle}>
          <div style={flameStyle} />
        </div>

        <div style={roseLeftStyle}>🌹</div>
        <div style={roseRightStyle}>🌹</div>
        <div style={petalOneStyle}>❤</div>
        <div style={petalTwoStyle}>❤</div>
        <div style={petalThreeStyle}>❤</div>

        <article style={paperStyle}>
          <div style={dateStyle}>{formatDate()}</div>

          <div style={heartTopStyle}>♡</div>

          <h1 style={letterTitleStyle}>
            Minha {p.toName || 'pessoa especial'},
          </h1>

          <div style={underlineStyle} />

          <div style={messageStyle}>
            {p.message || 'Uma mensagem especial foi escrita para você.'}
          </div>

          <div style={finalLineStyle}>
            Te amo mais do que as palavras conseguem dizer.
          </div>

          <div style={signatureWrapStyle}>
            <span style={signatureSmallStyle}>Com todo meu amor,</span>
            <span style={signatureStyle}>{p.fromName || 'Alguém especial'}</span>
          </div>

          <div style={heartBottomStyle}>♡</div>
        </article>

        {photos.length > 0 && (
          <div style={photoSectionStyle}>
            <h2 style={photoTitleStyle}>Nossas memórias 📸</h2>

            <div style={photoGridStyle}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  style={photoStyle}
                />
              ))}
            </div>
          </div>
        )}

        {p.musicUrl && (
          <div style={musicBoxStyle}>
            <div style={musicTitleStyle}>Nossa música 🎵</div>
            <a href={p.musicUrl} target="_blank" rel="noreferrer" style={musicLinkStyle}>
              Abrir música
            </a>
          </div>
        )}

        <div style={quoteStyle}>
          “Você é meu hoje e todos os meus amanhãs.”
        </div>

        <div style={actionsStyle}>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" style={buttonStyle}>
            💖 Responder no WhatsApp
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
  padding: '28px 18px 50px',
  color: '#3a120f',
  fontFamily: 'Georgia, serif',
  background:
    'radial-gradient(circle at 15% 10%, rgba(255,80,90,0.28), transparent 26%), radial-gradient(circle at 80% 20%, rgba(255,180,90,0.18), transparent 24%), linear-gradient(180deg, #2b0206 0%, #110002 100%)',
  position: 'relative',
  overflow: 'hidden'
}

const glowOneStyle = {
  position: 'fixed',
  top: 80,
  left: -80,
  width: 260,
  height: 260,
  borderRadius: '50%',
  background: 'rgba(255,40,80,0.18)',
  filter: 'blur(70px)'
}

const glowTwoStyle = {
  position: 'fixed',
  right: -70,
  bottom: 80,
  width: 260,
  height: 260,
  borderRadius: '50%',
  background: 'rgba(255,150,70,0.14)',
  filter: 'blur(70px)'
}

const headerStyle = {
  maxWidth: 900,
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
  background: 'rgba(255,215,163,0.35)'
}

const headerTextStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 15,
  fontWeight: 900,
  letterSpacing: 1.8
}

const subtitleStyle = {
  textAlign: 'center',
  color: '#ffd3a0',
  fontSize: 17,
  margin: '14px 0 32px',
  position: 'relative',
  zIndex: 2
}

const sceneStyle = {
  maxWidth: 860,
  margin: '0 auto',
  position: 'relative',
  zIndex: 2
}

const paperStyle = {
  position: 'relative',
  background:
    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 24%), linear-gradient(180deg, #f3c998 0%, #e7b77f 100%)',
  borderRadius: 10,
  padding: '58px 42px 54px',
  boxShadow:
    '0 30px 80px rgba(0,0,0,0.45), inset 0 0 40px rgba(120,50,10,0.18)',
  border: '1px solid rgba(110,50,15,0.35)',
  color: '#32110c',
  overflow: 'hidden'
}

const dateStyle = {
  position: 'absolute',
  top: 22,
  right: 30,
  fontFamily: '"Comic Sans MS", cursive',
  fontSize: 15,
  color: '#4d1a15'
}

const heartTopStyle = {
  textAlign: 'center',
  fontSize: 44,
  color: '#c94b5b',
  marginBottom: 8
}

const letterTitleStyle = {
  fontFamily: '"Brush Script MT", "Segoe Script", cursive',
  fontSize: 'clamp(38px, 8vw, 62px)',
  fontWeight: 400,
  margin: '0 0 4px',
  color: '#2e0d09'
}

const underlineStyle = {
  width: 230,
  height: 3,
  background: '#d85b68',
  marginBottom: 28,
  transform: 'rotate(-2deg)',
  borderRadius: 999
}

const messageStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(24px, 5vw, 36px)',
  lineHeight: 1.65,
  whiteSpace: 'pre-wrap',
  color: '#2a0f0b'
}

const finalLineStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(25px, 5vw, 36px)',
  marginTop: 30,
  paddingBottom: 8,
  borderBottom: '3px solid rgba(216,91,104,0.75)',
  color: '#2a0f0b'
}

const signatureWrapStyle = {
  marginTop: 42,
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  gap: 20,
  flexWrap: 'wrap'
}

const signatureSmallStyle = {
  fontFamily: '"Segoe Script", "Brush Script MT", cursive',
  fontSize: 'clamp(24px, 5vw, 34px)'
}

const signatureStyle = {
  fontFamily: '"Brush Script MT", "Segoe Script", cursive',
  fontSize: 'clamp(50px, 12vw, 86px)',
  color: '#3c0e0a',
  borderBottom: '4px solid rgba(216,91,104,0.75)',
  lineHeight: 0.9
}

const heartBottomStyle = {
  position: 'absolute',
  right: 42,
  bottom: 32,
  fontSize: 42,
  color: '#d85b68'
}

const candleStyle = {
  position: 'absolute',
  top: -24,
  right: -20,
  width: 78,
  height: 92,
  borderRadius: '20px 20px 12px 12px',
  background: 'linear-gradient(180deg, #fff1d0, #d18b45)',
  boxShadow: '0 0 45px rgba(255,170,70,0.8)',
  zIndex: 3
}

const flameStyle = {
  width: 24,
  height: 40,
  borderRadius: '50% 50% 50% 50%',
  background: 'linear-gradient(180deg, #fff8a8, #ff7b1a)',
  margin: '10px auto 0',
  boxShadow: '0 0 24px rgba(255,170,60,1)'
}

const roseLeftStyle = {
  position: 'absolute',
  left: -34,
  top: 80,
  fontSize: 74,
  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.45))',
  zIndex: 1
}

const roseRightStyle = {
  position: 'absolute',
  right: -30,
  bottom: 180,
  fontSize: 74,
  transform: 'rotate(24deg)',
  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.45))',
  zIndex: 1
}

const petalOneStyle = {
  position: 'absolute',
  top: 160,
  left: -10,
  color: '#ff5a6b',
  fontSize: 28
}

const petalTwoStyle = {
  position: 'absolute',
  top: 260,
  right: -8,
  color: '#ff9a9f',
  fontSize: 24
}

const petalThreeStyle = {
  position: 'absolute',
  bottom: 120,
  left: 22,
  color: '#ff737b',
  fontSize: 22
}

const photoSectionStyle = {
  marginTop: 28,
  padding: 18,
  borderRadius: 24,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)'
}

const photoTitleStyle = {
  color: '#ffd7a3',
  textAlign: 'center',
  marginTop: 0,
  fontFamily: 'Arial, sans-serif'
}

const photoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 14
}

const photoStyle = {
  width: '100%',
  height: 220,
  objectFit: 'cover',
  borderRadius: 18,
  border: '2px solid rgba(255,220,170,0.4)'
}

const musicBoxStyle = {
  marginTop: 22,
  textAlign: 'center',
  padding: 18,
  borderRadius: 22,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)'
}

const musicTitleStyle = {
  color: '#ffd7a3',
  fontWeight: 900,
  marginBottom: 10,
  fontFamily: 'Arial, sans-serif'
}

const musicLinkStyle = {
  color: '#fff',
  fontWeight: 900
}

const quoteStyle = {
  textAlign: 'center',
  color: '#ffd7a3',
  fontFamily: '"Segoe Script", cursive',
  fontSize: 25,
  margin: '34px 0 22px'
}

const actionsStyle = {
  display: 'grid',
  gap: 14,
  maxWidth: 520,
  margin: '0 auto'
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
  boxShadow: '0 16px 40px rgba(255,60,80,0.28)'
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

const cardStyle = {
  width: '100%',
  maxWidth: 620,
  margin: '120px auto',
  padding: 34,
  borderRadius: 28,
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  textAlign: 'center'
}

const titleStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 40,
  marginTop: 0
}

const textStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 18,
  lineHeight: 1.6
}
