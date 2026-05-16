'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main style={pageStyle}>
      <div style={bgGlowOne} />
      <div style={bgGlowTwo} />

      <section style={heroStyle}>
        <div style={leftStyle}>
          <div style={badgeStyle}>
            ✨ Surpreenda quem você ama de verdade
          </div>

          <h1 style={titleStyle}>
            Transforme sentimentos em uma
            <span style={gradientText}> cartinha inesquecível</span>
          </h1>

          <p style={subtitleStyle}>
            Crie mensagens românticas com fotos, música, visual apaixonante
            e entrega instantânea por link.
          </p>

          <div style={buttonsStyle}>
            <Link href="/criar" style={primaryButton}>
              💖 Criar minha cartinha
            </Link>

            <a href="#como-funciona" style={secondaryButton}>
              Ver como funciona
            </a>
          </div>

          <div style={statsStyle}>
            <div style={statItem}>
              <span style={statNumber}>+2.000</span>
              <span style={statLabel}>cartinhas criadas</span>
            </div>

            <div style={statItem}>
              <span style={statNumber}>24h</span>
              <span style={statLabel}>link disponível</span>
            </div>

            <div style={statItem}>
              <span style={statNumber}>100%</span>
              <span style={statLabel}>online</span>
            </div>
          </div>
        </div>

        <div style={rightStyle}>
          <div style={phoneStyle}>
            <div style={phoneTop}>
              <div style={dotsWrap}>
                <span style={dot} />
                <span style={dot} />
                <span style={dot} />
              </div>

              <span style={fileName}>cartinha.txt</span>
            </div>

            <div style={phoneContent}>
              <div style={letterHeader}>
                ┌ Cartinha Especial
                <br />
                Criada
                <br />│
                <br />│ Para: Meu amor
                <br />│ De: Você 💖
                <br />│ Status: entregue com amor
                <br />└────────────────
              </div>

              <div style={stepsStyle}>
                <div>[1/8] 🤖 IA</div>
                <div>[2/8] 💌 Mensagem</div>
                <div>[3/8] 📸 Fotos</div>
                <div>[4/8] 🎵 Música</div>
                <div>[5/8] 🔒 Privada</div>
                <div>[6/8] 🔗 Link curto</div>
                <div>[7/8] ✨ Surpresa</div>
                <div>[8/8] ❤️ Resposta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" style={sectionStyle}>
        <h2 style={sectionTitle}>Como funciona</h2>

        <div style={cardsGrid}>
          <div style={cardStyle}>
            <div style={iconStyle}>💌</div>
            <h3 style={cardTitle}>Escreva sua mensagem</h3>
            <p style={cardText}>
              Crie uma declaração única ou deixe nossa IA ajudar.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📸</div>
            <h3 style={cardTitle}>Adicione fotos e música</h3>
            <p style={cardText}>
              Transforme a cartinha em uma experiência emocional.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>🔗</div>
            <h3 style={cardTitle}>Compartilhe o link</h3>
            <p style={cardText}>
              Envie pelo WhatsApp, Instagram ou onde quiser.
            </p>
          </div>
        </div>
      </section>

      <section style={testimonialSection}>
        <div style={testimonialCard}>
          <p style={testimonialText}>
            “Eu mandei sem expectativa… e ela chorou lendo. Foi uma das
            coisas mais bonitas que já fiz.”
          </p>

          <span style={testimonialAuthor}>— Cliente apaixonado ❤️</span>
        </div>
      </section>

      <section style={ctaSection}>
        <h2 style={ctaTitle}>
          Sua pessoa especial merece algo inesquecível.
        </h2>

        <p style={ctaText}>
          Leva menos de 3 minutos para criar uma cartinha.
        </p>

        <Link href="/criar" style={ctaButton}>
          💖 Criar agora por R$ 9,90
        </Link>
      </section>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(255,90,120,0.20), transparent 24%), radial-gradient(circle at bottom right, rgba(255,120,80,0.18), transparent 24%), linear-gradient(180deg, #1a0005 0%, #090002 100%)',
  color: '#fff',
  padding: '40px 20px 80px',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: 'Arial, sans-serif'
}

const bgGlowOne = {
  position: 'absolute',
  top: -120,
  left: -120,
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'rgba(255,70,120,0.20)',
  filter: 'blur(80px)'
}

const bgGlowTwo = {
  position: 'absolute',
  bottom: -120,
  right: -120,
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'rgba(255,120,80,0.15)',
  filter: 'blur(80px)'
}

const heroStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
  gap: 60,
  alignItems: 'center',
  minHeight: '90vh',
  position: 'relative',
  zIndex: 2
}

const leftStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24
}

const badgeStyle = {
  alignSelf: 'flex-start',
  padding: '10px 18px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  fontWeight: 700,
  color: '#ffd0df'
}

const titleStyle = {
  fontSize: 'clamp(48px,8vw,88px)',
  lineHeight: 1,
  margin: 0,
  fontWeight: 900,
  letterSpacing: '-3px'
}

const gradientText = {
  display: 'block',
  background: 'linear-gradient(90deg,#ff7ab6,#ffb36b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const subtitleStyle = {
  fontSize: 22,
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.78)',
  maxWidth: 650
}

const buttonsStyle = {
  display: 'flex',
  gap: 18,
  flexWrap: 'wrap'
}

const primaryButton = {
  textDecoration: 'none',
  padding: '18px 30px',
  borderRadius: 999,
  background: 'linear-gradient(90deg,#ff5f8f,#c12fff)',
  color: '#fff',
  fontWeight: 900,
  fontSize: 18,
  boxShadow: '0 18px 50px rgba(255,80,140,0.35)'
}

const secondaryButton = {
  textDecoration: 'none',
  padding: '18px 30px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontWeight: 800,
  fontSize: 18
}

const statsStyle = {
  display: 'flex',
  gap: 30,
  flexWrap: 'wrap',
  marginTop: 14
}

const statItem = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4
}

const statNumber = {
  fontSize: 28,
  fontWeight: 900
}

const statLabel = {
  color: 'rgba(255,255,255,0.65)'
}

const rightStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const phoneStyle = {
  width: 360,
  borderRadius: 30,
  overflow: 'hidden',
  background: '#15131c',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
}

const phoneTop = {
  height: 70,
  background: '#2a2435',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 22px'
}

const dotsWrap = {
  display: 'flex',
  gap: 8
}

const dot = {
  width: 12,
  height: 12,
  borderRadius: '50%',
  background: '#ff78a8'
}

const fileName = {
  color: '#fff',
  fontWeight: 800
}

const phoneContent = {
  padding: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 30
}

const letterHeader = {
  fontFamily: 'monospace',
  fontSize: 20,
  lineHeight: 1.8,
  color: '#fff'
}

const stepsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  color: '#d4d4d4',
  fontFamily: 'monospace',
  fontSize: 18
}

const sectionStyle = {
  maxWidth: 1200,
  margin: '100px auto 0',
  position: 'relative',
  zIndex: 2
}

const sectionTitle = {
  textAlign: 'center',
  fontSize: 52,
  marginBottom: 50
}

const cardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
  gap: 24
}

const cardStyle = {
  padding: 34,
  borderRadius: 30,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)'
}

const iconStyle = {
  fontSize: 46,
  marginBottom: 16
}

const cardTitle = {
  fontSize: 28,
  marginBottom: 14
}

const cardText = {
  fontSize: 18,
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.72)'
}

const testimonialSection = {
  maxWidth: 900,
  margin: '110px auto 0'
}

const testimonialCard = {
  padding: 40,
  borderRadius: 34,
  background: 'linear-gradient(135deg, rgba(255,90,140,0.15), rgba(255,180,100,0.10))',
  border: '1px solid rgba(255,255,255,0.08)',
  textAlign: 'center'
}

const testimonialText = {
  fontSize: 30,
  lineHeight: 1.7,
  fontWeight: 700
}

const testimonialAuthor = {
  display: 'block',
  marginTop: 24,
  color: '#ffb3ca',
  fontWeight: 700
}

const ctaSection = {
  maxWidth: 1000,
  margin: '120px auto 0',
  textAlign: 'center'
}

const ctaTitle = {
  fontSize: 'clamp(42px,6vw,72px)',
  marginBottom: 18,
  lineHeight: 1.1
}

const ctaText = {
  fontSize: 22,
  color: 'rgba(255,255,255,0.75)',
  marginBottom: 40
}

const ctaButton = {
  display: 'inline-block',
  textDecoration: 'none',
  padding: '22px 40px',
  borderRadius: 999,
  background: 'linear-gradient(90deg,#ff5f8f,#c12fff)',
  color: '#fff',
  fontSize: 22,
  fontWeight: 900,
  boxShadow: '0 20px 60px rgba(255,80,140,0.35)'
}
