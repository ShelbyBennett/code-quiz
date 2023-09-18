//variables

const startBtn= document.getElementById('start-btn')
const startContainer=document.getElementById('start-container')
const quizContainer=document.querySelector(".quiz-container")
const questionEl= document.querySelector("#question")
const btnGrid= document.getElementById("answer-buttons")
const btn1=document.getElementById("btn1")
const btn2=document.getElementById("btn2")
const btn3=document.getElementById("btn3")
const btn4=document.getElementById("btn4")
const timeContainer= document.querySelector(".time-container ")
const timeEl= document.getElementById("time")
const initialsContainer= document.querySelector(".initials-container")
const userInput= document.getElementById("user-input")
const submitBtn=document.getElementById("submit")
const scoreList=document.getElementById("score-list")

let index=0
let score=0
let timeInterval;
let timer=60;
let highScores=[]


function startQuiz(){
    if(index === questions.length){
        endQuiz()
    }
    quizContainer.classList.replace("hide", "show")
    questionEl.textContent=questions[index].question
    btn1.textContent=questions[index].answer1
    btn2.textContent=questions[index].answer2
    btn3.textContent=questions[index].answer3
    btn4.textContent=questions[index].answer4
}

function startTimer(){
    timeInterval= setInterval(function(){
        timer--
        timeContainer.classList.replace("hide", "show")
        timeEl.textContent=timer

        if(time == 0){
            endQuiz()
        }
    },1000)
}

function checkAnswer(answer){
    console.log(answer);
    if(answer === questions[index].correct){
        index++
        score+=5
        startQuiz()
    }
    else{
        index++
        startQuiz()
        timer-=5

    }
}

function endQuiz(){
    clearInterval(timeInterval)
    quizContainer.style.display="none"
    initialsContainer.classList.replace("hide", "show")
    displayScores()
}

function displayScores(){
highScores= JSON.parse(localStorage.getItem("highScores")) || []

for (let i = 0; i < highScores.length; i++) {
    const li= document.createElement("li")
    li.textContent=`Initials: ${highScores[i].initials}  Score: ${highScores[i].score}`
    scoreList.append(li)
}
}

startBtn.addEventListener("click", ()=>{
    startContainer.classList.add("hide")
    startTimer()
    startQuiz()
})

btnGrid.addEventListener("click", ()=>{
    const userChoice= this.event.target.textContent
   
    checkAnswer(userChoice)
    if(selected == correct)
    console.log("Correct!")
    setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, 1000);
})

submitBtn.addEventListener("click", ()=>{
    const userInitials=userInput.value
    highScores= JSON.parse(localStorage.getItem("highScores")) || []
console.log(userInitials)
    if(userInitials !== ""){
        const user={
            initials: userInitials,
            score: score
        }
        console.log(user);

        highScores.push(user)
        console.log(highScores);
        localStorage.setItem("highScores", JSON.stringify(highScores))
    }
})