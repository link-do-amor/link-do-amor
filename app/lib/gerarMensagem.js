function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const intros = {
  romantico: [
    "Desde o momento em que você entrou na minha vida, tudo começou a fazer mais sentido.",
    "Existe um antes e um depois de você na minha história.",
    "Tem algo em você que mudou completamente a forma como eu vejo o mundo.",
    "Eu não sei exatamente em que momento você virou tudo pra mim… mas virou.",
    "Algumas pessoas passam pela nossa vida. Você ficou no meu coração."
  ],
  intenso: [
    "Eu não consigo mais imaginar um dia sem você nele.",
    "Você chegou e bagunçou tudo — do melhor jeito possível.",
    "O que eu sinto por você não cabe direito em palavras… mas eu vou tentar.",
    "Se eu pudesse escolher mil vezes, ainda escolheria você em todas.",
    "Você se tornou aquela presença que meu coração reconhece antes mesmo de eu perceber."
  ],
  fofo: [
    "Você virou minha parte favorita dos meus dias.",
    "Tem dias que só de lembrar de você eu já fico bem.",
    "Eu nem sabia que precisava tanto de alguém até você aparecer.",
    "Sabe quando tudo fica mais leve só porque uma pessoa existe? Então… é você.",
    "Você tem esse jeitinho de deixar meu mundo mais bonito sem fazer esforço."
  ],
  engracado: [
    "Eu ia escrever algo bonito… mas a verdade é que eu sou completamente rendido por você.",
    "Se isso fosse um filme, você já seria minha cena favorita.",
    "Você conseguiu o que ninguém conseguiu: me deixar bobo desse jeito.",
    "Eu até tento manter a postura, mas você desmonta qualquer plano meu.",
    "Era pra eu agir normalmente, só que aí você apareceu e complicou tudo."
  ],
  aniversario: [
    "Hoje não é só mais um dia — é o dia de celebrar você.",
    "Se existe um motivo especial pra comemorar hoje, com certeza é você.",
    "O mundo ficou melhor no dia em que você chegou nele.",
    "Hoje é o seu dia, mas quem ganha sou eu por ter você na minha vida.",
    "Existem datas especiais, e existe o dia em que você nasceu."
  ],
  desculpas: [
    "Tem coisas que eu deveria ter dito antes, e hoje eu não quero mais guardar.",
    "Eu sei que nem sempre fui o melhor, mas você sempre foi importante pra mim.",
    "Se eu pudesse voltar em alguns momentos, faria diferente — principalmente por nós.",
    "Eu errei, mas nunca deixei de sentir o quanto você é especial pra mim.",
    "Tem sentimentos que continuam vivos mesmo quando as palavras demoraram a chegar."
  ],
  namoro: [
    "Tem coisas que a gente sente antes mesmo de conseguir explicar, e eu senti isso com você.",
    "Eu não quero só momentos com você — eu quero história.",
    "Você não é só alguém especial, você é alguém que eu quero na minha vida.",
    "Se depender de mim, isso aqui é só o começo da nossa história.",
    "No meio de tanta coisa passageira, você apareceu com vontade de ficar."
  ]
}

const memories = [
  "Eu guardo com carinho cada detalhe de {memory}, porque momentos assim não passam despercebidos quando vêm de alguém tão especial.",
  "Toda vez que eu lembro de {memory}, eu percebo como você conseguiu marcar meu coração de um jeito único.",
  "O que vivemos em {memory} ficou guardado em mim como uma das lembranças mais bonitas que eu poderia ter.",
  "Quando penso em {memory}, eu sorrio sem perceber, porque tem coisas que a alma simplesmente não esquece.",
  "{memory} virou uma daquelas lembranças que eu quero carregar comigo por muito tempo."
]

const transitions = {
  romantico: [
    "Com você, até os momentos mais simples ganham um significado diferente.",
    "Sua presença transforma o comum em algo que merece ser guardado.",
    "Você tem esse jeito de fazer tudo parecer mais bonito, mais leve e mais verdadeiro.",
    "É impressionante como a sua presença consegue trazer paz e intensidade ao mesmo tempo."
  ],
  intenso: [
    "O que eu sinto por você cresce até nos dias em que eu tento fingir que estou calmo.",
    "Tem uma força nisso tudo que eu já não consigo mais ignorar.",
    "Você ocupa um espaço em mim que ninguém mais conseguiria ocupar.",
    "Quanto mais o tempo passa, mais eu percebo que isso é muito maior do que eu imaginei."
  ],
  fofo: [
    "Você tem um jeito doce de deixar tudo mais bonito ao seu redor.",
    "Seu carinho aparece até nas pequenas coisas, e talvez seja isso que mais me ganha.",
    "Com você, o dia parece ter mais cor, mais calma e mais vontade de sorrir.",
    "Tem uma leveza em você que faz meu coração se sentir em casa."
  ],
  engracado: [
    "E o pior é que eu já nem tento disfarçar mais o quanto você mexe comigo.",
    "Você tem esse talento raro de me deixar sem graça e feliz ao mesmo tempo.",
    "No fim das contas, eu só aceitei que você tem um efeito absurdo em mim.",
    "Eu poderia fingir normalidade, mas claramente você não colabora."
  ],
  aniversario: [
    "Hoje é um ótimo dia pra te lembrar o quanto a sua existência é valiosa.",
    "Celebrar você também é celebrar a sorte de ter cruzado o seu caminho.",
    "Tem pessoas que merecem ser lembradas com carinho todos os dias — e hoje ainda mais.",
    "Seu dia é especial porque você faz diferença na vida de quem te ama."
  ],
  desculpas: [
    "Mesmo em meio aos erros, o que eu sinto por você nunca deixou de ser verdadeiro.",
    "Tem sentimentos que continuam firmes, mesmo depois de momentos difíceis.",
    "Eu sei que atitudes importam, e é por isso que eu quis colocar meu coração aqui com sinceridade.",
    "Nem sempre acertei na forma, mas nunca foi falta de sentimento."
  ],
  namoro: [
    "Você despertou em mim uma vontade real de construir algo bonito e verdadeiro.",
    "Quando penso no futuro, é impossível não imaginar você nele.",
    "Tem uma paz em pensar em nós que eu não encontro em nenhum outro lugar.",
    "Você faz com que a ideia de continuar pareça a melhor parte da história."
  ]
}

const feelings = {
  romantico: [
    "E é por isso que eu precisava te dizer o quanto você é especial pra mim.",
    "Cada dia que passa me confirma ainda mais o tamanho do sentimento que existe aqui dentro.",
    "No meio disso tudo, eu só consigo ter mais certeza do quanto você importa pra mim.",
    "Tem um carinho em mim por você que já ultrapassou qualquer explicação simples."
  ],
  intenso: [
    "A verdade é que você mexeu comigo de um jeito profundo e impossível de esconder.",
    "Eu tentei colocar isso em palavras bonitas, mas o que sinto por você é maior do que qualquer frase.",
    "Você se tornou parte dos meus pensamentos, dos meus planos e do meu coração.",
    "O que existe aqui dentro por você não é pequeno, e eu já nem quero que seja."
  ],
  fofo: [
    "Eu gosto da paz que você me traz, da alegria que você me desperta e do bem que você me faz.",
    "Você tem um lugar muito bonito no meu coração.",
    "Seu jeitinho me conquista mais do que você imagina.",
    "É muito bom sentir que alguém como você existe tão perto de mim."
  ],
  engracado: [
    "No fim, você me desmontou direitinho e eu ainda agradeci.",
    "Você virou meu ponto fraco favorito.",
    "Eu já aceitei que você ganhou esse espaço todo em mim sem nem pedir licença.",
    "E sinceramente? Ainda bem que foi você."
  ],
  aniversario: [
    "Então hoje eu só quero que você se sinta amado, lembrado e especial do jeito que merece.",
    "Você merece um dia bonito, leve e cheio de carinho.",
    "Que nunca te faltem motivos pra sorrir, porque você merece coisas lindas.",
    "Hoje é dia de te celebrar com todo amor que couber."
  ],
  desculpas: [
    "Se ainda houver espaço pra me ouvir, eu queria que essa mensagem chegasse com todo o meu coração.",
    "Mais do que pedir desculpas, eu queria que você sentisse a verdade do que existe aqui dentro.",
    "Eu sei que palavras não apagam tudo, mas eu espero que elas mostrem sinceridade.",
    "Talvez eu tenha falhado em muita coisa, mas não no sentimento."
  ],
  namoro: [
    "Você é alguém que eu não quero só por perto — eu quero por inteiro na minha história.",
    "Estar com você parece cada vez mais a escolha certa.",
    "Eu quero viver mais capítulos ao seu lado.",
    "Você me faz querer ficar, cuidar e construir."
  ]
}

const closings = {
  romantico: [
    "Com todo meu carinho,\n{fromName} 💖",
    "Com todo meu amor e admiração,\n{fromName} 💖",
    "Com muito carinho no coração,\n{fromName} 💖"
  ],
  intenso: [
    "Com tudo o que sinto por você,\n{fromName} ❤️",
    "Com o coração inteiro,\n{fromName} ❤️",
    "Com amor, saudade e verdade,\n{fromName} ❤️"
  ],
  fofo: [
    "Com carinho e um sorriso bobo por sua causa,\n{fromName} 💕",
    "Com muito amorzinho,\n{fromName} 💕",
    "Com meu coração todo leve por sua causa,\n{fromName} 💕"
  ],
  engracado: [
    "Assinado: alguém completamente rendido por você,\n{fromName} 😌💖",
    "Com amor e sem qualquer dignidade perto de você,\n{fromName} 😅💖",
    "Do seu admirador nada discreto,\n{fromName} 💖"
  ],
  aniversario: [
    "Com carinho no seu dia especial,\n{fromName} 🎉💖",
    "Com muito amor pra você hoje e sempre,\n{fromName} 💖",
    "Te celebrando com carinho,\n{fromName} 💖"
  ],
  desculpas: [
    "Com sinceridade,\n{fromName}",
    "Com o coração aberto,\n{fromName}",
    "Com respeito e verdade,\n{fromName}"
  ],
  namoro: [
    "Com vontade de viver muito mais ao seu lado,\n{fromName} 💍💖",
    "Com carinho e intenção de ficar,\n{fromName} 💖",
    "Torcendo para isso ser só o começo,\n{fromName} 💖"
  ]
}

function applyTemplate(text, vars) {
  return text
    .replaceAll('{memory}', vars.memory || '')
    .replaceAll('{fromName}', vars.fromName || 'Alguém que te ama')
    .replaceAll('{toName}', vars.toName || 'você')
}

function resolveTone(tone) {
  const map = {
    'romântico elegante': 'romantico',
    romantico: 'romantico',
    'apaixonado intenso': 'intenso',
    intenso: 'intenso',
    'fofo delicado': 'fofo',
    fofo: 'fofo',
    engracado: 'engracado',
    'engraçado romântico': 'engracado',
    aniversario: 'aniversario',
    desculpas: 'desculpas',
    namoro: 'namoro'
  }

  return map[tone] || 'romantico'
}

export function gerarMensagem({ tone, toName, fromName, memory }) {
  const tema = resolveTone(tone)

  const intro = applyTemplate(random(intros[tema] || intros.romantico), {
    toName,
    fromName,
    memory
  })

  const memoryBlock = memory?.trim()
    ? applyTemplate(random(memories), { toName, fromName, memory })
    : ''

  const transition = applyTemplate(random(transitions[tema] || transitions.romantico), {
    toName,
    fromName,
    memory
  })

  const feeling = applyTemplate(random(feelings[tema] || feelings.romantico), {
    toName,
    fromName,
    memory
  })

  const closing = applyTemplate(random(closings[tema] || closings.romantico), {
    toName,
    fromName,
    memory
  })

  return [
    intro,
    memoryBlock,
    transition,
    feeling,
    closing
  ]
    .filter(Boolean)
    .join('\n\n')
}
