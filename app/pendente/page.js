import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function Pendente({ searchParams }) {
  const slug = searchParams?.slug || searchParams?.external_reference || ''
  const paymentId = searchParams?.payment_id || searchParams?.collection_id || ''

  const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
  const token = String(process.env.MP_ACCESS_TOKEN || '').trim()

  let aprovado = false

  if (slug && paymentId && supabaseUrl && serviceKey && token) {
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    })

    const payment = await paymentRes.json()

    if (payment?.status === 'approved') {
      const supabase = createClient(supabaseUrl, serviceKey)

      await supabase
        .from('cartinhas')
        .update({ status: 'aprovado' })
        .eq('slug', slug)

      aprovado = true
    }
  }

  if (aprovado && slug) {
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`0;url=/c/${slug}`} />
        </head>
        <body>
          <main style={pageStyle}>
            <div style={boxStyle}>
              <h1 style={titleStyle}>Pagamento aprovado 💖</h1>
              <p style={textStyle}>Sua cartinha foi liberada.</p>
              <a href={`/c/${slug}`} style={buttonStyle}>
                Abrir cartinha
              </a>
            </div>
          </main>
        </body>
      </html>
    )
  }

  return (
    <main style={pageStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>Pagamento pendente ⏳</h1>

        <p style={textStyle}>
          Se você já pagou via Pix, aguarde alguns segundos e clique no botão abaixo.
        </p>

        <div style={buttonsStyle}>
          <a href={`/pendente?slug=${slug}&payment_id=${paymentId}`} style={buttonStyle}>
            Já paguei, verificar novamente
          </a>

          <a href={slug ? `/c/${slug}` : '/'} style={secondaryButtonStyle}>
            Tentar abrir cartinha
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
  maxWidth: 720,
  padding: 36,
  borderRadius: 28,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.10)',
  textAlign: 'center',
  color: '#fff'
}

const titleStyle = {
  marginTop: 0,
  fontSize: 42
}

const textStyle = {
  fontSize: 20,
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.82)'
}

const buttonsStyle = {
  marginTop: 26,
  display: 'grid',
  gap: 12
}

const buttonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 22px',
  fontWeight: 900
}

const secondaryButtonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 22px',
  fontWeight: 900
}
