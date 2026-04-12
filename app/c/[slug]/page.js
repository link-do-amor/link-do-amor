import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function CartinhaPage({ params }) {
  const { data, error } = await supabase
    .from('cartinhas')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#120613',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div>
          <h1>Cartinha não encontrada 💔</h1>
          <p>Esse link não existe ou foi removido.</p>
        </div>
      </main>
    )
  }

  const payload = data.conteudo || {}

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(255,98,160,0.16), transparent 20%), radial-gradient(circle at bottom, rgba(181,108,255,0.14), transparent 18%), linear-gradient(180deg, #120613 0%, #0d0714 100%)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28,
          padding: 28,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(255,110,168,0.16)',
            color: '#ffe0ed',
            fontWeight: 800,
            fontSize: 14,
            marginBottom: 18,
          }}
        >
          Mensagem Especial 💌
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.02,
            marginTop: 0,
            marginBottom: 20,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {payload.toName
            ? `${payload.toName}, essa cartinha é sua`
            : 'Essa cartinha é sua'}
        </h1>

        <div
          style={{
            padding: 24,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: 20,
            lineHeight: 1.85,
            whiteSpace: 'pre-wrap',
          }}
        >
          {payload.message || 'Uma mensagem especial foi preparada para você.'}
        </div>

        <div
          style={{
            marginTop: 24,
            padding: 22,
            borderRadius: 22,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,110,168,0.16)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Responda essa mensagem e demonstre seu amor 💖
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            style={{
              width: '100%',
              border: 'none',
              borderRadius: 999,
              padding: '18px 22px',
              color: '#fff',
              fontSize: 18,
              fontWeight: 900,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
              background: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
            }}
          >
            {payload.buttonText || 'Responder agora 💖'}
          </a>
        </div>
      </div>
    </main>
  )
}
