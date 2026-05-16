import Link from 'next/link'

export default function Home() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={badgeStyle}>💖 Transforme sentimentos em memórias</div>

        <h1 style={titleStyle}>
          Crie uma cartinha única para quem você ama
        </h1>

        <p style={subtitleStyle}>
          Personalize uma mensagem com IA, fotos, música e envie como uma surpresa especial.
          Pagamento seguro e entrega imediata após confirmação.
        </p>

        <div style={featuresStyle}>
          <span>🔒 Pagamento seguro</span>
          <span>⚡ Entrega rápida</span>
          <span>💌 Link personalizado</span>
        </div>

        <Link href="/criar" style={buttonStyle}>
          Criar minha cartinha agora →
        </Link>
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(255, 80, 130, 0.28), transparent 35%), radial-gradient(circle at bottom right, rgba(160, 60, 255, 0.22), transparent 35%), linear-gradient(180deg, #180006 0%, #060003 100%)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24
}

const heroStyle = {
  width: '100%',
  maxWidth: 920,
  textAlign: 'center',
  padding: '70px 28px',
  borderRadius: 36,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 30px 100px rgba(0,0,0,0.35)'
}

const badgeStyle = {
  display: 'inline-block',
  padding: '10px 18px',
  borderRadius: 999,
  background: 'rgba(255, 90, 150, 0.16)',
  border: '1px solid rgba(255, 90, 150, 0.28)',
  color: '#ff8fbd',
  fontWeight: 700,
  marginBottom: 26
}

const titleStyle = {
  fontSize: 'clamp(42px, 7vw, 82px)',
  lineHeight: 1.04,
  margin: '0 auto',
  maxWidth: 820,
  fontWeight: 900,
  letterSpacing: '-2px'
}

const subtitleStyle = {
  fontSize: 'clamp(18px, 2vw, 24px)',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.72)',
  maxWidth: 720,
  margin: '26px auto 0'
}

const featuresStyle = {
  margin: '34px auto',
  display: 'flex',
  justifyContent: 'center',
  gap: 14,
  flexWrap: 'wrap',
  color: 'rgba(255,255,255,0.78)',
  fontWeight: 700
}

const buttonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  padding: '18px 34px',
  borderRadius: 999,
  background: 'linear-gradient(90deg, #ff5f9e, #b86bff)',
  color: '#fff',
  fontSize: 20,
  fontWeight: 900,
  boxShadow: '0 18px 50px rgba(255, 95, 158, 0.35)'
}
