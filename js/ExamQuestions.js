
var Exames= JSON.parse(localStorage.Exams);
var examindex=localStorage.getItem("index")
Number.parseInt(examindex)
var myexam=Exames[examindex];
console.log(myexam)
const adminExam = "adminExam"; // the name of the exam specified to admin
const examName = myexam;
console.log(myexam)





console.log(examName.Examquestions[0].header)
var arrQuestions = [];
var arrAnswers = [];
var arrCorrectAnswer = [];
var arrSelectedAnswer = Array(examName.Examquestions.length).fill(null);
var arrFlagStatus = Array(examName.Examquestions.length).fill(false);

for (let i = 0; i < examName.Examquestions.length; i++) {
  arrQuestions[i] = examName.Examquestions[i].header;
}
for (let i = 0; i < examName.Examquestions.length; i++) {
  arrAnswers[i] = examName.Examquestions[i].answers;
}
for (let i = 0; i < examName.Examquestions.length; i++) {
  arrCorrectAnswer[i] = examName.Examquestions[i].correctAnswer;
 
}
console.log(examName)
console.log(examName.Examquestions[0].correctAnswer)
let question = document.querySelector(`#question`);
let answers = document.querySelector(`#answers`);
let flagIconContainer = document.querySelector(`#flag-iconContainer`);
const flagsParent = document.querySelector(`.flagsParent`);
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let btnSubmit = document.getElementById("btnSubmit");

var currentQuestionIndex = 0;

btnPrev.addEventListener("click", function () {
  let selectedAnswer = getSelectedAnswer(currentQuestionIndex);
  arrSelectedAnswer[currentQuestionIndex] = selectedAnswer;

  currentQuestionIndex--;
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = 0; // Do not wrap to last question
  }
  renderCurrentQuestion(currentQuestionIndex);
  drawAnswersOfCurrentQuestion(currentQuestionIndex);
  highlightFlagButton(currentQuestionIndex);
  toggleNavigationButtons();
});

btnNext.addEventListener("click", function () {
  let selectedAnswer = getSelectedAnswer(currentQuestionIndex);
  if (selectedAnswer != null) {
    arrSelectedAnswer[currentQuestionIndex] = selectedAnswer;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= arrQuestions.length) {
    currentQuestionIndex = arrQuestions.length - 1; // Stay on the last question
  }

  renderCurrentQuestion(currentQuestionIndex);
  drawAnswersOfCurrentQuestion(currentQuestionIndex);
  highlightFlagButton(currentQuestionIndex);
  toggleNavigationButtons();
});

btnSubmit.addEventListener("click", function () {
  const myModal = new bootstrap.Modal(
    document.getElementById("confirmationModal")
  );
  myModal.show();
});

document.getElementById("confirmSubmit").addEventListener("click", function (event) {
  calculateFinalGrade();
  const myModal = bootstrap.Modal.getInstance(
    document.getElementById("confirmationModal")
  );
  myModal.hide();
});

function toggleNavigationButtons() {
  btnPrev.style.display = currentQuestionIndex === 0 ? "none" : "block";
  if (currentQuestionIndex === arrQuestions.length - 1) {
    btnNext.style.display = "none";
    btnSubmit.style.display = "block";
  } else {
    btnNext.style.display = "block";
    btnSubmit.style.display = "none";
  }
}

function renderCurrentQuestion(index) {
  let questionText = `<h3>${arrQuestions[index]}</h3>`;
  question.innerHTML = questionText;
  updateFlagButtonHighlight(index);
}

function getAnswerOfCurrentQuestion(index) {
  return arrAnswers[index];
}

function drawAnswersOfCurrentQuestion(index) {
  let result = getAnswerOfCurrentQuestion(index);
  let answersHtml = ``;
  for (let i = 0; i < result.length; i++) {
    const isChecked = arrSelectedAnswer[index] === result[i] ? "checked" : "";
    answersHtml += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="AnswersQuestion${index}" value="${result[i]}" 
          id="question${index}_answer${i}" ${isChecked} onclick="selectAnswer(${index}, '${result[i]}')" />
        <label class="form-check-label" for="question${index}_answer${i}">${result[i]}</label>
      </div>`;
  }
  answers.innerHTML = answersHtml;
  renderFlagIcon(index);
}

function selectAnswer(index, answer) {
  arrSelectedAnswer[index] = answer;
  updateFlagButtonHighlight(index);
}

function renderFlagIcon(index) {
  let flagStatus = arrFlagStatus[index];
  let flagIcon = `
    <i flageStatus="${flagStatus}" id="flagIcon_${index}"
      onclick="flagedCurrentQuestion(${index})"
      title="question flag"
      class="fa-regular fa-font-awesome ${flagStatus ? "text-danger" : ""}">
    </i>`;
  flagIconContainer.innerHTML = flagIcon;
}

function updateFlagButtonHighlight(index) {
  const flagBtn = document.getElementById(`flagBtn_${index}`);
  if (arrSelectedAnswer[index] !== null) {
    flagBtn.classList.add("bg-success");
  } else {
    flagBtn.classList.remove("bg-success");
  }
}

function getSelectedAnswer(index) {
  const radios = document.getElementsByName(`AnswersQuestion${index}`);
  for (const radio of radios) {
    if (radio.checked) {
      return radio.value.trim();
    }
  }
  return null;
}

function flagedCurrentQuestion(index) {
  let questionFlagIcon = document.getElementById(`flagIcon_${index}`);
  let flagBtn = document.getElementById(`flagBtn_${index}`);
  let flagStatus = questionFlagIcon.getAttribute("flageStatus") === "true";

  arrFlagStatus[index] = !flagStatus;

  if (!flagStatus) {
    questionFlagIcon.classList.add(`text-danger`);
    flagBtn.classList.add("bg-danger");
    flagBtn.setAttribute("IsFlaged", "true");
    questionFlagIcon.setAttribute("flageStatus", "true");
  } else {
    questionFlagIcon.classList.remove(`text-danger`);
    flagBtn.classList.remove("bg-danger");
    flagBtn.setAttribute("IsFlaged", "false");
    questionFlagIcon.setAttribute("flageStatus", "false");
  }
}

function goToQuestion(index) {
  renderCurrentQuestion(index);
  drawAnswersOfCurrentQuestion(index);
  highlightFlagButton(index);
  currentQuestionIndex = index;
  toggleNavigationButtons();
}

let flagBtns = "";
for (let i = 0; i < arrQuestions.length; i++) {
  flagBtns += `<div IsFlaged="false" id="flagBtn_${i}" onclick="goToQuestion(${i})"
             class="m-1 p-2 border w-25 text-center col-m-8 rounded-4 border-black">
              <h6>
            <span class="d-none"><i class="fa-regular fa-flag"></i></span>
              question (${i + 1})
            </h6>
          </div>`;
}
flagsParent.innerHTML = flagBtns;

function highlightFlagButton(index) {
  const flagBtns = document.querySelectorAll(`.flagsParent div`);
  flagBtns.forEach((btn, i) => {
    if (i === index) {
      btn.style.backgroundColor = "#1C59A1";
      btn.style.color = "#f8f9fa";
     // btn.classList.add("bg-body-secondary");
    } else {
      btn.style.backgroundColor = "";
      btn.style.color = "";
     // btn.classList.remove("bg-body-secondary");
    }
  });

  const selectedAnswer = arrSelectedAnswer[index];
  if (selectedAnswer !== null) {
    document.getElementById(`flagBtn_${index}`).style.backgroundColor =
      "tomato";
  }
}

window.onload = startExam;

function startExam() {
  renderCurrentQuestion(currentQuestionIndex);
  drawAnswersOfCurrentQuestion(currentQuestionIndex);
  highlightFlagButton(currentQuestionIndex);
  toggleNavigationButtons();
}

function calculateFinalGrade() {
  let score = 0;
  for (let i = 0; i < arrSelectedAnswer.length; i++) {
    console.log(arrSelectedAnswer[i])
    if (arrSelectedAnswer[i] ===arrCorrectAnswer[i]) {
      score++;
      
    }
  }
  const grade = (score / arrSelectedAnswer.length) * 100;
  alert(`Your final grade is ${grade}%`);
}
