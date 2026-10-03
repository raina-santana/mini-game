// Em "answers", a PRIMEIRA opção é sempre a correta.
// O código embaralha as opções a cada pergunta.
const quiz = [
  {
    story: "📱 Você está assistindo vídeos no celular quando chega uma mensagem misteriosa...",
    question: "🎁 'CLIQUE AQUI E GANHE UM PRÊMIO AGORA!' O que você faz?",
    answers: ["🙋 Ignoro e aviso um adulto", "🏃 Clico rápido!", "📤 Compartilho com todo mundo"],
    success: "💥 Boa! Você escapou de um golpe!",
    error: "🕸️ Cuidado! Era uma armadilha digital!",
    explanation: "Muitos prêmios na internet são falsos."
  },
  {
    story: "💸 Você compra um milkshake de chocolate e vai pagar pelo celular...",
    question: "Antes de enviar um Pix, o que você faz?",
    answers: ["🧐 Confiro o nome de quem vai receber", "😅 Vejo depois de enviar", "⚡ Pago rápido, sem olhar"],
    success: "🎯 Perfeito! Você evitou um golpe!",
    error: "💥 Ops! O dinheiro poderia ir para a pessoa errada!",
    explanation: "Sempre confira o nome antes de pagar."
  },
  {
    story: "🔐 Um código chegou de repente no seu celular...",
    question: "Alguém pede esse código. O que fazer?",
    answers: ["🚫 Não envio para ninguém", "📩 Envio, a pessoa parece legal", "🤷 Peço outro código"],
    success: "🛡️ Excelente! Código é segredo!",
    error: "⚠️ Nunca compartilhe códigos!",
    explanation: "Esse código protege a sua conta."
  },
  {
    story: "👤 Você recebe um pedido de amizade de alguém que não conhece...",
    question: "O que você faz?",
    answers: ["🚫 Ignoro e aviso um adulto", "😁 Aceito, quanto mais amigos melhor", "💬 Converso só um pouquinho"],
    success: "🕵️ Boa decisão! Você evitou perigo!",
    error: "⚠️ Nem todo mundo é confiável na internet!",
    explanation: "Desconhecidos podem fingir ser outra pessoa."
  },
  {
    story: "📲 Um aplicativo quer acessar a sua conta...",
    question: "O que você faz?",
    answers: ["✔️ Confiro se o app é confiável antes", "🎨 Dou acesso se o app for bonito", "📝 Passo meus dados para ganhar um brinde"],
    success: "🔐 Muito bem! Segurança em primeiro lugar!",
    error: "💥 Cuidado! Pode ser um app perigoso!",
    explanation: "Nem todo app é confiável. Pergunte a um adulto."
  },
  {
    story: "🎮 De repente, um site pede para você baixar um jogo grátis incrível...",
    question: "O que você faz?",
    answers: ["🚫 Ignoro e só baixo em lojas oficiais", "⬇️ Baixo, é grátis!", "👀 Baixo só para testar"],
    success: "🛡️ Boa! Você evitou um vírus!",
    error: "💻 Pode ser um vírus disfarçado!",
    explanation: "Sites desconhecidos podem ser perigosos."
  },
  {
    story: "🔗 Um link estranho chega no WhatsApp...",
    question: "Qual é a melhor atitude?",
    answers: ["🗑️ Apago sem clicar", "👉 Clico para ver o que é", "🤔 Compartilho com os amigos"],
    success: "🎯 Boa! Você pensou antes de agir!",
    error: "⚠️ Clicar sem saber é perigoso!",
    explanation: "Na dúvida, não clique."
  },
  {
    story: "⚠️ Você recebe uma mensagem urgente...",
    question: "'SUA CONTA SERÁ BLOQUEADA AGORA!' 😨",
    answers: ["🧐 Desconfio e confirmo com um adulto", "😱 Entro em pânico", "⚡ Clico rápido para resolver"],
    success: "🧠 Excelente! Você pensou com calma!",
    error: "💥 Golpistas usam o medo para enganar!",
    explanation: "Mensagens com pressa costumam ser falsas."
  },
  {
    story: "🔑 Você precisa criar uma senha nova...",
    question: "Qual é a melhor opção?",
    answers: ["X9!kL#82p 🔐", "meunome 🤭", "123456 😅"],
    success: "🔒 Perfeito! Senha forte!",
    error: "⚠️ Senha fácil é perigosa!",
    explanation: "Misture letras, números e símbolos. Assim ela fica difícil de descobrir."
  },
  {
    story: "🆘 Algo estranho aconteceu no seu celular...",
    question: "O que você faz?",
    answers: ["🙋 Peço ajuda a um adulto", "🤫 Escondo", "💪 Resolvo sozinho"],
    success: "❤️ Boa! Pedir ajuda é sempre certo!",
    error: "⚠️ Pedir ajuda é a melhor escolha!",
    explanation: "Adultos podem ajudar em situações difíceis."
  }
];

const ranks = [
  { min: 9, emoji: "🏆", title: "Detetive Mestre", text: "Nenhum golpista engana você!" },
  { min: 6, emoji: "🥈", title: "Detetive Esperto", text: "Você está quase lá. Revise os casos que errou!" },
  { min: 0, emoji: "🔍", title: "Detetive Aprendiz", text: "Todo grande detetive começou assim. Tente de novo!" }
];

let current = 0;
let score = 0;

const $ = (id) => document.getElementById(id);

function show(id, visible) {
  $(id).hidden = !visible;
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  current = 0;
  score = 0;
  show("start-screen", false);
  show("result", false);
  show("quiz-box", true);
  loadQuestion();
}

function loadQuestion() {
  const q = quiz[current];
  $("case-counter").textContent = `Caso ${current + 1} de ${quiz.length}`;
  $("story").textContent = q.story;
  $("question").textContent = q.question;

  const feedback = $("feedback");
  feedback.textContent = "";
  feedback.className = "";
  show("next-btn", false);

  const options = shuffle(q.answers.map((text, i) => ({ text, correct: i === 0 })));
  const answersDiv = $("answers");
  answersDiv.innerHTML = "";

  options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.correct = option.correct;

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index); // A, B, C
    letter.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.textContent = option.text;

    btn.append(letter, label);
    btn.addEventListener("click", () => selectAnswer(btn));
    answersDiv.appendChild(btn);
  });

  updateProgress(current);
  $("question").focus({ preventScroll: true });
}

function selectAnswer(chosen) {
  const q = quiz[current];
  const buttons = document.querySelectorAll("#answers button");
  const isCorrect = chosen.dataset.correct === "true";
  const feedback = $("feedback");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") btn.classList.add("correct");
  });

  if (isCorrect) {
    score++;
    feedback.textContent = `${q.success} ✅ ${q.explanation}`;
    feedback.className = "ok";
  } else {
    chosen.classList.add("wrong");
    feedback.textContent = `${q.error} ❌ ${q.explanation}`;
    feedback.className = "bad";
  }

  updateProgress(current + 1);

  const isLast = current === quiz.length - 1;
  $("next-btn").textContent = isLast ? "Ver resultado 🏆" : "Próximo caso ➡️";
  show("next-btn", true);
  $("next-btn").focus({ preventScroll: true });
}

function nextQuestion() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const rank = ranks.find((r) => score >= r.min);
  show("quiz-box", false);
  show("result", true);
  $("result-emoji").textContent = rank.emoji;
  $("result-title").textContent = rank.title;
  $("result-score").textContent = `Você resolveu ${score} de ${quiz.length} casos!`;
  $("result-text").textContent = rank.text;
  $("restart-btn").focus();
}

function updateProgress(done) {
  const percent = Math.round((done / quiz.length) * 100);
  $("progress-bar").style.width = percent + "%";
  $("progress-container").setAttribute("aria-valuenow", percent);
}

$("start-btn").addEventListener("click", startQuiz);
$("next-btn").addEventListener("click", nextQuestion);
$("restart-btn").addEventListener("click", startQuiz);