'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function CriarPage() {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState([])
  const [loadingAi, setLoadingAi] = useState(false)
  const [paying, setPaying] = useState(false)

  const [form, setForm] = useState({
    fromName: '',
    toName: '',
    memory: '',
    tone: 'romantico',
    message: '',
    musicUrl: '',
    whatsapp: '',
    buttonText: 'Responder essa cartinha 💖',
    accent: 'vinho'
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function generateAiMessage() {
    setLoadingAi(true)

    setTimeout(() => {
      const intros = {
        romantico: [
          'Existe um antes e um depois de você na minha história.',
          'Tem algo em você que mudou completamente a forma como eu vejo o mundo.',
          'Eu não sei exatamente em que momento você virou tudo pra mim… mas virou.'
        ],
        intenso: [
          'O que eu sinto por você não cabe direito em palavras… mas eu vou tentar.',
          'Eu não consigo mais imaginar meus dias sem você neles.',
          'Você chegou e bagunçou tudo aqui dentro — do melhor jeito possível.'
        ],
        fofo: [
          'Você virou minha parte favorita dos meus dias.',
          'Só de pensar em você, eu já sorrio sem perceber.',
          'Você tem esse jeitinho de deixar meu mundo mais bonito sem esforço.'
        ],
        engracado: [
          'Eu ia escrever algo bonito… mas a verdade é que sou completamente rendido por você.',
          'Era pra eu agir normal, mas você não colabora.',
          'Você conseguiu o que ninguém conseguiu: me deixar bobo desse jeito.'
        ],
        aniversario: [
          'Hoje não é só mais um dia — é o dia de celebrar você.',
          'O mundo ficou melhor no dia em que você nasceu.',
          'Hoje é o seu dia, mas quem ganha sou eu por ter você na minha vida.'
        ],
        desculpas: [
          'Tem coisas que eu deveria ter dito antes, e hoje eu não quero mais guardar.',
          'Eu sei que errei, mas o que sinto por você continua aqui.',
          'Se eu pudesse voltar em alguns momentos, faria diferente — principalmente por nós.'
        ],
        namoro: [
          'Eu não quero só momentos com você — eu quero uma história.',
          'Você é alguém que eu quero na minha vida de verdade.',
          'No meio de tanta coisa passageira, você apareceu com vontade de ficar.'
        ]
      }

      const meio = [
        form.memory
          ? `Eu guardo com carinho cada detalhe de ${form.memory}, porque momentos assim não passam despercebidos quando vêm de alguém tão especial.`
          : 'Com você, até os momentos mais simples ganham um significado diferente.',
        'Sua presença deixa tudo mais leve, mais bonito e cheio de sentido.',
        'Você transforma o comum em algo especial, sem nem perceber.'
      ]

      const finais = [
        'E se isso tudo ainda não for suficiente… eu passo o resto da vida te provando.',
        'Se depender de mim, isso aqui é só o começo da nossa história.',
        'Eu escolheria você de novo, em todas as versões possíveis da minha vida.'
      ]

      const msg = [
        random(intros[form.tone] || intros.romantico),
        random(meio),
        random(finais),
        `Com todo meu amor,\n${form.fromName || 'Alguém que te ama'} 💖`
      ].join('\n\n')

      setForm((prev) => ({ ...prev, message: msg }))
      setLoadingAi(false)
    }, 800)
  }

  function handlePhotosUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, 3)

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.readAsDataURL(file)
          })
      )
    ).then(setPhotos)
  }

  async function handlePayment() {
    try {
      setPaying(true)

      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          value: 9.9,
          currency: 'BRL'
        })
      }

      const response = await fetch('/api/criar-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos })
      })

      const data = await response.json()

      if (!response.ok || !data.url) {
        alert(data?.error || 'Erro ao abrir pagamento.')
        return
      }

      window.location.href = data.url
    } catch {
      alert('Erro ao abrir pagamento.')
    } finally {
      setPaying(false)
    }
  }

  const progress = useMemo(() => `${(step / 5) * 100}%`, [step])

  return (
    <main style={pageStyle}>
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 980px) {
          .grid { grid-template-columns: 1fr !important; }
          .preview { position: relative !important; top: 0 !important; }
        }
      `}</style>

      <header style={headerStyle}>
        <Link href="/" style={backStyle}>← Voltar</Link>
        <strong>Link do Amor</strong>
        <span style={priceStyle}>R$ 9,90</span>
      </header>

      <section className="grid" style={layoutStyle}>
        <div style={cardStyle}>
          <div style={progressWrapStyle}>
            <div style={{ ...progressBarStyle, width: progress }} />
          </div>

          <p style={stepLabelStyle}>Passo {step} de 5</p>

          {step === 1 && (
            <>
              <h1 style={titleStyle}>Quem vai receber essa surpresa?</h1>

              <label style={labelStyle}>Seu nome</label>
              <input name="fromName" value={form.fromName} onChange={handleChange} placeholder="Ex: Fábio" style={inputStyle} />

              <label style={labelStyle}>Nome da pessoa amada</label>
              <input name="toName" value={form.toName} onChange={handleChange} placeholder="Ex: Nay" style={inputStyle} />

              <label style={labelStyle}>Uma lembrança especial</label>
              <input name="memory" value={form.memory} onChange={handleChange} placeholder="Ex: nossa primeira viagem" style={inputStyle} />
            </>
          )}

          {step === 2 && (
            <>
              <h1 style={titleStyle}>Escolha o clima da mensagem</h1>

              <div style={themeGridStyle}>
                {[
                  ['romantico', '💖 Romântico'],
                  ['intenso', '🔥 Intenso'],
                  ['fofo', '🥰 Fofo'],
                  ['engracado', '😅 Engraçado'],
                  ['aniversario', '🎂 Aniversário'],
                  ['desculpas', '🥺 Desculpas'],
                  ['namoro', '💍 Namoro']
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setForm((p) => ({ ...p, tone: value }))}
                    style={{
                      ...themeButtonStyle,
                      border: form.tone === value ? '2px solid #ff7aa8' : '1px solid rgba(255,255,255,0.12)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button onClick={generateAiMessage} style={secondaryButtonStyle}>
                {loadingAi ? 'Gerando...' : 'Gerar mensagem com IA ✨'}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h1 style={titleStyle}>Edite ou escreva do seu jeito</h1>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Escreva aqui ou gere uma mensagem com IA..."
                style={textareaStyle}
              />
            </>
          )}

          {step === 4 && (
            <>
              <h1 style={titleStyle}>Deixe ainda mais especial</h1>

              <label style={labelStyle}>Fotos até 3</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotosUpload} style={fileStyle} />

              <label style={labelStyle}>Link da música</label>
              <input name="musicUrl" value={form.musicUrl} onChange={handleChange} placeholder="Spotify, YouTube ou mp3" style={inputStyle} />

              <label style={labelStyle}>Seu WhatsApp para receber resposta</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Ex: 71999999999" style={inputStyle} />
            </>
          )}

          {step === 5 && (
            <>
              <h1 style={titleStyle}>Tudo pronto para emocionar</h1>

              <p style={checkoutTextStyle}>
                Sua cartinha será liberada após o pagamento. A pessoa receberá um link lindo,
                com mensagem, fotos, música e botão para responder você.
              </p>

              <button onClick={handlePayment} style={primaryButtonStyle}>
                {paying ? 'Abrindo pagamento...' : 'Finalizar e enviar — R$ 9,90'}
              </button>
            </>
          )}

          <div style={navButtonsStyle}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} style={outlineButtonStyle}>
                Voltar
              </button>
            )}

            {step < 5 && (
              <button onClick={() => setStep(step + 1)} style={primaryButtonStyle}>
                Continuar
              </button>
            )}
          </div>
        </div>

        <aside className="preview" style={previewStyle}>
          <div style={previewPaperStyle}>
            <div style={heartStyle}>♡</div>

            <h2 style={previewTitleStyle}>
              Minha {form.toName || 'pessoa especial'},
            </h2>

            <div style={previewLineStyle} />

            <p style={previewMessageStyle}>
              {form.message || 'Sua mensagem vai aparecer aqui em tempo real...'}
            </p>

            <div style={signatureStyle}>
              {form.fromName || 'Alguém especial'}
            </div>
          </div>

          {photos.length > 0 && (
            <div style={photosPreviewStyle}>
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt="" style={photoStyle} />
              ))}
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: 'radial-gradient(circle at top left, rgba(255,90,140,.22), transparent 28%), linear-gradient(180deg,#210006,#090002)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  padding: 20
}

const headerStyle = {
  maxWidth: 1240,
  margin: '0 auto 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const backStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 800
}

const priceStyle = {
  background: 'rgba(255,255,255,.08)',
  padding: '10px 16px',
  borderRadius: 999
}

const layoutStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1.05fr .95fr',
  gap: 28,
  alignItems: 'start'
}

const cardStyle = {
  background: 'rgba(255,255,255,.07)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 32,
  padding: 28,
  boxShadow: '0 24px 80px rgba(0,0,0,.35)'
}

const progressWrapStyle = {
  height: 8,
  background: 'rgba(255,255,255,.10)',
  borderRadius: 999,
  overflow: 'hidden',
  marginBottom: 18
}

const progressBarStyle = {
  height: '100%',
  background: 'linear-gradient(90deg,#ff6ea8,#b56cff)',
  borderRadius: 999
}

const stepLabelStyle = {
  color: '#ffb6d0',
  fontWeight: 900,
  textTransform: 'uppercase',
  fontSize: 13,
  letterSpacing: 1
}

const titleStyle = {
  fontSize: 'clamp(34px,5vw,54px)',
  lineHeight: 1.05,
  marginTop: 0
}

const labelStyle = {
  display: 'block',
  margin: '18px 0 8px',
  color: '#ffd8e5',
  fontWeight: 800
}

const inputStyle = {
  width: '100%',
  padding: '16px 18px',
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,.14)',
  background: 'rgba(255,255,255,.08)',
  color: '#fff',
  fontSize: 16,
  outline: 'none'
}

const textareaStyle = {
  ...inputStyle,
  minHeight: 280,
  resize: 'vertical',
  lineHeight: 1.7
}

const fileStyle = {
  width: '100%',
  color: '#fff',
  padding: 12,
  background: 'rgba(255,255,255,.08)',
  borderRadius: 18
}

const themeGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
  gap: 12,
  marginBottom: 20
}

const themeButtonStyle = {
  padding: '16px 14px',
  borderRadius: 18,
  background: 'rgba(255,255,255,.08)',
  color: '#fff',
  fontWeight: 900,
  cursor: 'pointer'
}

const primaryButtonStyle = {
  border: 'none',
  padding: '17px 24px',
  borderRadius: 999,
  background: 'linear-gradient(90deg,#ff6ea8,#b56cff)',
  color: '#fff',
  fontWeight: 900,
  fontSize: 17,
  cursor: 'pointer'
}

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  width: '100%',
  marginTop: 10
}

const outlineButtonStyle = {
  padding: '17px 24px',
  borderRadius: 999,
  background: 'rgba(255,255,255,.08)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,.14)',
  fontWeight: 900,
  cursor: 'pointer'
}

const navButtonsStyle = {
  display: 'flex',
  gap: 12,
  justifyContent: 'space-between',
  marginTop: 28
}

const checkoutTextStyle = {
  color: 'rgba(255,255,255,.78)',
  fontSize: 20,
  lineHeight: 1.7
}

const previewStyle = {
  position: 'sticky',
  top: 20
}

const previewPaperStyle = {
  background: 'linear-gradient(180deg,#f6d1a0,#e4ae74)',
  color: '#2d0f0a',
  padding: 34,
  borderRadius: 18,
  boxShadow: '0 30px 90px rgba(0,0,0,.45)'
}

const heartStyle = {
  textAlign: 'center',
  fontSize: 42,
  color: '#c94b5b'
}

const previewTitleStyle = {
  fontFamily: 'Brush Script MT, Segoe Script, cursive',
  fontSize: 48,
  fontWeight: 400,
  margin: 0
}

const previewLineStyle = {
  width: 200,
  height: 3,
  background: '#d85b68',
  margin: '8px 0 24px',
  borderRadius: 999
}

const previewMessageStyle = {
  whiteSpace: 'pre-wrap',
  fontFamily: 'Segoe Script, Brush Script MT, cursive',
  fontSize: 27,
  lineHeight: 1.65
}

const signatureStyle = {
  marginTop: 28,
  textAlign: 'right',
  fontFamily: 'Brush Script MT, Segoe Script, cursive',
  fontSize: 52
}

const photosPreviewStyle = {
  marginTop: 18,
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: 10
}

const photoStyle = {
  width: '100%',
  height: 120,
  objectFit: 'cover',
  borderRadius: 14
}
