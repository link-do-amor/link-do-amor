'use client'

import Script from 'next/script'
import Link from 'next/link'

export default function SucessoPage() {
  return (
    <>
      <Script id="purchase-event" strategy="afterInteractive">
        {`
          if (typeof fbq !== 'undefined') {
            fbq('track', 'Purchase', {
              value: 9.90,
              currency: 'BRL'
            });
          }
        `}
      </Script>

      <main
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #1a0006 0%, #2d0010 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          color: 'white',
          fontFamily: 'Arial'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 700,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 30,
            padding: 50,
            textAlign: 'center',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div
            style={{
              fontSize: 80,
              marginBottom: 20
            }}
          >
            💖
          </div>

          <h1
            style={{
              fontSize: 'clamp(42px, 7vw, 68px)',
              marginBottom: 16,
              fontWeight: 900
            }}
          >
            Pagamento confirmado
          </h1>

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.6,
              opacity: 0.85,
              marginBottom: 35
            }}
          >
            Sua cartinha foi criada com sucesso e já pode ser compartilhada.
          </p>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '18px 34px',
              borderRadius: 999,
              background:
                'linear-gradient(90deg,#ff4d6d,#c9184a)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 18
            }}
          >
            Criar outra cartinha
          </Link>
        </div>
      </main>
    </>
  )
}
