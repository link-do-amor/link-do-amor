import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function Sucesso({ searchParams }) {
  const slug = searchParams?.slug || searchParams?.external_reference || ''
  const paymentId = searchParams?.payment_id || searchParams?.collection_id || ''

  const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
  const token = String(process.env.MP_ACCESS_TOKEN || '').trim()

  let aprovado = false

  if (supabaseUrl && serviceKey && slug) {
    const supabase = createClient(supabaseUrl, serviceKey)

    if (paymentId && token) {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store'
      })

      const payment = await res.json()

      if (payment?.status === 'approved') {
        aprovado = true
      }
    } else {
      aprovado = true
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
      <div style={boxStyle}>
        <h1 style={titleStyle}>Pagamento aprovado 💖</h1>
        <p style={textStyle}>Sua cartinha foi liberada com sucesso.</p>

        <div style={buttonsStyle}>
          <a href={slug ? `/c/${slug}` : '/'} style={primaryButtonStyle}>
            Abrir cartinha
          </a>

          <a href="/" style={secondaryButtonStyle}>
            Criar outra cartinha
          </a>
        </div>
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
  lineHeight: 1.6
}

const buttonsStyle = {
  marginTop: 24,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12
}

const primaryButtonStyle = {
  textDecoration: 'none',
  background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 18px',
  fontWeight: 800
}

const secondaryButtonStyle = {
  textDecoration: 'none',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 18px',
  fontWeight: 800
}
