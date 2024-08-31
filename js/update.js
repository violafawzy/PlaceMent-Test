var params = new URLSearchParams(window.location.search);
var id = params.get('id');
var Exams = [];
var ValidateMassegeElement = document.querySelector("#validateMessage");


if (localStorage.getItem("Exams") != null) {
  Exams = JSON.parse(localStorage.getItem("Exams"))
}
var updatedExam = Exams[id];

var QuestionElement = document.querySelector("#testForm");
var ElementBox = ``;

function DisplayQuestions() {
  for (let index = 0; index < updatedExam.Examquestions.length; index++) {

    ElementBox +=
      `
           <div class="mb-5 question border-bottom border-black border-3 pb-5">
                      <input type="text" class="form-control rounded-0 border-0 border-bottom" name="q1" value="${updatedExam.Examquestions[index].header}"/>
                      <div class="input-group my-5">
                          <input type="text" class="form-control me-2" value="${updatedExam.Examquestions[index].answers[0]}" id="0">
                          <input type="text" class="form-control me-2" value="${updatedExam.Examquestions[index].answers[1]}"  id="1" >
                          <input type="text" class="form-control me-2" value="${updatedExam.Examquestions[index].answers[2]}"  id="2">
                          <input type="text" class="form-control me-2" value="${updatedExam.Examquestions[index].answers[3]}"  id="3">
                        </div>
                        <label for="RightAnswer" class="ms-1 mb-3">Right Answer</label>
                        <select id="RightAnswer" class="form-select" aria-label="Default select example">
                          <option selected value="0">Answer 1</option>
                          <option value="1">Answer 2</option>
                          <option value="2">Answer 3</option>
                          <option value="3">Answer 4</option>
                        </select>
                  </div>
    `

  }

  ElementBox += `<button type="submit" id="sub"  onclick="Update(event)" class="btn custom-btn rounded-pill px-4">Update</button>`
  QuestionElement.innerHTML = ElementBox;
};
var updatedQuestions = [];
function GetUpdatedExameInput() {
  var QuestionDivs = QuestionElement.querySelectorAll(".question");
  updatedQuestions = []; 

  for (let index = 0; index < QuestionDivs.length; index++) {
    var Answers = QuestionDivs[index].querySelectorAll(".input-group input");
    var CorrectAnswer = QuestionDivs[index].querySelector("#RightAnswer");
    var AnswersValue = [];

    for (let answerIndex = 0; answerIndex < Answers.length; answerIndex++) {
      AnswersValue.push(Answers[answerIndex].value);
    }

    var Question = {
      header: QuestionDivs[index].querySelector("input").value,
      answers: AnswersValue,
      correctAnswer: CorrectAnswer.value
    };

    updatedQuestions.push(Question);
  }

  console.log(updatedQuestions); 
  return updatedQuestions;
}

function Update(event) {
  event.preventDefault();
  var updatedTest = GetUpdatedExameInput();
  var counter = 0;

  for (let index = 0; index < updatedTest.length; index++) {
    if (!IsQuestionValid(updatedTest[index])) {
      counter++;
    }
  }

  if (counter == 0) {
    ValidateMassegeElement.classList.add("d-none");
    updatedExam.Examquestions = updatedQuestions;
    Exams[id] = updatedExam;
    localStorage.setItem("Exams", JSON.stringify(Exams));
    location.replace("AdminInterface.html");
    console.log("valid")
  } else {
    ValidateMassegeElement.classList.remove("d-none");
    console.log("invalid")

  }

  return counter;
}

function IsValid(value) {
  return value !== "";
}

function IsQuestionValid(QuestionsTest) {
  if (IsValid(QuestionsTest.header) && IsValid(QuestionsTest.correctAnswer)) {
    var Counter = CheckAnswersValidation(QuestionsTest.answers);
    return Counter === 0;
  } else {
    return false;
  }
}

function CheckAnswersValidation(AnswersArray) {
  var Counter = 0;
  for (let index = 0; index < AnswersArray.length; index++) {
    if (!IsValid(AnswersArray[index])) {
      Counter++;
    }
  }
  return Counter;
}

document.addEventListener('DOMContentLoaded', (event) => {
  DisplayQuestions();
});













