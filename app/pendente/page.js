export default function Pendente() {
  return (
    <main style={pageStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>Pagamento pendente ⏳</h1>
        <p style={textStyle}>
          Assim que o pagamento for confirmado, sua cartinha estará pronta.
        </p>

        <a href="/" style={primaryButtonStyle}>
          Voltar para o site
        </a>
      </div>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  background: 'linear-gradient(180deg, #1a0208 0%, #120106 100%)',
  fontFamily: 'Inter, Arial, sans-serif'
}

const boxStyle = {
  width: '100%',
  maxWidth: 680,
  padding: 32,
  borderRadius: 28,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.10)',
  textAlign: 'center',
  color: '#fff'
}

const titleStyle = {
  marginTop: 0,
  fontSize: 38
}

const textStyle = {
  fontSize: 18,
  lineHeight: 1.6,
  marginBottom: 24
}

const primaryButtonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 22px',
  fontWeight: 800
}
