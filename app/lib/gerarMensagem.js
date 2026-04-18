function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const intros = {
  romantico: [
    "Desde o momento em que você entrou na minha vida, tudo começou a fazer mais sentido.",
    "Existe um antes e um depois de você na minha história.",
    "Tem algo em você que mudou completamente a forma como eu vejo o mundo."
  ],
  intenso: [
    "Eu não consigo mais imaginar um dia sem você nele.",
    "Você chegou e bagunçou tudo — do melhor jeito possível.",
    "O que eu sinto por você não cabe direito em palavras… mas eu vou tentar."
  ],
  fofo: [
    "Você virou minha parte favorita dos meus dias.",
    "Tem dias que só de lembrar de você eu já fico bem.",
    "Eu nem sabia que precisava tanto de alguém até você aparecer."
  ],
  engracado: [
    "Eu ia escrever algo bonito… mas a verdade é que eu sou completamente rendido por você.",
    "Se isso fosse um filme, você já seria minha cena favorita.",
    "Você conseguiu o que ninguém conseguiu: me deixar bobo desse jeito."
  ]
}

const meio = [
  "Com você, até os momentos mais simples ganham um significado diferente.",
  "Tem uma paz em você que eu não sei explicar, mas sinto em cada detalhe.",
  "Você transforma o comum em algo especial, sem nem perceber."
]

const sentimentos = [
  "E é por isso que eu preciso te dizer o quanto você é importante pra mim.",
  "E no meio de tudo isso, eu só consigo ter mais certeza do que eu sinto por você.",
  "E cada dia que passa, eu percebo que isso aqui é muito maior do que eu imaginava."
]

const finais = [
  "Se depender de mim, isso aqui é só o começo da nossa história. 💖",
  "Eu escolheria você, de novo, em todas as versões possíveis da minha vida.",
  "E se isso tudo ainda não for suficiente… eu passo o resto da vida te provando."
]

export function gerarMensagem({ tone, toName, fromName, memory }) {
  const intro = random(intros[tone] || intros.romantico)
  const meioTxt = random(meio)
  const sentimento = random(sentimentos)
  const final = random(finais)

  return `${intro}

${memory ? `Eu guardo com muito carinho cada detalhe de ${memory}.` : ''}

${meioTxt}

${sentimento}

Com todo meu carinho,
${fromName || 'Alguém que te ama'} 💖`
}
