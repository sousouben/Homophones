const questions = [
  {
    q: "Paul ___ acheté une glace.",
    choices: ["a", "à"],
    answer: "a",
  },
  {
    q: "Veux-tu du thé ___ du jus ?",
    choices: ["ou", "où"],
    answer: "ou",
  },
  {
    q: "Pose le livre sur ___ table.",
    choices: ["la", "là"],
    answer: "la",
  },
  {
    q: "Regarde ___ le chien qui court !",
    choices: ["la", "là"],
    answer: "là",
  },
  {
    q: "Nous allons ___ la scéance de cinéma ce soir.",
    choices: ["a", "à"],
    answer: "à",
  },
  {
    q: "Sophie ___ Marc vont au marché.",
    choices: ["est", "et"],
    answer: "et",
  },
  {
    q: "C’est le village ___ j’ai grandi.",
    choices: ["ou", "où"],
    answer: "où",
  },
  {
    q: "Ce chat ___ très curieux.",
    choices: ["est", "et"],
    answer: "est",
  },
  {
    q: "Elle a oublié ___ clés.",
    choices: ["ses", "ces"],
    answer: "ses",
  },
  {
    q: "___ fleurs sont sur la table.",
    choices: ["Ces", "Ses"],
    answer: "Ces",
  },
  {
    q: "___ manteau est à moi.",
    choices: ["Ce", "Se"],
    answer: "Ce",
  },
  {
    q: "Il ___ préparé pour l’examen.",
    choices: ["s’est", "c’est"],
    answer: "s’est",
  },
  {
    q: "___ incroyable comme performance !",
    choices: ["C’est", "S’est"],
    answer: "C’est",
  },
  {
    q: "Elle ___ trompée en répondant à la question.",
    choices: ["s’est", "c’est"],
    answer: "s’est",
  },
  {
    q: "Ils ont rangé ___ jouets.",
    choices: ["son", "sont"],
    answer: "son",
  },
  {
    q: "___ chaussures sont sales.",
    choices: ["Ces", "Ses"],
    answer: "Ses",
  },
  {
    q: "Marc ___ fini son repas.",
    choices: ["a", "à"],
    answer: "a",
  },
  {
    q: "Nous allons ___ la maison maintenant.",
    choices: ["a", "à"],
    answer: "à",
  },
  {
    q: "Tu veux les pommes ___ les oranges ?",
    choices: ["ou", "où"],
    answer: "ou",
  },
  {
    q: "Voici ___ stylo que j’ai trouvé.",
    choices: ["ce", "se"],
    answer: "ce",
  },
  {
    q: "Il ___ arrivé en retard.",
    choices: ["est", "et"],
    answer: "est",
  },
  {
    q: "Elle ___ ravie de la nouvelle.",
    choices: ["est", "et"],
    answer: "est",
  },
  {
    q: "Tu as pris ___ cahier ?",
    choices: ["son", "sont"],
    answer: "son",
  },
  {
    q: "Il s'est rendu ___ où il avait laissé ses affaires.",
    choices: ["la", "là"],
    answer: "là",
  },
  {
    q: "Elle a lavé ___ mains avant le repas.",
    choices: ["ses", "ces"],
    answer: "ses",
  },
  {
    q: "___ étonnant mais vrai !",
    choices: ["C’est", "S’est"],
    answer: "C’est",
  },
  {
    q: "Il ___ trompé dans le calcul.",
    choices: ["s’est", "c’est"],
    answer: "s’est",
  },
  {
    q: "Regarde ___ magnifique tableau !",
    choices: ["ce", "se"],
    answer: "ce",
  },
  {
    q: "Elle va ___ ce parc cet après-midi.",
    choices: ["a", "à"],
    answer: "à",
  },
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
