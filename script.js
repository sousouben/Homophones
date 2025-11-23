const questions = [
  {
    q: "Il ___ acheté un nouveau vélo.",
    choices: ["a", "à"],
    answer: "a",
  },
  {
    q: "Tu veux du café ___ du thé ?",
    choices: ["ou", "où"],
    answer: "ou",
  },
  {
    q: "Mets ton manteau sur ___ chaise.",
    choices: ["la", "là"],
    answer: "la",
  },
  {
    q: "Regarde ___ le chat qui dort !",
    choices: ["la", "là"],
    answer: "là",
  },
  {
    q: "Je vais ___ l’école demain matin.",
    choices: ["a", "à"],
    answer: "à",
  },
  {
    q: "Marie ___ son frère viennent ce soir.",
    choices: ["est", "et"],
    answer: "et",
  },
  {
    q: "C’est la ville ___ je suis né.",
    choices: ["ou", "où"],
    answer: "où",
  },
  {
    q: "Il ___ très intelligent.",
    choices: ["est", "et"],
    answer: "est",
  },
  { q: "Elle a perdu ___ sac.", choices: ["son", "sont"], answer: "son" },
  {
    q: "Les enfants ___ fatigués.",
    choices: ["son", "sont"],
    answer: "sont",
  },
  {
    q: "___ livre appartient à Paul.",
    choices: ["ce", "se"],
    answer: "ce",
  },
  {
    q: "Il ___ lave avant le dîner.",
    choices: ["ce", "se"],
    answer: "se",
  },
  { q: "___ incroyable !", choices: ["c’est", "s’est"], answer: "c’est" },
  {
    q: "Il ___ trompé en comptant.",
    choices: ["c’est", "s’est"],
    answer: "s’est",
  },
  {
    q: "Elle a rangé ___ affaires dans le sac.",
    choices: ["ses", "ces"],
    answer: "ses",
  },
  {
    q: "___ chaussures sont sous le lit.",
    choices: ["ses", "ces"],
    answer: "ses",
  },
  { q: "Pierre ___ fini son devoir.", choices: ["a", "à"], answer: "a" },
  {
    q: "Nous allons ___ Paris la semaine prochaine.",
    choices: ["a", "à"],
    answer: "à",
  },
  {
    q: "Tu préfères les pommes ___ les poires ?",
    choices: ["ou", "où"],
    answer: "ou",
  },
  {
    q: "Voici ___ chien que j’ai adopté.",
    choices: ["ce", "se"],
    answer: "ce",
  },
  { q: "Il ___ venu hier.", choices: ["est", "et"], answer: "est" },
  { q: "Elle ___ très contente.", choices: ["est", "et"], answer: "est" },
  {
    q: "Tu as oublié ___ livre.",
    choices: ["son", "sont"],
    answer: "son",
  },
  {
    q: "Elle s'est rendu ___ où elle avait déjà passé des vacances !",
    choices: ["la", "là"],
    answer: "là",
  },
  { q: "Il a lavé ___ mains.", choices: ["ses", "ces"], answer: "ses" },
  {
    q: "___ incroyable, mais vrai !",
    choices: ["c’est", "s’est"],
    answer: "c’est",
  },
  {
    q: "Il ___ trompé sur le total.",
    choices: ["s’est", "c’est"],
    answer: "s’est",
  },
  { q: "Regarde ___ joli tableau.", choices: ["ce", "se"], answer: "ce" },
  { q: "Elle va ___ la bibliothèque.", choices: ["a", "à"], answer: "à" },
];

let currentQuestion = 0;
let score = 0;
let time = 300;
let timer;
let userAnswers = [];

const questionEl = document.getElementById("question");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    endExercise();
    return;
  }
  const q = questions[currentQuestion];
  questionEl.innerText = q.q;
  choice1.innerText = q.choices[0];
  choice2.innerText = q.choices[1];
}

function checkAnswer(selected) {
  userAnswers.push({
    question: questions[currentQuestion].q,
    selected: selected,
    correct: questions[currentQuestion].answer,
  });

  if (selected === questions[currentQuestion].answer) score++;
  currentQuestion++;
  loadQuestion();
}

choice1.addEventListener("click", () => checkAnswer(choice1.innerText));
choice2.addEventListener("click", () => checkAnswer(choice2.innerText));

function startTimer() {
  timer = setInterval(() => {
    time--;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    timeEl.innerText = `${minutes}:${seconds}`;
    if (time <= 0) {
      clearInterval(timer);
      endExercise();
    }
  }, 1000);
}

function endExercise() {
  clearInterval(timer);
  questionEl.innerText = "Exercice terminé !";
  document.querySelector(".choices").style.display = "none";
  restartBtn.style.display = "inline-block";

  let mistakes = userAnswers.filter((ans) => ans.selected !== ans.correct);

  if (mistakes.length === 0) {
    resultEl.innerHTML = `Bravo ! Toutes vos réponses sont correctes.<br>Score : ${score} / ${questions.length}`;
    return;
  }

  let html = `Score : ${score} / ${questions.length}<br><br>`;
  html += `<strong>Mauvaises réponses :</strong><br>`;
  mistakes.forEach((ans, idx) => {
    html += `<br>${idx + 1}. ${ans.question}<br>`;
    html += `Votre réponse : <span class="wrong">${ans.selected}</span><br>`;
    html += `Bonne réponse : <span class="correct">${ans.correct}</span><br>`;
    html += `Explication : ${getExplanation(ans.correct)}<br>`;
  });

  resultEl.innerHTML = html;
}

function getExplanation(correct) {
  switch (correct) {
    case "a":
      return "C'est le verbe 'avoir'.";
    case "à":
      return "C'est la préposition qui indique un lieu ou une direction.";
    case "ou":
      return "C'est un choix entre deux éléments.";
    case "où":
      return "Indique un lieu ou un moment précis.";
    case "la":
      return "C'est l'article défini féminin.";
    case "là":
      return "C'est un adverbe de lieu.";
    case "est":
      return "C'est le verbe 'être'.";
    case "et":
      return "C'est la conjonction qui relie deux éléments.";
    case "son":
      return "C'est un adjectif possessif.";
    case "sont":
      return "C'est le verbe 'être' au pluriel.";
    case "ce":
      return "C'est un adjectif démonstratif pour désigner quelque chose.";
    case "se":
      return "C'est un pronom réfléchi.";
    case "c’est":
      return "Contraction de 'ce est'.";
    case "s’est":
      return "Pronom réfléchi + verbe être pour une action faite par soi-même.";
    case "ses":
      return "Adjectif possessif pluriel.";
    case "ces":
      return "Adjectif démonstratif pluriel.";
    default:
      return "";
  }
}

function restartExercise() {
  currentQuestion = 0;
  score = 0;
  time = 300;
  userAnswers = [];
  resultEl.innerHTML = "";
  document.querySelector(".choices").style.display = "block";
  restartBtn.style.display = "none";
  loadQuestion();
  startTimer();
}

loadQuestion();
startTimer();
restartBtn.addEventListener("click", restartExercise);
