export async function POST(req) {
  try {
    const body = await req.json()

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Cartinha do Amor 💌',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 9.9
          }
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`
        },
        auto_return: 'approved',
        metadata: {
          cartinha: body
        }
      })
    })

    const data = await response.json()

    return new Response(JSON.stringify({ url: data.init_point }), {
      status: 200
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro pagamento' }), {
      status: 500
    })
  }
}
