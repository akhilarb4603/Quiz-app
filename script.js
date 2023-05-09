const questions=[
    {
        question:"One light year is approximately equal to",
        answers:[
            {text:"9.4 billion km",correct:false},
            {text:"9.4 million km",correct:false},
            {text:"9.4 trillion km",correct:true},
            {text:"94 trillion km",correct:false},
        ]
    },
    {
        question:"The location of sun on the first day of spring is called",
        answers:[
            {text:"Zenith",correct:false},
            {text:"Vernal equinox",correct:true},
            {text:"Horizon",correct:false},
            {text:"Equator",correct:false},
        ]
    },
    {
        question:"A cloud of stars set at 1 million light years distance is called",
        answers:[
            {text:"Comet",correct:false},
            {text:"Debris",correct:false},
            {text:"Andromeda Galaxy",correct:true},
            {text:"Local Group",correct:false},
        ]
    },
    {
        question:"Which of the following planets has a lesser rotation time than the Earth?",
        answers:[
            {text:"Jupiter",correct:true},
            {text:"Mars",correct:false},
            {text:"Mercury",correct:false},
            {text:"Venus",correct:false},
        ]
    },
    {
        question:"The name of the galaxy in which the Earth is a planet is",
        answers:[
            {text:"Andromeda",correct:false},
            {text:"Ursa Major",correct:false},
            {text:"Ursa Minor",correct:false},
            {text:"Milky Way",correct:true},
        ]
    },
    {
        question:"A star of which colour can be said to be the coolest?",
        answers:[
            {text:"Yellow",correct:false},
            {text:"Blue",correct:false},
            {text:"Red",correct:true},
            {text:"Black",correct:false},
        ]
    },
    {
        question:"In order to know the time, the astronauts orbiting in an earth satellite should use:",
        answers:[
            {text:"A watch having mainspring to keep it going",correct:true},
            {text:"A pendulum clock",correct:false},
            {text:"Either a pendulum clock or a watch",correct:false},
            {text:"An alarm clock",correct:false},
        ]
    },
    {
        question:"The Black Hole is:",
        answers:[
            {text:"A dark hollow cavity",correct:false},
            {text:"A massive collapsing star",correct:true},
            {text:"The other side of the moon",correct:false},
            {text:"The other side of the sun",correct:false},
        ]
    },
    {
        question:"Which planet has the solar system's highest mountain Olympus Mons?",
        answers:[
            {text:"Jupiter",correct:false},
            {text:"Uranus",correct:false},
            {text:"Venus",correct:false},
            {text:"Mars",correct:true},
        ]
    },
    {
        question:"Which planet looks reddish in the night sky?",
        answers:[
            {text:"Jupiter",correct:false},
            {text:"Saturn",correct:false},
            {text:"Mars",correct:true},
            {text:"Mercury",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();