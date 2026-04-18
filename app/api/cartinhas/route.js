import { createClient } from '@supabase/supabase-js'
import { gerarMensagem } from '../../../lib/gerarMensagem'

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

    const mensagemManual = String(body?.message || '').trim()

    const mensagemIA = gerarMensagem({
      tone: body?.tone,
      toName: body?.toName,
      fromName: body?.fromName,
      memory: body?.memory
    })

    const mensagemFinal = mensagemManual || mensagemIA

    const payload = {
      fromName: body?.fromName || '',
      toName: body?.toName || '',
      message: mensagemFinal,
      musicUrl: body?.musicUrl || '',
      whatsapp: body?.whatsapp || '',
      buttonText: body?.buttonText || 'Responder agora 💖',
      accent: body?.accent || 'rosa',
      tone: body?.tone || 'romantico',
      memory: body?.memory || '',
      photos: Array.isArray(body?.photos) ? body.photos : []
    }

    const { error } = await supabase
      .from('cartinhas')
      .insert([{ slug, payload }])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      })
    }

    return new Response(
      JSON.stringify({
        slug,
        url: `/c/${slug}`
      }),
      { status: 200 }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Erro interno' }),
      { status: 500 }
    )
  }
}
