import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function gerarSlug(base = 'cartinha') {
  const normalizado = String(base)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30)

  const sufixo = Math.random().toString(36).substring(2, 8)
  return `${normalizado || 'cartinha'}-${sufixo}`
}

export async function POST(req) {
  try {
    const body = await req.json()
    const slug = gerarSlug(body?.toName || 'cartinha')

    const payload = {
      fromName: body?.fromName || '',
      toName: body?.toName || '',
      message: body?.message || '',
      musicUrl: body?.musicUrl || '',
      whatsapp: body?.whatsapp || '',
      buttonText: body?.buttonText || 'Responder agora 💖',
      accent: body?.accent || 'rosa',
      tone: body?.tone || 'romântico elegante',
      memory: body?.memory || '',
      photos: Array.isArray(body?.photos) ? body.photos : []
    }

    const { error: insertError } = await supabase
      .from('cartinhas')
      .insert([
        {
          slug,
          payload
        }
      ])

    if (insertError) {
      return new Response(
        JSON.stringify({ error: insertError.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: [
          {
            title: `Cartinha do Amor para ${payload.toName || 'Pessoa especial'} 💌`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 9.9
          }
        ],
        external_reference: slug,
        metadata: {
          slug
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso?slug=${slug}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro?slug=${slug}`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente?slug=${slug}`
        },
        auto_return: 'approved'
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data?.message || 'Erro ao criar pagamento.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        url: data.init_point || data.sandbox_init_point,
        slug
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro interno ao criar pagamento.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
