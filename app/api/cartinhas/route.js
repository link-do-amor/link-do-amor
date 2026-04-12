import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(req) {
  const body = await req.json()

  const slug = Math.random().toString(36).substring(2, 8)

  const { error } = await supabase
    .from('cartinhas')
    .insert([
      {
        slug,
        conteudo: body
      }
    ])

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  return new Response(
    JSON.stringify({
      slug
    }),
    { status: 200 }
  )
}
