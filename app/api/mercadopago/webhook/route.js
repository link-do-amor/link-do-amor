import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const token = String(process.env.MP_ACCESS_TOKEN || '').trim()
    const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
    const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

    if (!token || !supabaseUrl || !serviceKey) {
      return Response.json(
        { ok: false, error: 'Variáveis do webhook não configuradas.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const body = await req.json()

    const paymentId =
      body?.data?.id ||
      body?.id ||
      (typeof body?.resource === 'string' ? body.resource.split('/').pop() : null)

    if (!paymentId) {
      return Response.json({ ok: true, message: 'Sem paymentId.' })
    }

    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const payment = await paymentRes.json()

    if (!paymentRes.ok) {
      return Response.json(
        { ok: false, error: payment?.message || 'Erro ao consultar pagamento.' },
        { status: 500 }
      )
    }

    const slug = payment?.external_reference || payment?.metadata?.slug

    if (payment?.status === 'approved' && slug) {
      const { error } = await supabase
        .from('cartinhas')
        .update({ status: 'aprovado' })
        .eq('slug', slug)

      if (error) {
        return Response.json({ ok: false, error: error.message }, { status: 500 })
      }
    }

    return Response.json({
      ok: true,
      paymentStatus: payment?.status,
      slug
    })
  } catch (error) {
    return Response.json(
      { ok: false, error: error?.message || 'Erro no webhook.' },
      { status: 500 }
    )
  }
}
