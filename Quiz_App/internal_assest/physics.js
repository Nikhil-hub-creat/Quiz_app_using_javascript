const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "What is the SI unit of force? ",
        choices:["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"],
        answer: "Newton (N)"
    },
    {
        question: "Which of the following is a vector quantity?",
        choices: ["Speed", "Mass", "Acceleration", "Energy"],
        answer: "Acceleration"
    },
    {
        question: "What does Ohm's Law state?",
        choices: ["V = IR", "P = IV", "F = ma", "E = mc^2"],
        answer: "V=IR"
    },
    {
        question: "Q.Which of the following is a fundamental particle in an atom's nucleus?",
        choices: ["Electron", "Proton", "Neutron", "Photon"],
        answer: "Proton"
    },
    {
        question:"Q. What is the formula for kinetic energy?",
        choices:["E = mc^2", "E = mv^2", "E = mgh", "E = 1/2 mv^2"],
        answer:"E = 1/2 mv^2"
    },
    {
        question:"Q.According to the law of conservation of energy, energy cannot be:",
        choices: ["Created", "Destroyed", "Transformed", "Measured"],
        answer: "Destroyed"
    },
    {
        question:"Q. Which color has the highest frequency in the visible light spectrum?",
        choices:["Red", "Green", "Blue", "Yellow"],
        answer:"Blue"
    },
    {
        question:"Q. What is the unit of electrical resistance?",
        choices: ["Ohm (Ω)", "Ampere (A)", "Volt (V)", "Watt (W)"],
        answer:"Ohm (Ω)"
    },
    {
        question:"Q. What is the SI unit of electric charge?",
        choices:["Coulomb (C)", "Ohm (Ω)", "Ampere (A)", "Volt (V)"],
        answer:"Coulomb (C) "
    },
    {
        question:"Q.Which type of wave does not require a medium for propagation?",
        choices:["Sound wave", "Light wave", "Water wave", "Seismic wave"],
        answer:"Light wave"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 60;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score = score+2;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 60;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}
var ite = localStorage.getItem('storedValue');
// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `${ite} Scored ${score} out of ${quiz.length*2}!`;
  
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 60;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    // document.write("Each quetion gives you 2 marks");
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});