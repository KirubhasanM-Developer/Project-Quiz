const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the largest planet in the solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which continent is the largest in the world?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Australia", correct: false },
            { text: "Antarctica", correct: false },
            { text: "Africa", correct: false }
        ]
    },
    {
        question: "What is the fastest land animal?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Horse", correct: false },
            { text: "Elephant", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Malta", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    selectedBtn.classList.add("selected");
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score if correct
    } else {
        selectedBtn.classList.add("wrong");
    }

    // Highlight the correct answer
    const correctAnswer = selectedBtn.parentNode.querySelector('[data-correct="true"]');
    correctAnswer.classList.add("correct");

    // Disable hover effect and interaction after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all buttons
        button.classList.add("disabled"); // Disable hover effect
        button.classList.remove("hover"); // Remove hover class
    });
    nextButton.style.display = "block"; // Show the Next button
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();