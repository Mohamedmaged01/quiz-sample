let countSpan = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitbtn = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsC = document.querySelector(".results");
let rightans = 0;
let currentIndex = 0;
async function getQuestionData() {
  const response = await fetch("questions.json");
  if (!response.ok) {
    throw new Error("error");
  }
  const questions = await response.json();
  let QCount = questions.length;
  createBullets(QCount);
  addData(questions[currentIndex], QCount);
  countdown(3, QCount);
  submitbtn.onclick = () => {
    let rightans = questions[currentIndex].right_answer;
    currentIndex++;
    checkAnswer(rightans, QCount);
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";
    addData(questions[currentIndex], QCount);
    handleBullets();
    clearInterval(countdownInterval);
    countdown(3, QCount);
    showresult(QCount);
  };
}
getQuestionData();
function createBullets(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    const bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "on";
    }
    bulletsContainer.appendChild(bullet);
  }
}
function addData(obj, count) {
  if (currentIndex < count) {
    let questionsTitle = document.createElement("h2");
    let questionsText = document.createTextNode(obj["title"]);
    questionsTitle.appendChild(questionsText);
    quizArea.appendChild(questionsTitle);
    for (let index = 1; index <= 4; index++) {
      let mainDev = document.createElement("div");
      mainDev.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = obj[`answer${index}`];
      radioInput.dataset.answer = obj[`answer${index}`];
      if (index === 1) {
        radioInput.checked = true;
      }
      let Label = document.createElement("label");
      Label.htmlFor = obj[`answer${index}`];
      let LabelText = document.createTextNode(obj[`answer${index}`]);
      Label.appendChild(LabelText);
      mainDev.appendChild(radioInput);
      mainDev.appendChild(Label);
      answersArea.appendChild(mainDev);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightans++;
  }
}
function handleBullets(params) {
  let bulletspans = document.querySelectorAll(".bullets .spans span");
  let arrayofspans = Array.from(bulletspans);
  arrayofspans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showresult(QCount) {
  let result;
  if (currentIndex === QCount) {
    quizArea.remove();
    answersArea.remove();
    submitbtn.remove();
    bullets.remove();
    if (rightans > QCount / 2 && rightans < QCount) {
      result = `<span class = "good" >Good</span>,${rightans} from ${QCount}`;
    } else if (rightans === QCount) {
      result = `<span class = "perfect" >Perfect</span>,${rightans} from ${QCount}`;
    } else {
      result = `<span class = "bad" >Bad</span>,${rightans} from ${QCount}`;
    }
    resultsC.innerHTML = result;
    resultsC.style.padding = "10px";
    resultsC.style.backgroundColor = "white";
    resultsC.style.marginTop = "10px";
  }
}
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
