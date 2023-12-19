const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


const quiz = [
    {
        question: "Who is the current President of the United States (as of 2023)?",
        choices:["Joe Biden", "Donald Trump", "Kamala Harris", "Barack Obama"],
        answer: "Joe Biden"
    },
    {
        question: "What is the term length for a member of the United States Senate?",
        choices: ["2 years", "4 years", "6 years", "8 years"],
        answer: "6 years"
    },
    {
        question: "In which country is the Elysee Palace, the official residence of the President?",
        choices: ["United States", "France", "United Kingdom", "Germany"],
        answer: "France"
    },
    {
        question: "What is the main function of the United Nations Security Council? ",
        choices: ["Economic Cooperation", "Human Rights Advocacy", "International Peace and Security", "Environmental Protection"],
        answer: "International Peace and Security"
    },
    {
        question:"Q. Which of the following is an example of a unitary system of government?",
        choices:["United States", "Canada", "France", "Germany"],
        answer:"France"
    },
    {
        question:"Q.What is the role of the Speaker of the House in the United States?",
        choices: ["Head of State", "Head of Government", "Presides over the House of Representatives", "Commander-in-Chief"],
        answer: "Presides over the House of Representatives"
    },
    {
        question:"Q.In a parliamentary system, who is typically the head of government?",
        choices:["President", "Prime Minister", "Monarch", "Speaker of the House"],
        answer:"Prime Minister"
    },
    {
        question:"Q. Which amendment to the United States Constitution guarantees the right to freedom of speech?",
        choices: ["First Amendment", "Second Amendment", "Fourth Amendment", "Fifth Amendment"],
        answer:"First Amendment"
    },
    {
        question:"Q. What is the primary responsibility of the Supreme Court of the United States?",
        choices:["Enforcing Laws", "Making Laws", "Interpreting Laws", "Approving Laws"],
        answer:"Interpreting Laws "
    },
    {
        question:"QWho is often referred to as the 'Iron Lady' and served as the Prime Minister of the United Kingdom from 1979 to 1990?",
        choices:["Angela Merkel", "Theresa May", "Margaret Thatcher", "Indira Gandhi"],
        answer:"Margaret Thatcher"
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