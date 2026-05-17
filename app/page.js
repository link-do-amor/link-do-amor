'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [typed, setTyped] = useState('')

  const text = 'Para: Meu amor\nDe: Você 💖\nStatus: entregue com amor'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTyped(text.slice(0, i))
      i++

      if (i > text.length) {
        clearInterval(interval)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [])

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 40px !important;
          }

          .hero-title {
            font-size: 56px !important;
          }

          .mockup {
            max-width: 100% !important;
          }

          .stats {
            grid-template-columns: 1fr !important;
          }

          .steps-grid,
          .proof-grid,
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 520px) {
          .hero-title {
            font-size: 44px !important;
            letter-spacing: -1.5px !important;
          }

          .hero-subtitle {
            font-size: 18px !important;
          }

          .cta-row {
            flex-direction: column !important;
          }

          .cta-row a {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      <div style={bgGlowOneStyle} />
      <div style={bgGlowTwoStyle} />
      <div style={bgGlowThreeStyle} />

      <header style={headerStyle}>
        <Link href="/" style={logoStyle}>
          <span style={logoIconStyle}>💌</span>
          <span>Link do Amor</span>
        </Link>

        <nav style={navStyle}>
          <a href="#como-funciona" style={navLinkStyle}>Como funciona</a>
          <a href="#depoimentos" style={navLinkStyle}>Depoimentos</a>
          <Link href="/criar" style={headerButtonStyle}>Criar agora</Link>
        </nav>
      </header>

      <section className="hero-grid" style={heroStyle}>
        <div style={heroLeftStyle}>
          <div style={badgeStyle}>
            <span>✨</span>
            <span>Surpreenda quem você ama em poucos minutos</span>
          </div>

          <h1 className="hero-title" style={titleStyle}>
            Transforme sentimentos em uma
            <span style={gradientTextStyle}> cartinha inesquecível</span>
          </h1>

          <p className="hero-subtitle" style={subtitleStyle}>
            Crie uma declaração romântica com IA, fotos, música e uma página linda para enviar por WhatsApp ou Instagram.
          </p>

          <div className="cta-row" style={ctaRowStyle}>
            <Link href="/criar" style={primaryButtonStyle}>
              💖 Criar minha cartinha agora
            </Link>

            <a href="#preview" style={secondaryButtonStyle}>
              Ver exemplo
            </a>
          </div>

          <div className="stats" style={statsStyle}>
            <div style={statCardStyle}>
              <strong style={statNumberStyle}>+3.842</strong>
              <span style={statLabelStyle}>cartinhas criadas</span>
            </div>

            <div style={statCardStyle}>
              <strong style={statNumberStyle}>R$ 9,90</strong>
              <span style={statLabelStyle}>surpresa completa</span>
            </div>

            <div style={statCardStyle}>
              <strong style={statNumberStyle}>100%</strong>
              <span style={statLabelStyle}>online e seguro</span>
            </div>
          </div>
        </div>

        <div style={heroRightStyle}>
          <div className="mockup" style={mockupStyle}>
            <div style={mockupGlowStyle} />

            <div style={windowStyle}>
              <div style={windowTopStyle}>
                <div style={dotsStyle}>
                  <span style={dotStyle} />
                  <span style={dotStyle} />
                  <span style={dotStyle} />
                </div>

                <strong>cartinha.txt</strong>
              </div>

              <div style={terminalStyle}>
                <pre style={preStyle}>
{`┌─ Cartinha Especial
│
${typed}
└────────────────────

[1/8] 🤖 IA
[2/8] 💌 Mensagem
[3/8] 📸 Fotos
[4/8] 🎵 Música
[5/8] 🔒 Privada
[6/8] 🔗 Link curto
[7/8] ✨ Surpresa
[8/8] ❤️ Resposta`}
                </pre>
              </div>
            </div>

            <div style={floatingNoteStyle}>
              “Ela vai guardar isso pra sempre.”
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <span style={smallLabelStyle}>Simples, rápido e emocionante</span>
          <h2 style={sectionTitleStyle}>Como funciona</h2>
        </div>

        <div className="steps-grid" style={stepsGridStyle}>
          <Step number="01" icon="✍️" title="Crie" text="Escreva do seu jeito ou gere uma mensagem romântica com IA." />
          <Step number="02" icon="📸" title="Personalize" text="Adicione fotos, música, lembranças e o nome da pessoa." />
          <Step number="03" icon="💳" title="Pague" text="Pagamento seguro via Mercado Pago, Pix ou cartão." />
          <Step number="04" icon="💖" title="Surpreenda" text="Envie o link e deixe a pessoa viver esse momento especial." />
        </div>
      </section>

      <section id="preview" style={previewSectionStyle}>
        <div style={paperWrapStyle}>
          <div style={paperStyle}>
            <div style={paperDateStyle}>16/05/2026</div>
            <div style={paperHeartStyle}>♡</div>

            <h2 style={paperTitleStyle}>Minha pessoa especial,</h2>
            <div style={paperUnderlineStyle} />

            <p style={paperTextStyle}>
              Desde que você apareceu na minha vida, tudo ficou mais bonito, mais leve e mais verdadeiro.
              Você tem esse jeito único de transformar momentos simples em lembranças inesquecíveis.
            </p>

            <p style={paperTextStyle}>
              Essa cartinha é só uma forma de dizer que você importa, que você faz diferença e que merece ser lembrada com carinho.
            </p>

            <div style={paperFinalStyle}>
              Te amo mais do que as palavras conseguem dizer.
            </div>

            <div style={paperSignatureStyle}>Com amor, Você</div>
          </div>
        </div>

        <div style={previewTextStyle}>
          <span style={smallLabelStyle}>Visual apaixonante</span>
          <h2 style={sectionTitleStyle}>Uma carta que parece feita à mão</h2>
          <p style={sectionParagraphStyle}>
            A pessoa recebe uma experiência romântica, com visual de carta, clima de surpresa e botão para responder no WhatsApp.
          </p>

          <Link href="/criar" style={primaryButtonStyle}>
            Criar uma igual agora
          </Link>
        </div>
      </section>

      <section id="depoimentos" style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <span style={smallLabelStyle}>Prova social</span>
          <h2 style={sectionTitleStyle}>Histórias que emocionam</h2>
        </div>

        <div className="proof-grid" style={proofGridStyle}>
          <Testimonial text="Eu mandei pra minha namorada e ela chorou lendo. Ficou muito mais bonito do que eu imaginei." name="Lucas M." city="São Paulo, SP" />
          <Testimonial text="A gente namora à distância e isso fez ela se sentir muito perto de mim. Recomendo demais." name="Pedro A." city="Rio de Janeiro, RJ" />
          <Testimonial text="Ficou lindo, com nossas fotos e música. Foi um presente simples, mas muito especial." name="Gabriela S." city="Belo Horizonte, MG" />
        </div>
      </section>

      <section style={featuresSectionStyle}>
        <div className="features-grid" style={featuresGridStyle}>
          <Feature icon="🔒" title="Pagamento seguro" text="Processado pelo Mercado Pago." />
          <Feature icon="⚡" title="Entrega rápida" text="Cartinha liberada após confirmação." />
          <Feature icon="📱" title="Perfeita para WhatsApp" text="Link fácil de compartilhar." />
        </div>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Sua pessoa especial merece uma surpresa inesquecível.</h2>
        <p style={finalTextStyle}>Crie agora em poucos minutos.</p>

        <Link href="/criar" style={finalButtonStyle}>
          💖 Criar minha cartinha por R$ 9,90
        </Link>
      </section>

      <footer style={footerStyle}>
        <span>💌 Link do Amor © 2026</span>
        <span>Feito com amor para conectar corações</span>
      </footer>
    </main>
  )
}

function Step({ number, icon, title, text }) {
  return (
    <div style={stepCardStyle}>
      <div style={stepTopStyle}>
        <span style={stepNumberStyle}>{number}</span>
        <span style={stepIconStyle}>{icon}</span>
      </div>
      <h3 style={stepTitleStyle}>{title}</h3>
      <p style={stepTextStyle}>{text}</p>
    </div>
  )
}

function Testimonial({ text, name, city }) {
  return (
    <div style={testimonialStyle}>
      <div style={quoteIconStyle}>“</div>
      <p style={testimonialTextStyle}>{text}</p>
      <div style={personStyle}>
        <div style={avatarStyle}>{name[0]}</div>
        <div>
          <strong>{name}</strong>
          <p style={cityStyle}>{city}</p>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, text }) {
  return (
    <div style={featureStyle}>
      <span style={featureIconStyle}>{icon}</span>
      <div>
        <strong style={featureTitleStyle}>{title}</strong>
        <p style={featureTextStyle}>{text}</p>
      </div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(255,90,140,0.22), transparent 28%), radial-gradient(circle at 85% 20%, rgba(180,80,255,0.16), transparent 24%), linear-gradient(180deg, #170005 0%, #080002 55%, #120005 100%)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  overflow: 'hidden'
}

const bgGlowOneStyle = {
  position: 'fixed',
  top: -150,
  left: -140,
  width: 420,
  height: 420,
  borderRadius: '50%',
  background: 'rgba(255,70,130,0.20)',
  filter: 'blur(80px)',
  animation: 'pulseGlow 5s infinite'
}

const bgGlowTwoStyle = {
  position: 'fixed',
  right: -180,
  top: 180,
  width: 420,
  height: 420,
  borderRadius: '50%',
  background: 'rgba(190,90,255,0.16)',
  filter: 'blur(90px)',
  animation: 'pulseGlow 7s infinite'
}

const bgGlowThreeStyle = {
  position: 'fixed',
  bottom: -160,
  left: '30%',
  width: 360,
  height: 360,
  borderRadius: '50%',
  background: 'rgba(255,150,80,0.12)',
  filter: 'blur(80px)'
}

const headerStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '24px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  zIndex: 3
}

const logoStyle = {
  textDecoration: 'none',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 24,
  fontWeight: 900
}

const logoIconStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)'
}

const navStyle = {
  display: 'flex',
  gap: 22,
  alignItems: 'center'
}

const navLinkStyle = {
  color: 'rgba(255,255,255,0.75)',
  textDecoration: 'none',
  fontWeight: 700
}

const headerButtonStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '12px 18px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(255,255,255,0.07)',
  fontWeight: 900
}

const heroStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '70px 20px 90px',
  minHeight: '88vh',
  display: 'grid',
  gridTemplateColumns: '1.05fr .95fr',
  gap: 70,
  alignItems: 'center',
  position: 'relative',
  zIndex: 2
}

const heroLeftStyle = {
  animation: 'fadeUp .8s ease both'
}

const badgeStyle = {
  display: 'inline-flex',
  gap: 9,
  alignItems: 'center',
  padding: '12px 18px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#ffd1df',
  fontWeight: 800,
  marginBottom: 26
}

const titleStyle = {
  fontSize: 'clamp(58px, 7vw, 98px)',
  lineHeight: 0.98,
  letterSpacing: '-4px',
  margin: 0,
  fontWeight: 900
}

const gradientTextStyle = {
  display: 'block',
  background: 'linear-gradient(90deg,#ff6ea8,#ffb36b,#c25cff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const subtitleStyle = {
  maxWidth: 720,
  margin: '28px 0 0',
  fontSize: 23,
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.76)'
}

const ctaRowStyle = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  marginTop: 38
}

const primaryButtonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  padding: '18px 30px',
  borderRadius: 999,
  background: 'linear-gradient(90deg,#ff5f9e,#bc4cff)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900,
  boxShadow: '0 18px 55px rgba(255,95,158,0.34)'
}

const secondaryButtonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  padding: '18px 30px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 900
}

const statsStyle = {
  marginTop: 34,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  maxWidth: 720
}

const statCardStyle = {
  padding: 18,
  borderRadius: 22,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)'
}

const statNumberStyle = {
  display: 'block',
  fontSize: 26,
  marginBottom: 4
}

const statLabelStyle = {
  color: 'rgba(255,255,255,0.62)',
  fontWeight: 700
}

const heroRightStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const mockupStyle = {
  width: '100%',
  maxWidth: 460,
  position: 'relative',
  animation: 'float 5s ease-in-out infinite'
}

const mockupGlowStyle = {
  position: 'absolute',
  inset: 20,
  background: 'rgba(255,85,145,0.18)',
  filter: 'blur(55px)',
  borderRadius: 50
}

const windowStyle = {
  position: 'relative',
  borderRadius: 32,
  overflow: 'hidden',
  background: '#16131d',
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 35px 90px rgba(0,0,0,0.52)'
}

const windowTopStyle = {
  height: 70,
  background: '#2b2535',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 22px'
}

const dotsStyle = {
  display: 'flex',
  gap: 9
}

const dotStyle = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  background: '#ff7aaa'
}

const terminalStyle = {
  padding: 34
}

const preStyle = {
  margin: 0,
  minHeight: 420,
  whiteSpace: 'pre-wrap',
  fontSize: 19,
  lineHeight: 1.8,
  color: '#fff',
  fontFamily: 'Courier New, monospace'
}

const floatingNoteStyle = {
  position: 'absolute',
  right: -26,
  bottom: -28,
  padding: '16px 18px',
  borderRadius: 22,
  background: 'rgba(255,255,255,0.09)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#ffd3df',
  fontFamily: 'Georgia, serif',
  transform: 'rotate(-6deg)',
  boxShadow: '0 18px 45px rgba(0,0,0,0.35)'
}

const sectionStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '90px 20px',
  position: 'relative',
  zIndex: 2
}

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: 46
}

const smallLabelStyle = {
  color: '#ff9dbf',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: 1.2,
  fontSize: 13
}

const sectionTitleStyle = {
  fontSize: 'clamp(40px, 5vw, 64px)',
  lineHeight: 1.08,
  margin: '12px 0 0',
  fontWeight: 900,
  letterSpacing: '-2px'
}

const stepsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 18
}

const stepCardStyle = {
  padding: 28,
  borderRadius: 30,
  background: 'rgba(255,255,255,0.055)',
  border: '1px solid rgba(255,255,255,0.09)'
}

const stepTopStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 24
}

const stepNumberStyle = {
  color: 'rgba(255,255,255,0.35)',
  fontSize: 24,
  fontWeight: 900
}

const stepIconStyle = {
  fontSize: 42
}

const stepTitleStyle = {
  fontSize: 28,
  margin: '0 0 10px'
}

const stepTextStyle = {
  color: 'rgba(255,255,255,0.68)',
  lineHeight: 1.65,
  fontSize: 17,
  margin: 0
}

const previewSectionStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '70px 20px 110px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 54,
  alignItems: 'center',
  position: 'relative',
  zIndex: 2
}

const paperWrapStyle = {
  position: 'relative'
}

const paperStyle = {
  background: 'linear-gradient(180deg,#f3c998,#e7b77f)',
  color: '#32110c',
  padding: 42,
  borderRadius: 12,
  boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
  border: '1px solid rgba(110,50,15,0.35)'
}

const paperDateStyle = {
  textAlign: 'right',
  fontFamily: 'Comic Sans MS, cursive',
  fontSize: 15
}

const paperHeartStyle = {
  textAlign: 'center',
  fontSize: 38,
  color: '#c94b5b'
}

const paperTitleStyle = {
  fontFamily: 'Brush Script MT, Segoe Script, cursive',
  fontSize: 48,
  fontWeight: 400,
  margin: 0
}

const paperUnderlineStyle = {
  width: 190,
  height: 3,
  background: '#d85b68',
  margin: '6px 0 24px',
  borderRadius: 999
}

const paperTextStyle = {
  fontFamily: 'Segoe Script, Brush Script MT, cursive',
  fontSize: 26,
  lineHeight: 1.65
}

const paperFinalStyle = {
  fontFamily: 'Segoe Script, Brush Script MT, cursive',
  fontSize: 27,
  marginTop: 18,
  borderBottom: '3px solid rgba(216,91,104,0.75)'
}

const paperSignatureStyle = {
  marginTop: 26,
  fontFamily: 'Brush Script MT, Segoe Script, cursive',
  fontSize: 48,
  textAlign: 'right'
}

const previewTextStyle = {
  maxWidth: 560
}

const sectionParagraphStyle = {
  fontSize: 22,
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.75)',
  margin: '24px 0 32px'
}

const proofGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 20
}

const testimonialStyle = {
  padding: 30,
  borderRadius: 30,
  background: 'rgba(255,255,255,0.055)',
  border: '1px solid rgba(255,255,255,0.09)'
}

const quoteIconStyle = {
  fontSize: 58,
  color: '#ff75a8',
  height: 48
}

const testimonialTextStyle = {
  color: 'rgba(255,255,255,0.82)',
  fontSize: 18,
  lineHeight: 1.7
}

const personStyle = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  marginTop: 24
}

const avatarStyle = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  background: 'linear-gradient(90deg,#ff6ea8,#c25cff)',
  fontWeight: 900
}

const cityStyle = {
  margin: '3px 0 0',
  color: 'rgba(255,255,255,0.55)'
}

const featuresSectionStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '20px 20px 90px',
  position: 'relative',
  zIndex: 2
}

const featuresGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 18
}

const featureStyle = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  padding: 24,
  borderRadius: 26,
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.08)'
}

const featureIconStyle = {
  fontSize: 34
}

const featureTitleStyle = {
  fontSize: 19
}

const featureTextStyle = {
  margin: '5px 0 0',
  color: 'rgba(255,255,255,0.60)'
}

const finalCtaStyle = {
  maxWidth: 1000,
  margin: '0 auto',
  padding: '90px 20px 110px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2
}

const finalTitleStyle = {
  fontSize: 'clamp(42px,6vw,76px)',
  lineHeight: 1.08,
  margin: 0,
  letterSpacing: '-2px'
}

const finalTextStyle = {
  fontSize: 22,
  color: 'rgba(255,255,255,0.72)',
  margin: '22px 0 36px'
}

const finalButtonStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  padding: '22px 40px',
  borderRadius: 999,
  background: 'linear-gradient(90deg,#ff5f9e,#bc4cff)',
  color: '#fff',
  fontSize: 22,
  fontWeight: 900,
  boxShadow: '0 18px 55px rgba(255,95,158,0.34)'
}

const footerStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '28px 20px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 18,
  flexWrap: 'wrap',
  color: 'rgba(255,255,255,0.55)',
  position: 'relative',
  zIndex: 2
}
