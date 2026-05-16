'use client'

import {
  Heart,
  ShieldCheck,
  Zap,
  Lock,
  Pencil,
  CreditCard,
  Send,
  Sparkles
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#120006] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#5b0017_0%,#120006_45%,#050505_100%)]" />

      <div className="relative z-10">
        {/* HEADER */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/20 flex items-center justify-center border border-pink-500/20">
                <Heart className="text-pink-400" fill="currentColor" />
              </div>

              <div>
                <h1 className="font-bold text-2xl">Link do Amor</h1>
                <p className="text-sm text-white/50">
                  Transforme sentimentos em memórias
                </p>
              </div>
            </div>

            <button className="px-6 py-3 rounded-full border border-pink-500/40 bg-pink-500/10 hover:bg-pink-500/20 transition-all">
              Entrar →
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 mb-8">
                <Heart size={15} fill="currentColor" />
                Transforme sentimentos em memórias
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                Crie uma cartinha
                <span className="text-pink-400 block">
                  única para quem
                </span>
                você ama ❤️
              </h1>

              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-xl">
                Um gesto simples que cria um momento inesquecível.
                Personalize, emocione e surpreenda quem importa.
              </p>

              {/* BENEFITS */}
              <div className="flex flex-wrap gap-5 mt-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <ShieldCheck className="text-pink-400" size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">Pagamento Seguro</p>
                    <p className="text-sm text-white/50">
                      Mercado Pago
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <Zap className="text-pink-400" size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">Entrega imediata</p>
                    <p className="text-sm text-white/50">
                      Após confirmação
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <Lock className="text-pink-400" size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">Privacidade total</p>
                    <p className="text-sm text-white/50">
                      Seus dados protegidos
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12">
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-xl font-bold hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(236,72,153,0.35)]">
                  Criar minha cartinha agora →
                </button>

                <div className="mt-5 flex items-center gap-3 text-white/60">
                  <div className="flex -space-x-3">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      className="w-10 h-10 rounded-full border-2 border-[#120006]"
                    />
                    <img
                      src="https://i.pravatar.cc/100?img=32"
                      className="w-10 h-10 rounded-full border-2 border-[#120006]"
                    />
                    <img
                      src="https://i.pravatar.cc/100?img=22"
                      className="w-10 h-10 rounded-full border-2 border-[#120006]"
                    />
                  </div>

                  <span>
                    +3.842 cartinhas criadas com amor
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-pink-500/20 rounded-full" />

              <div className="relative bg-gradient-to-br from-pink-500/20 to-red-500/10 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2099/2099199.png"
                  className="w-full max-w-md mx-auto drop-shadow-[0_0_40px_rgba(255,0,100,0.35)]"
                />

                <div className="absolute top-8 right-8 animate-pulse">
                  ❤️
                </div>

                <div className="absolute bottom-10 left-10 animate-bounce">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-12">
            <h2 className="text-4xl font-black text-center mb-16">
              Como funciona
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <Step
                icon={<Pencil />}
                title="1. Crie"
                desc="Personalize cada detalhe da sua cartinha"
              />

              <Step
                icon={<CreditCard />}
                title="2. Pague"
                desc="Pagamento seguro via Mercado Pago"
              />

              <Step
                icon={<Send />}
                title="3. Envie"
                desc="Compartilhe instantaneamente"
              />

              <Step
                icon={<Sparkles />}
                title="4. Emocione"
                desc="Crie uma memória inesquecível"
              />
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-4xl font-black text-center mb-14">
            Histórias que emocionam ❤️
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              name="Lucas M."
              city="São Paulo, SP"
              text="Ela chorou quando abriu a cartinha. Melhor presente que já dei."
            />

            <Testimonial
              name="Pedro A."
              city="Rio de Janeiro, RJ"
              text="Mesmo à distância consegui fazer ela se sentir especial."
            />

            <Testimonial
              name="Gabriela S."
              city="Belo Horizonte, MG"
              text="A cartinha ficou linda e cheia de detalhes nossos."
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Heart className="text-pink-400" fill="currentColor" />
              <span className="text-white/70">
                Link do Amor © 2026
              </span>
            </div>

            <p className="text-white/50">
              Feito com ❤️ para conectar corações
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}

function Step({ icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
        <div className="text-pink-400 scale-150">
          {icon}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-white/60 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

function Testimonial({ name, city, text }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="text-pink-400 text-5xl mb-6">“</div>

      <p className="text-lg text-white/80 leading-relaxed mb-8">
        {text}
      </p>

      <div className="flex items-center gap-4">
        <img
          src={`https://i.pravatar.cc/100?u=${name}`}
          className="w-14 h-14 rounded-full"
        />

        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-white/50">
            {city}
          </p>
        </div>
      </div>
    </div>
  )
}
