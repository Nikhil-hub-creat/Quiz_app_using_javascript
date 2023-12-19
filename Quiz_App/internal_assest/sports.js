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
        question: "Which country hosted the 2016 Summer Olympics? ",
        choices: ["Brazil","china","Russia","Austrelia"],
        answer: "Brazil"
    },
    {
        question: "Who won the FIFA World Cup in 2018?",
        choices: ["Argentina","France","Germany","Brazil"],
        answer: "France"
    },
    {
        question: "In which city were the 2008 Summer Olympics held?",
        choices: ["Bejing","London","Leo De Generio","Sydney"],
        answer: "Bejing"
    },
    {
        question: "Q.Which country is known as the 'Land of the Rising Sun' and hosted the 2020 Summer Olympics in 2021?",
        choices: ["South Korea","Japan","China","Singapore"],
        answer: "Japan"
    },
    {
        question:"Q. Who holds the record for the most Grand Slam singles tennis titles in the men's category as of 2022?",
        choices:["Novak Djokovic", "Rafael Nadal" ,"Roger Federer", "Andy Murray"],
        answer:"Novak Djokovic"
    },
    {
        question:"Q. Which country won the most gold medals in the 2016 Summer Olympics?",
        choices: ["United States","china","Russia","Germany"],
        answer:"United States"
    },
    {
        question:"Q. In which sport would you perform a 'slam dunk'?",
        choices:["Soccer","BAsketball","Goalf","Tennis"],
        answer:"Basketball"
    },
    {
        question:"Q. Who is often referred to as the 'Fastest man of the earth and holds the world record for the 100 meters?",
        choices:["Usain bolt","Carl Lewis"," Justin Gatlin","tyason gay"],
        answer:"Usain bolt"
    },
    {
        question:"Q. Which country won the Women's FIFA World Cup in 2019?",
        choices:["United states","Germany","Swidon","Brazil"],
        answer:"United states"
    },
    {
        question:"Q. What is the traditional Japanese martial art that has its origins in samurai warriors and is now an Olympic sport?",
        choices:["Taekwondo","Karate","Kendo","Judo"],
        answer:"Judo"
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
     if(score < 7)
     {
        scoreCard.textContent = `Ohh Your are fail `;

     }
     else{
        scoreCard.textContent = `${ite} You are Passed the test`;
     }
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