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

    const slug = gerarSlug(body?.toName || body?.para || 'cartinha')

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

    const { error } = await supabase
      .from('cartinhas')
      .insert([
        {
          slug,
          payload
        }
      ])

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ slug }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Erro interno ao criar cartinha.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
