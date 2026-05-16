import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const token = process.env.MP_ACCESS_TOKEN
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const body = await req.json()

    const paymentId =
      body?.data?.id ||
      body?.id ||
      body?.resource?.split('/').pop()

    if (!paymentId) {
      return Response.json({ ok: true })
    }

    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const payment = await paymentRes.json()

    const slug =
      payment?.external_reference ||
      payment?.metadata?.slug

    if (payment?.status === 'approved' && slug) {
      await supabase
        .from('cartinhas')
        .update({ status: 'aprovado' })
        .eq('slug', slug)
    }

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 })
  }
}
