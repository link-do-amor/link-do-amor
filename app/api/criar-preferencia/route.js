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
  let slug = ''

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return new Response(
        JSON.stringify({ error: 'NEXT_PUBLIC_SUPABASE_URL não configurada.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return new Response(
        JSON.stringify({ error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY não configurada.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!process.env.MP_ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'MP_ACCESS_TOKEN não configurado.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return new Response(
        JSON.stringify({ error: 'NEXT_PUBLIC_SITE_URL não configurada.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const body = await req.json()

    slug = gerarSlug(body?.toName || 'cartinha')

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
        JSON.stringify({ error: `Erro ao salvar cartinha: ${insertError.message}` }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const mpBody = {
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
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'X-Idempotency-Key': `${slug}-${Date.now()}`
      },
      body: JSON.stringify(mpBody)
    })

    const data = await response.json()

    if (!response.ok) {
      await supabase.from('cartinhas').delete().eq('slug', slug)

      return new Response(
        JSON.stringify({
          error:
            data?.message ||
            data?.cause?.[0]?.description ||
            'Erro ao criar pagamento no Mercado Pago.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const checkoutUrl = data.init_point || data.sandbox_init_point

    if (!checkoutUrl) {
      await supabase.from('cartinhas').delete().eq('slug', slug)

      return new Response(
        JSON.stringify({ error: 'Mercado Pago não retornou a URL de pagamento.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        url: checkoutUrl,
        slug
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    if (slug) {
      await supabase.from('cartinhas').delete().eq('slug', slug)
    }

    return new Response(
      JSON.stringify({
        error: error?.message || 'Erro interno ao criar pagamento.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
