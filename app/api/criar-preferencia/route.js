import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
    const token = String(process.env.MP_ACCESS_TOKEN || '').trim()
    const siteUrl = String(process.env.NEXT_PUBLIC_SITE_URL || '').trim()

    if (!token || !token.startsWith('APP_USR-')) {
      return Response.json(
        { error: 'MP_ACCESS_TOKEN inválido ou ainda está como teste.' },
        { status: 500 }
      )
    }

    if (!siteUrl) {
      return Response.json(
        { error: 'NEXT_PUBLIC_SITE_URL não configurada.' },
        { status: 500 }
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
      tone: body?.tone || 'romantico',
      memory: body?.memory || '',
      photos: Array.isArray(body?.photos) ? body.photos : []
    }

    const { error: insertError } = await supabase
      .from('cartinhas')
      .insert([{ slug, payload, status: 'pendente' }])

    if (insertError) {
      return Response.json(
        { error: `Erro Supabase: ${insertError.message}` },
        { status: 500 }
      )
    }

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Idempotency-Key': `${slug}-${Date.now()}`
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
        metadata: { slug },
        back_urls: {
          success: `${siteUrl}/sucesso?slug=${slug}`,
          failure: `${siteUrl}/erro?slug=${slug}`,
          pending: `${siteUrl}/pendente?slug=${slug}`
        },
        auto_return: 'approved'
      })
    })

    const data = await mpResponse.json()

    if (!mpResponse.ok) {
      await supabase.from('cartinhas').delete().eq('slug', slug)

      return Response.json(
        {
          error:
            data?.message ||
            data?.error ||
            data?.cause?.[0]?.description ||
            'Erro Mercado Pago.'
        },
        { status: 500 }
      )
    }

    const url = data.init_point || data.sandbox_init_point

    if (!url) {
      await supabase.from('cartinhas').delete().eq('slug', slug)

      return Response.json(
        { error: 'Mercado Pago não retornou URL de pagamento.' },
        { status: 500 }
      )
    }

    return Response.json({ url, slug })
  } catch (error) {
    if (slug) {
      await supabase.from('cartinhas').delete().eq('slug', slug)
    }

    return Response.json(
      {
        error: `Erro técnico: ${error?.message || 'fetch failed'}`
      },
      { status: 500 }
    )
  }
}
