const quiz = [
  {
    story: "📱 Você está assistindo vídeos no celular quando de repente chega uma mensagem misteriosa...",
    question: "🎁 'CLIQUE AQUI E GANHE UM PRÊMIO AGORA!' O que você faz? 🤯",
    answers: [
      "📤 Compartilho com todo mundo",
      "🏃 Clico rápido!",
      "🤔 Evito clicar e tento descobrir do que se trata"
    ],
    correct: 2,
    success: "💥 Boa! Você escapou de um golpe!",
    error: "🕸️ Cuidado! Era uma armadilha digital!",
    explanation: "Muitos prêmios na internet são falsos."
  },
  {
    story: "💸 Você compra um milkshake de chocolate e vai fazer um pagamento pelo celular...",
    question: "Antes de enviar um Pix, o que você faz?",
    answers: [
      "🧐 Confiro o nome",
      "😅 Vejo depois",
      "⚡ Pago rápido"
    ],
    correct: 0,
    success: "🎯 Perfeito! Você evitou um golpe!",
    error: "💥 Ops! Você poderia enviar para a pessoa errada!",
    explanation: "Sempre confira o nome antes de pagar."
  },
  {
    story: "🔐 Um código chegou de repente no seu celular...",
    question: "Alguém pede esse código. O que fazer?",
    answers: [
      "🚫 Não envio",
      "📩 Envio pra pessoa que pediu",
      "🤷 Peço outro código"
    ],
    correct: 0,
    success: "🛡️ Excelente! Código é segredo!",
    error: "⚠️ Nunca compartilhe códigos!",
    explanation: "Esse código protege sua conta."
  },
  {
    story: "👤 Você recebe pedido de amizade de alguém que não conhece...",
    question: "O que você faz?",
    answers: [
      "😁 Aceito",
      "💬 Converso",
      "🚫 Ignoro ou aviso um adulto"
    ],
    correct: 2,
    success: "🕵️ Boa decisão! Você evitou perigo!",
    error: "⚠️ Nem todo mundo é confiável na internet!",
    explanation: "Desconhecidos podem fingir ser outra pessoa."
  },
  {
    story: "📱 Um aplicativo quer acessar sua conta...",
    question: "O que você faz?",
    answers: [
      "✔️ Verifico se é um aplicativo confiável",
      "🔓 Dou acesso sem verificar nada",
      "❌ Passo todas as informações sem pensar"
    ],
    correct: 0,
    success: "🔐 Muito bem! Segurança em primeiro lugar!",
    error: "💥 Cuidado! Pode ser um app perigoso!",
    explanation: "Nem todo app é confiável."
  },
  {
    story: "🎮 Apareceu de repente um site pedindo pra você baixar um jogo grátis incrível...",
    question: "O que você faz?",
    answers: [
      "⚡ Baixo rápido",
      "🚫 Ignoro",
      "⬇️ Baixo"
    ],
    correct: 1,
    success: "🛡️ Boa! Você evitou vírus!",
    error: "💻 Pode ser um vírus disfarçado!",
    explanation: "Sites desconhecidos podem ser perigosos."
  },
  {
    story: "🔗 Um link estranho chega no WhatsApp...",
    question: "Qual é a melhor atitude?",
    answers: [
      "🤔 Compartilho com todo mundo",
      "👉 Clico pra ver o que é",
      "🗑️ Apago"
    ],
    correct: 2,
    success: "🎯 Boa! Você pensou antes de agir!",
    error: "⚠️ Clicar sem saber é perigoso!",
    explanation: "Sempre confirme antes de clicar."
  },
  {
    story: "⚠️ Você recebe uma mensagem urgente...",
    question: "'SUA CONTA SERÁ BLOQUEADA AGORA!' 😨",
    answers: [
      "🧐 Desconfio",
      "😱 Entro em pânico",
      "⚡ Clico rápido"
    ],
    correct: 0,
    success: "🧠 Excelente! Você pensou com calma!",
    error: "💥 Golpistas usam medo pra enganar!",
    explanation: "Mensagens urgentes podem ser falsas."
  },
  {
    story: "🔑 Você precisa criar uma senha nova...",
    question: "Qual é a melhor opção?",
    answers: [
      "meunome 🤭",
      "X9!kL#82p 🔐",
      "123456 😅"
    ],
    correct: 1,
    success: "🔒 Perfeito! Senha forte!",
    error: "⚠️ Senha fácil é perigosa!",
    explanation: "Senha forte é difícil de descobrir."
  },
  {
    story: "🆘 Algo estranho aconteceu no celular...",
    question: "O que você faz?",
    answers: [
      "🙋 Peço ajuda",
      "🤫 Escondo",
      "💪 Resolvo sozinho"
    ],
    correct: 0,
    success: "❤️ Boa! Pedir ajuda é sempre certo!",
    error: "⚠️ Pedir ajuda é a melhor escolha!",
    explanation: "Adultos podem ajudar em situações difíceis."
  }
];


let current = 0;

function startQuiz() {
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = quiz[current];
  document.getElementById("story").innerText = q.story;
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  document.getElementById("feedback").innerText = "";
  document.getElementById("next-btn").style.display = "none";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(index, btn);
    answersDiv.appendChild(btn);
  });

  updateProgress();
}

function selectAnswer(index, button) {
  const q = quiz[current];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(btn => btn.disabled = true);

  if (index === q.correct) {
    button.classList.add("correct");
    document.getElementById("feedback").innerText =
      q.success + " ✅ " + q.explanation;
  } else {
    button.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    document.getElementById("feedback").innerText =
      q.error + " ❌ " + q.explanation;
  }

  document.getElementById("next-btn").style.display = "inline-block";
}


function nextQuestion() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").innerHTML = `
      <h2>🎉 Parabéns!</h2>
      <p>Agora você é um Detetive da Internet! 🕵️‍♂️</p>
    `;
  }
}

function updateProgress() {
  const progress = ((current) / quiz.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}
