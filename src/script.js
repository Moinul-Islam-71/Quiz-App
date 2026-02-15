// ----================= DOM Elements =================----

// --- Screen Elements ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// --- Control Buttons ---
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// --- Quiz Display Elements ---
const questionText = document.getElementById('question-text');
const currentQuestionNum = document.getElementById('current-question');
const totalQuestionsNum = document.getElementById('total-questions');
const scoreDisplay = document.getElementById('score');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress');
const finalScore = document.getElementById(`final-score`)



// ----================= Question Array =================----

const quizQuestions = [

  {
    question: "What is the output of 'console.log(0.1 + 0.2 === 0.3)'?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question: "Which of the following is used to create a shallow copy of an array?",
    answers: [
      { text: "concat()", correct: false },
      { text: "Array.from()", correct: false },
      { text: "[...array]", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "What does the 'bind' method do?",
    answers: [
      { text: "Immediately calls the function", correct: false },
      { text: "Returns a new function with a specific 'this' context", correct: true },
      { text: "Deletes a function", correct: false },
      { text: "Connects two different arrays", correct: false },
    ],
  },
  {
    question: "What is an 'IIFE'?",
    answers: [
      { text: "Internal Inline Function Element", correct: false },
      { text: "Immediately Invoked Function Expression", correct: true },
      { text: "Instant Internal Function Execution", correct: false },
      { text: "It is not a JS term", correct: false },
    ],
  },
  {
    question: "How can you handle asynchronous code in JS?",
    answers: [
      { text: "Callbacks", correct: false },
      { text: "Promises", correct: false },
      { text: "Async/Await", correct: false },
      { text: "All of the above", correct: true },
    ],
  }

];


let score = 0;
let currentQuestionIndex = 0;
let answerDisabled = false;

function startQuiz() {
  // reset vars
  score = 0;
  currentQuestionIndex = 0;
  answerDisabled = false;

  startScreen.classList.add(`inactive`);
  quizScreen.classList.remove(`inactive`);

  showQuestions();
}

function restartQuiz() {
  // reset vars
  score = 0;
  currentQuestionIndex = 0;
  answerDisabled = false;

  scoreDisplay.textContent = score;

  resultScreen.classList.add(`inactive`);
  quizScreen.classList.remove(`inactive`);

  showQuestions();
}

function showQuestions() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionNum.textContent = currentQuestionIndex + 1;
  totalQuestionsNum.textContent = quizQuestions.length;

  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  answersContainer.innerHTML = ``;

  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement(`button`)
    btn.textContent = answer.text;
    btn.dataset.correct = answer.correct;
    btn.classList.add(`answer-btn`);

    btn.addEventListener(`click`, () => selectAnswer(btn, answer))

    answersContainer.appendChild(btn);
    answersContainer.style.marginTop = `2rem`
  });

}

function selectAnswer(selectedBtn, answer) {
  if (answerDisabled) return
  answerDisabled = true;

  const isCorrect = answer.correct;

  if (isCorrect) {
    score++;
    scoreDisplay.textContent = score;
    selectedBtn.classList.add(`correct`);
  }

  else {
    selectedBtn.classList.add(`incorrect`);

    Array.from(answersContainer.children).forEach(correctBtn => {
      if (correctBtn.dataset.correct === `true`) {
        correctBtn.classList.add(`correct`)
      }
    })
  }

  setTimeout(showNext, 1000);
}

function showNext() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    answerDisabled = false;
    showQuestions();
  }

  else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add(`inactive`);
  resultScreen.classList.remove(`inactive`);

  finalScore.textContent = score;
  const resultInPercent = (finalScore / totalQuestionsNum) * 100;

  if (percentage === 100) resultMessage.textContent = `Perfect! You're a genius`;
  else if (percentage >= 80) resultMessage.textContent = `Great job! You know your stuff!`;
  else if (percentage >= 60) resultMessage.textContent = `Good effort! keep learning!`;
  else if (percentage >= 40) resultMessage.textContent = `Not bad! Try again to improve!`;
  else resultMessage.textContent = `Keep studying! You'll get better!`;

}

// event listener for startBtn and restartBtn
startBtn.addEventListener(`click`, startQuiz);
restartBtn.addEventListener(`click`, restartQuiz);