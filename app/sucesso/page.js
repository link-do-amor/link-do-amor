import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function Sucesso({ searchParams }) {
  const slug = searchParams?.slug || searchParams?.external_reference || ''
  const paymentId = searchParams?.payment_id || searchParams?.collection_id || ''

  const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
  const token = String(process.env.MP_ACCESS_TOKEN || '').trim()

  if (supabaseUrl && serviceKey && slug) {
    const supabase = createClient(supabaseUrl, serviceKey)

    let aprovado = true

    if (paymentId && token) {
      try {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        })

        const payment = await res.json()
        aprovado = payment?.status === 'approved'
      } catch {
        aprovado = true
      }
    }

    if (aprovado) {
      await supabase
        .from('cartinhas')
        .update({ status: 'aprovado' })
        .eq('slug', slug)
    }
  }

  return (
    <main style={pageStyle}>
      <div style={glowOneStyle} />
      <div style={glowTwoStyle} />

      <section style={cardStyle}>
        <div style={iconStyle}>💖</div>

        <h1 style={titleStyle}>Pagamento aprovado!</h1>

        <p style={textStyle}>
          Sua cartinha foi liberada com sucesso. Agora é só abrir,
          copiar o link e emocionar quem você ama.
        </p>

        <div style={buttonsStyle}>
          <a href={slug ? `/c/${slug}` : '/'} style={primaryButtonStyle}>
            Abrir minha cartinha
          </a>

          <a href="/" style={secondaryButtonStyle}>
            Criar outra cartinha
          </a>
        </div>

        {slug && (
          <div style={linkBoxStyle}>
            <span style={linkLabelStyle}>Seu link:</span>
            <span style={linkTextStyle}>
              https://link-do-amor-tau.vercel.app/c/{slug}
            </span>
          </div>
        )}
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'radial-gradient(circle at top left, rgba(255,95,158,0.28), transparent 30%), radial-gradient(circle at bottom right, rgba(181,108,255,0.22), transparent 30%), linear-gradient(180deg, #1b0007 0%, #080003 100%)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  overflow: 'hidden'
}

const glowOneStyle = {
  position: 'fixed',
  top: -120,
  left: -120,
  width: 360,
  height: 360,
  borderRadius: '50%',
  background: 'rgba(255,95,158,0.22)',
  filter: 'blur(80px)'
}

const glowTwoStyle = {
  position: 'fixed',
  bottom: -120,
  right: -120,
  width: 360,
  height: 360,
  borderRadius: '50%',
  background: 'rgba(181,108,255,0.20)',
  filter: 'blur(80px)'
}

const cardStyle = {
  width: '100%',
  maxWidth: 760,
  padding: '44px 28px',
  borderRadius: 34,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 30px 100px rgba(0,0,0,0.45)',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2
}

const iconStyle = {
  width: 94,
  height: 94,
  margin: '0 auto 24px',
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  fontSize: 44,
  background: 'linear-gradient(135deg, #ff6ea8, #b56cff)',
  boxShadow: '0 18px 60px rgba(255,95,158,0.38)'
}

const titleStyle = {
  fontSize: 'clamp(42px, 7vw, 72px)',
  lineHeight: 1,
  margin: '0 0 20px',
  fontWeight: 900,
  letterSpacing: '-2px'
}

const textStyle = {
  maxWidth: 620,
  margin: '0 auto',
  fontSize: 21,
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.78)'
}

const buttonsStyle = {
  marginTop: 34,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 14
}

const primaryButtonStyle = {
  textDecoration: 'none',
  padding: '18px 24px',
  borderRadius: 999,
  background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900,
  boxShadow: '0 18px 50px rgba(255,95,158,0.35)'
}

const secondaryButtonStyle = {
  textDecoration: 'none',
  padding: '18px 24px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900
}

const linkBoxStyle = {
  marginTop: 28,
  padding: 18,
  borderRadius: 22,
  background: 'rgba(0,0,0,0.22)',
  border: '1px solid rgba(255,255,255,0.10)',
  overflowWrap: 'anywhere'
}

const linkLabelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#ffb7d0',
  fontWeight: 900
}

const linkTextStyle = {
  color: 'rgba(255,255,255,0.80)',
  fontSize: 15
}
