'use client'

import { useMemo, useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    fromName: '',
    toName: '',
    message: '',
    musicUrl: '',
    whatsapp: '',
    buttonText: 'Responder agora 💖',
    accent: 'rosa',
    tone: 'romantico',
    memory: ''
  })

  const [photos, setPhotos] = useState([])
  const [copiedMessage, setCopiedMessage] = useState(false)
  const [loadingAi, setLoadingAi] = useState(false)
  const [paying, setPaying] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handlePhotosUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, 3)
    if (!files.length) return

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.readAsDataURL(file)
          })
      )
    ).then((results) => {
      setPhotos(results)
    })
  }

  function removePhoto(indexToRemove) {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function generateAiMessage() {
    setLoadingAi(true)

    setTimeout(() => {
      const intros = {
        romantico: [
          'Desde o momento em que você entrou na minha vida, tudo começou a fazer mais sentido.',
          'Existe um antes e um depois de você na minha história.',
          'Tem algo em você que mudou completamente a forma como eu vejo o mundo.',
          'Eu não sei exatamente em que momento você virou tudo pra mim… mas virou.',
          'Algumas pessoas passam pela nossa vida. Você ficou no meu coração.'
        ],
        intenso: [
          'Eu não consigo mais imaginar um dia sem você nele.',
          'Você chegou e bagunçou tudo — do melhor jeito possível.',
          'O que eu sinto por você não cabe direito em palavras… mas eu vou tentar.',
          'Se eu pudesse escolher mil vezes, ainda escolheria você em todas.',
          'Você se tornou aquela presença que meu coração reconhece antes mesmo de eu perceber.'
        ],
        fofo: [
          'Você virou minha parte favorita dos meus dias.',
          'Tem dias que só de lembrar de você eu já fico bem.',
          'Eu nem sabia que precisava tanto de alguém até você aparecer.',
          'Sabe quando tudo fica mais leve só porque uma pessoa existe? Então… é você.',
          'Você tem esse jeitinho de deixar meu mundo mais bonito sem fazer esforço.'
        ],
        engracado: [
          'Eu ia escrever algo bonito… mas a verdade é que eu sou completamente rendido por você.',
          'Se isso fosse um filme, você já seria minha cena favorita.',
          'Você conseguiu o que ninguém conseguiu: me deixar bobo desse jeito.',
          'Eu até tento manter a postura, mas você desmonta qualquer plano meu.',
          'Era pra eu agir normalmente, só que aí você apareceu e complicou tudo.'
        ],
        aniversario: [
          'Hoje não é só mais um dia — é o dia de celebrar você.',
          'Se existe um motivo especial pra comemorar hoje, com certeza é você.',
          'O mundo ficou melhor no dia em que você chegou nele.',
          'Hoje é o seu dia, mas quem ganha sou eu por ter você na minha vida.',
          'Existem datas especiais, e existe o dia em que você nasceu.'
        ],
        desculpas: [
          'Tem coisas que eu deveria ter dito antes, e hoje eu não quero mais guardar.',
          'Eu sei que nem sempre fui o melhor, mas você sempre foi importante pra mim.',
          'Se eu pudesse voltar em alguns momentos, faria diferente — principalmente por nós.',
          'Eu errei, mas nunca deixei de sentir o quanto você é especial pra mim.',
          'Tem sentimentos que continuam vivos mesmo quando as palavras demoraram a chegar.'
        ],
        namoro: [
          'Tem coisas que a gente sente antes mesmo de conseguir explicar, e eu senti isso com você.',
          'Eu não quero só momentos com você — eu quero história.',
          'Você não é só alguém especial, você é alguém que eu quero na minha vida.',
          'Se depender de mim, isso aqui é só o começo da nossa história.',
          'No meio de tanta coisa passageira, você apareceu com vontade de ficar.'
        ]
      }

      const memories = [
        `Eu guardo com carinho cada detalhe de ${form.memory}, porque momentos assim não passam despercebidos quando vêm de alguém tão especial.`,
        `Toda vez que eu lembro de ${form.memory}, eu percebo como você conseguiu marcar meu coração de um jeito único.`,
        `O que vivemos em ${form.memory} ficou guardado em mim como uma das lembranças mais bonitas que eu poderia ter.`,
        `Quando penso em ${form.memory}, eu sorrio sem perceber, porque tem coisas que a alma simplesmente não esquece.`,
        `${form.memory} virou uma daquelas lembranças que eu quero carregar comigo por muito tempo.`
      ]

      const transitions = {
        romantico: [
          'Com você, até os momentos mais simples ganham um significado diferente.',
          'Sua presença transforma o comum em algo que merece ser guardado.',
          'Você tem esse jeito de fazer tudo parecer mais bonito, mais leve e mais verdadeiro.',
          'É impressionante como a sua presença consegue trazer paz e intensidade ao mesmo tempo.'
        ],
        intenso: [
          'O que eu sinto por você cresce até nos dias em que eu tento fingir que estou calmo.',
          'Tem uma força nisso tudo que eu já não consigo mais ignorar.',
          'Você ocupa um espaço em mim que ninguém mais conseguiria ocupar.',
          'Quanto mais o tempo passa, mais eu percebo que isso é muito maior do que eu imaginei.'
        ],
        fofo: [
          'Você tem um jeito doce de deixar tudo mais bonito ao seu redor.',
          'Seu carinho aparece até nas pequenas coisas, e talvez seja isso que mais me ganha.',
          'Com você, o dia parece ter mais cor, mais calma e mais vontade de sorrir.',
          'Tem uma leveza em você que faz meu coração se sentir em casa.'
        ],
        engracado: [
          'E o pior é que eu já nem tento disfarçar mais o quanto você mexe comigo.',
          'Você tem esse talento raro de me deixar sem graça e feliz ao mesmo tempo.',
          'No fim das contas, eu só aceitei que você tem um efeito absurdo em mim.',
          'Eu poderia fingir normalidade, mas claramente você não colabora.'
        ],
        aniversario: [
          'Hoje é um ótimo dia pra te lembrar o quanto a sua existência é valiosa.',
          'Celebrar você também é celebrar a sorte de ter cruzado o seu caminho.',
          'Tem pessoas que merecem ser lembradas com carinho todos os dias — e hoje ainda mais.',
          'Seu dia é especial porque você faz diferença na vida de quem te ama.'
        ],
        desculpas: [
          'Mesmo em meio aos erros, o que eu sinto por você nunca deixou de ser verdadeiro.',
          'Tem sentimentos que continuam firmes, mesmo depois de momentos difíceis.',
          'Eu sei que atitudes importam, e é por isso que eu quis colocar meu coração aqui com sinceridade.',
          'Nem sempre acertei na forma, mas nunca foi falta de sentimento.'
        ],
        namoro: [
          'Você despertou em mim uma vontade real de construir algo bonito e verdadeiro.',
          'Quando penso no futuro, é impossível não imaginar você nele.',
          'Tem uma paz em pensar em nós que eu não encontro em nenhum outro lugar.',
          'Você faz com que a ideia de continuar pareça a melhor parte da história.'
        ]
      }

      const feelings = {
        romantico: [
          'E é por isso que eu precisava te dizer o quanto você é especial pra mim.',
          'Cada dia que passa me confirma ainda mais o tamanho do sentimento que existe aqui dentro.',
          'No meio disso tudo, eu só consigo ter mais certeza do quanto você importa pra mim.',
          'Tem um carinho em mim por você que já ultrapassou qualquer explicação simples.'
        ],
        intenso: [
          'A verdade é que você mexeu comigo de um jeito profundo e impossível de esconder.',
          'Eu tentei colocar isso em palavras bonitas, mas o que sinto por você é maior do que qualquer frase.',
          'Você se tornou parte dos meus pensamentos, dos meus planos e do meu coração.',
          'O que existe aqui dentro por você não é pequeno, e eu já nem quero que seja.'
        ],
        fofo: [
          'Eu gosto da paz que você me traz, da alegria que você me desperta e do bem que você me faz.',
          'Você tem um lugar muito bonito no meu coração.',
          'Seu jeitinho me conquista mais do que você imagina.',
          'É muito bom sentir que alguém como você existe tão perto de mim.'
        ],
        engracado: [
          'No fim, você me desmontou direitinho e eu ainda agradeci.',
          'Você virou meu ponto fraco favorito.',
          'Eu já aceitei que você ganhou esse espaço todo em mim sem nem pedir licença.',
          'E sinceramente? Ainda bem que foi você.'
        ],
        aniversario: [
          'Então hoje eu só quero que você se sinta amado, lembrado e especial do jeito que merece.',
          'Você merece um dia bonito, leve e cheio de carinho.',
          'Que nunca te faltem motivos pra sorrir, porque você merece coisas lindas.',
          'Hoje é dia de te celebrar com todo amor que couber.'
        ],
        desculpas: [
          'Se ainda houver espaço pra me ouvir, eu queria que essa mensagem chegasse com todo o meu coração.',
          'Mais do que pedir desculpas, eu queria que você sentisse a verdade do que existe aqui dentro.',
          'Eu sei que palavras não apagam tudo, mas eu espero que elas mostrem sinceridade.',
          'Talvez eu tenha falhado em muita coisa, mas não no sentimento.'
        ],
        namoro: [
          'Você é alguém que eu não quero só por perto — eu quero por inteiro na minha história.',
          'Estar com você parece cada vez mais a escolha certa.',
          'Eu quero viver mais capítulos ao seu lado.',
          'Você me faz querer ficar, cuidar e construir.'
        ]
      }

      const closings = {
        romantico: [
          `Com todo meu carinho,\n${form.fromName || 'Alguém que te ama'} 💖`,
          `Com todo meu amor e admiração,\n${form.fromName || 'Alguém que te ama'} 💖`,
          `Com muito carinho no coração,\n${form.fromName || 'Alguém que te ama'} 💖`
        ],
        intenso: [
          `Com tudo o que sinto por você,\n${form.fromName || 'Alguém que te ama'} ❤️`,
          `Com o coração inteiro,\n${form.fromName || 'Alguém que te ama'} ❤️`,
          `Com amor, saudade e verdade,\n${form.fromName || 'Alguém que te ama'} ❤️`
        ],
        fofo: [
          `Com carinho e um sorriso bobo por sua causa,\n${form.fromName || 'Alguém que te ama'} 💕`,
          `Com muito amorzinho,\n${form.fromName || 'Alguém que te ama'} 💕`,
          `Com meu coração todo leve por sua causa,\n${form.fromName || 'Alguém que te ama'} 💕`
        ],
        engracado: [
          `Assinado: alguém completamente rendido por você,\n${form.fromName || 'Alguém que te ama'} 😌💖`,
          `Com amor e sem qualquer dignidade perto de você,\n${form.fromName || 'Alguém que te ama'} 😅💖`,
          `Do seu admirador nada discreto,\n${form.fromName || 'Alguém que te ama'} 💖`
        ],
        aniversario: [
          `Com carinho no seu dia especial,\n${form.fromName || 'Alguém que te ama'} 🎉💖`,
          `Com muito amor pra você hoje e sempre,\n${form.fromName || 'Alguém que te ama'} 💖`,
          `Te celebrando com carinho,\n${form.fromName || 'Alguém que te ama'} 💖`
        ],
        desculpas: [
          `Com sinceridade,\n${form.fromName || 'Alguém que te ama'}`,
          `Com o coração aberto,\n${form.fromName || 'Alguém que te ama'}`,
          `Com respeito e verdade,\n${form.fromName || 'Alguém que te ama'}`
        ],
        namoro: [
          `Com vontade de viver muito mais ao seu lado,\n${form.fromName || 'Alguém que te ama'} 💍💖`,
          `Com carinho e intenção de ficar,\n${form.fromName || 'Alguém que te ama'} 💖`,
          `Torcendo para isso ser só o começo,\n${form.fromName || 'Alguém que te ama'} 💖`
        ]
      }

      const tema = form.tone || 'romantico'
      const intro = random(intros[tema] || intros.romantico)
      const memoryBlock = form.memory?.trim() ? random(memories) : ''
      const transition = random(transitions[tema] || transitions.romantico)
      const feeling = random(feelings[tema] || feelings.romantico)
      const closing = random(closings[tema] || closings.romantico)

      const mensagem = [intro, memoryBlock, transition, feeling, closing]
        .filter(Boolean)
        .join('\n\n')

      setForm((prev) => ({
        ...prev,
        message: mensagem
      }))

      setLoadingAi(false)
    }, 900)
  }

  async function copyMessage() {
    if (!form.message) return
    await navigator.clipboard.writeText(form.message)
    setCopiedMessage(true)
    setTimeout(() => setCopiedMessage(false), 1800)
  }

  async function handlePagamento() {
    try {
      setPaying(true)

      const response = await fetch('/api/criar-preferencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fromName: form.fromName,
          toName: form.toName,
          message: form.message,
          musicUrl: form.musicUrl,
          whatsapp: form.whatsapp,
          buttonText: form.buttonText,
          accent: form.accent,
          tone: form.tone,
          memory: form.memory,
          photos
        })
      })

      const data = await response.json()

      if (!response.ok || !data.url) {
        alert(data?.error || 'Erro ao abrir pagamento.')
        return
      }

      window.location.href = data.url
    } catch (error) {
      alert('Erro ao abrir pagamento.')
    } finally {
      setPaying(false)
    }
  }

  const accent = useMemo(() => {
    if (form.accent === 'roxo') {
      return {
        soft: 'rgba(208,108,255,0.16)',
        gradient: 'linear-gradient(90deg, #d06cff, #8b5cf6)',
        text: '#f3ddff'
      }
    }

    if (form.accent === 'vinho') {
      return {
        soft: 'rgba(201,71,109,0.16)',
        gradient: 'linear-gradient(90deg, #d85f87, #7c1635)',
        text: '#ffdce8'
      }
    }

    return {
      soft: 'rgba(255,110,168,0.16)',
      gradient: 'linear-gradient(90deg, #ff6ea8, #b56cff)',
      text: '#ffe0ed'
    }
  }, [form.accent])

  const mediaType = useMemo(() => getMediaType(form.musicUrl), [form.musicUrl])
  const mediaEmbedUrl = useMemo(() => getEmbedUrl(form.musicUrl), [form.musicUrl])

  return (
    <main style={pageStyle}>
      <ResponsiveStyles />

      <div style={{ ...topRibbonStyle, background: accent.gradient }}>
        Agora você pode criar cartinhas com IA, fotos, música e link curto 💖
      </div>

      <div style={heartsOverlayStyle}>
        <span style={{ ...heartStyle, top: '8%', left: '6%', color: '#ff6b8a' }}>❤</span>
        <span style={{ ...heartStyle, top: '18%', left: '28%', color: '#ffd166' }}>❤</span>
        <span style={{ ...heartStyle, top: '12%', right: '10%', color: '#b56cff' }}>❤</span>
        <span style={{ ...heartStyle, top: '42%', right: '6%', color: '#7ee7ff' }}>❤</span>
        <span style={{ ...heartStyle, bottom: '18%', left: '10%', color: '#ff9bd2' }}>❤</span>
        <span style={{ ...heartStyle, bottom: '10%', right: '24%', color: '#c3ff6b' }}>❤</span>
        <span style={{ ...heartStyle, bottom: '28%', left: '46%', color: '#ffb86b' }}>❤</span>
      </div>

      <section className="hero-grid" style={heroStyle}>
        <div style={terminalCardStyle}>
          <div style={terminalHeaderStyle}>
            <div style={terminalDotsStyle}>
              <span style={{ ...dotStyle, background: '#ff6b8a' }} />
              <span style={{ ...dotStyle, background: '#ff89a1' }} />
              <span style={{ ...dotStyle, background: '#ffadc0' }} />
            </div>
            <div style={terminalFileStyle}>cartinha.txt</div>
          </div>

          <div style={terminalBodyStyle}>
            <p style={terminalLineStyle}>┌─ Criando Cartinha Especial</p>
            <p style={terminalLineStyle}>│</p>
            <p style={terminalLineStyle}>│ Para: {form.toName || 'Maria'}</p>
            <p style={terminalLineStyle}>│ De: {form.fromName || 'João'}</p>
            <p style={terminalLineStyle}>└──────────────────────────────</p>
            <br />
            <p style={terminalLineStyle}>[1/8] 🤖 IA</p>
            <p style={terminalLineStyle}>[2/8] 💌 Mensagem</p>
            <p style={terminalLineStyle}>[3/8] 📸 Fotos</p>
            <p style={terminalLineStyle}>[4/8] 🎵 Música</p>
            <p style={terminalLineStyle}>[5/8] 🔒 Banco</p>
            <p style={terminalLineStyle}>[6/8] 🔗 Link curto</p>
            <p style={terminalLineStyle}>[7/8] ✨ Surpresa</p>
            <p style={terminalLineStyle}>[8/8] ❤️ Resposta</p>
          </div>
        </div>

        <div style={heroTextWrapStyle}>
          <h1 style={heroTitleStyle(accent)}>
            Crie cartinhas
            <br />
            para uma pessoa
            <br />
            especial
          </h1>

          <div style={{ ...heroUnderlineStyle, background: accent.gradient }} />

          <p style={heroSubtitleStyle}>
            Agora com link curto salvo em banco, pronto para compartilhar de um jeito muito mais profissional.
          </p>
        </div>
      </section>

      <section className="builder-grid" style={builderWrapStyle}>
        <div style={glassCardStyle}>
          <h2 style={cardTitleStyle}>Monte sua cartinha</h2>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Seu nome</label>
              <input
                name="fromName"
                value={form.fromName}
                onChange={handleChange}
                placeholder="Ex: Fábio"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Nome da pessoa</label>
              <input
                name="toName"
                value={form.toName}
                onChange={handleChange}
                placeholder="Ex: Ana"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Tema da mensagem</label>
              <select name="tone" value={form.tone} onChange={handleChange} style={inputStyle}>
                <option value="romantico">Romântico elegante</option>
                <option value="intenso">Apaixonado intenso</option>
                <option value="fofo">Fofo delicado</option>
                <option value="engracado">Engraçado romântico</option>
                <option value="aniversario">Aniversário</option>
                <option value="desculpas">Pedido de desculpas</option>
                <option value="namoro">Pedido de namoro</option>
              </select>
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Lembrança especial</label>
              <input
                name="memory"
                value={form.memory}
                onChange={handleChange}
                placeholder="Ex: nossa primeira viagem"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={fieldWrapStyle}>
            <label style={labelStyle}>Mensagem</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem aqui ou use a IA para gerar uma..."
              style={textareaStyle}
            />
          </div>

          <div className="triple-grid" style={tripleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Fotos (até 3)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosUpload}
                style={fileInputStyle}
              />

              {photos.length > 0 && (
                <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                  {photos.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => removePhoto(index)}
                      style={removePhotoButtonStyle}
                    >
                      Remover foto {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Link da música</label>
              <input
                name="musicUrl"
                value={form.musicUrl}
                onChange={handleChange}
                placeholder="Spotify, YouTube ou mp3"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>WhatsApp para resposta</label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="Ex: 11999999999"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Texto do botão final</label>
              <input
                name="buttonText"
                value={form.buttonText}
                onChange={handleChange}
                placeholder="Responder agora 💖"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Cor principal</label>
              <select name="accent" value={form.accent} onChange={handleChange} style={inputStyle}>
                <option value="rosa">Rosa premium</option>
                <option value="roxo">Roxo neon</option>
                <option value="vinho">Vinho elegante</option>
              </select>
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <button
              type="button"
              onClick={generateAiMessage}
              style={{ ...secondaryButtonStyle, color: '#fff' }}
            >
              {loadingAi ? 'Gerando com IA...' : 'Gerar mensagem com IA'}
            </button>

            <button type="button" onClick={copyMessage} style={secondaryButtonStyle}>
              {copiedMessage ? 'Mensagem copiada!' : 'Copiar mensagem'}
            </button>
          </div>

          <button
            type="button"
            onClick={handlePagamento}
            style={{ ...primaryButtonStyle, background: accent.gradient }}
          >
            {paying ? 'Abrindo pagamento...' : 'Finalizar e enviar — R$ 9,90'}
          </button>
        </div>

        <div style={glassCardStyle}>
          <h2 style={cardTitleStyle}>Prévia premium</h2>

          <div style={previewMessageStyle}>
            {form.message || 'Sua mensagem vai aparecer aqui...'}
          </div>

          {photos.length > 0 && (
            <div className="photo-grid" style={photoGridStyle}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Preview ${index + 1}`}
                  style={photoStyle}
                />
              ))}
            </div>
          )}

          {mediaType !== 'none' && (
            <div style={mediaCardStyle}>
              <div style={mediaTitleStyle}>Prévia da música 🎵</div>

              {mediaType === 'audio' && (
                <audio controls style={{ width: '100%' }}>
                  <source src={form.musicUrl} />
                </audio>
              )}

              {mediaType === 'spotify' && mediaEmbedUrl && (
                <iframe
                  src={mediaEmbedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={iframeStyle}
                />
              )}

              {mediaType === 'youtube' && mediaEmbedUrl && (
                <div style={videoWrapStyle}>
                  <iframe
                    src={mediaEmbedUrl}
                    title="YouTube player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={videoIframeStyle}
                  />
                </div>
              )}
            </div>
          )}

          <div style={{ ...upsellBoxStyle, background: accent.soft, color: accent.text }}>
            Na mensagem final vai aparecer:
            <br />
            <strong>“Responda essa mensagem e demonstre seu amor 💖”</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

function getMediaType(url) {
  if (!url) return 'none'
  const lower = url.toLowerCase()

  if (
    lower.includes('.mp3') ||
    lower.includes('.wav') ||
    lower.includes('.ogg') ||
    lower.includes('.m4a')
  ) {
    return 'audio'
  }

  if (lower.includes('spotify.com')) return 'spotify'
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube'

  return 'none'
}

function getEmbedUrl(url) {
  if (!url) return ''

  try {
    if (url.includes('spotify.com')) {
      return url.replace('open.spotify.com/', 'open.spotify.com/embed/')
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    if (url.includes('youtube.com/watch?v=')) {
      const parsed = new URL(url)
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    return ''
  } catch {
    return ''
  }
}

function ResponsiveStyles() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      input::placeholder,
      textarea::placeholder {
        color: rgba(255, 255, 255, 0.55);
      }

      select,
      input,
      textarea,
      button {
        font: inherit;
      }

      @media (max-width: 1100px) {
        .hero-grid,
        .builder-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 760px) {
        .double-grid,
        .triple-grid,
        .photo-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top, rgba(120,10,25,0.28), transparent 20%), radial-gradient(circle at bottom, rgba(180,35,60,0.18), transparent 18%), linear-gradient(180deg, #1a0208 0%, #120106 100%)',
  color: '#fff',
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  position: 'relative',
  overflow: 'hidden'
}

const heartsOverlayStyle = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  opacity: 0.22
}

const heartStyle = {
  position: 'absolute',
  fontSize: 26,
  textShadow: '0 0 18px rgba(255,255,255,0.18)'
}

const topRibbonStyle = {
  width: '100%',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 800,
  fontSize: 16,
  padding: '14px 20px',
  position: 'relative',
  zIndex: 2
}

const heroStyle = {
  maxWidth: 1400,
  margin: '0 auto',
  padding: '60px 28px 24px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 40,
  alignItems: 'center',
  position: 'relative',
  zIndex: 2
}

const terminalCardStyle = {
  background: '#1a1a1f',
  borderRadius: 30,
  overflow: 'hidden',
  boxShadow: '0 30px 80px rgba(0,0,0,0.42)',
  border: '1px solid rgba(255,255,255,0.06)'
}

const terminalHeaderStyle = {
  background: '#3b3740',
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const terminalDotsStyle = {
  display: 'flex',
  gap: 10
}

const dotStyle = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  display: 'inline-block'
}

const terminalFileStyle = {
  color: '#ddd1da',
  fontWeight: 700,
  fontSize: 18
}

const terminalBodyStyle = {
  padding: 28,
  fontFamily: '"Courier New", monospace',
  fontSize: 20,
  color: '#efe4ec',
  lineHeight: 1.8
}

const terminalLineStyle = {
  margin: 0
}

const heroTextWrapStyle = {
  paddingRight: 10
}

const heroTitleStyle = (accent) => ({
  fontSize: 'clamp(40px, 5vw, 74px)',
  lineHeight: 0.98,
  margin: 0,
  fontWeight: 900,
  background: accent.gradient,
  WebkitBackgroundClip: 'text',
  color: 'transparent'
})

const heroUnderlineStyle = {
  height: 6,
  width: '100%',
  margin: '18px 0 28px',
  borderRadius: 999
}

const heroSubtitleStyle = {
  fontSize: 'clamp(18px, 1.7vw, 24px)',
  color: '#ead8df',
  lineHeight: 1.5,
  margin: 0
}

const builderWrapStyle = {
  maxWidth: 1400,
  margin: '0 auto',
  padding: '16px 28px 60px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 28,
  position: 'relative',
  zIndex: 2
}

const glassCardStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 30,
  padding: 28,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 18px 60px rgba(0,0,0,0.18)'
}

const cardTitleStyle = {
  marginTop: 0,
  marginBottom: 22,
  fontSize: 34,
  color: '#fff',
  fontWeight: 800
}

const fieldWrapStyle = {
  marginBottom: 16
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#f2d9e4',
  fontSize: 14,
  fontWeight: 700
}

const inputStyle = {
  width: '100%',
  padding: '15px 16px',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.07)',
  color: '#fff',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box'
}

const textareaStyle = {
  width: '100%',
  minHeight: 180,
  padding: '16px 18px',
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.07)',
  color: '#fff',
  fontSize: 16,
  outline: 'none',
  resize: 'vertical',
  boxSizing: 'border-box',
  lineHeight: 1.7
}

const fileInputStyle = {
  width: '100%',
  color: '#fff',
  fontSize: 14
}

const doubleGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  marginBottom: 12
}

const tripleGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 14
}

const primaryButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 999,
  padding: '19px 22px',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900,
  cursor: 'pointer',
  marginTop: 8,
  boxShadow: '0 16px 34px rgba(255,110,168,0.26)'
}

const secondaryButtonStyle = {
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 16,
  padding: '15px 16px',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer'
}

const removePhotoButtonStyle = {
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 12,
  padding: '10px 12px',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  textAlign: 'left'
}

const previewMessageStyle = {
  minHeight: 220,
  borderRadius: 22,
  padding: 22,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
  fontSize: 17
}

const upsellBoxStyle = {
  marginTop: 22,
  padding: 18,
  borderRadius: 18,
  lineHeight: 1.7,
  border: '1px solid rgba(255,255,255,0.08)'
}

const photoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  marginTop: 18
}

const photoStyle = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.10)'
}

const mediaCardStyle = {
  marginTop: 18,
  padding: 18,
  borderRadius: 22,
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.08)'
}

const mediaTitleStyle = {
  color: '#ffe0ec',
  fontWeight: 800,
  marginBottom: 12
}

const iframeStyle = {
  border: 'none',
  borderRadius: 16
}

const videoWrapStyle = {
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%',
  borderRadius: 18,
  overflow: 'hidden'
}

const videoIframeStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 'none'
}
