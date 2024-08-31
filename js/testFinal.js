var params = new URLSearchParams(window.location.search);
var LanguageName = params.get('languageName');
var LanguageNumber =params.get('questionNumbers');
var QuestionElement =  document.querySelector("#testForm");
var ElementBox = ``;
var ValidateMassegeElement = document.querySelector("#testCreat .container p");
var Exams =[];
var admin=JSON.parse( localStorage.getItem("admin_id"))

if(localStorage.getItem("Exams"))
{
  Exams = JSON.parse(localStorage.getItem("Exams"))
}
console.log(Exams)



function DisplayQuestions()
{
  for (let index = 0; index <LanguageNumber; index++) {

    ElementBox+=
    `
           <div class="mb-5 question border-bottom border-black border-3 pb-5">
                      <input type="text" class="form-control rounded-0 border-0 border-bottom" name="q1" placeholder="Question Header"/>
                      <div class="input-group my-5">
                          <input type="text" class="form-control me-2"  placeholder="Answer 1" id="0">
                          <input type="text" class="form-control me-2" placeholder="Answer 1"  id="1" >
                          <input type="text" class="form-control me-2" placeholder="Answer 1"  id="2">
                          <input type="text" class="form-control me-2" placeholder="Answer 1" id="3">
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
  ElementBox += `<button type="submit" id="sub"  onclick="Create(event)" class="btn custom-btn rounded-pill px-4">Create</button>`
  QuestionElement.innerHTML = ElementBox;
}

DisplayQuestions();

var NewExamQuestion ;
function GetUpdatedExameInput()
{
    NewExamQuestion = new Array();
   var QuestionDivs = QuestionElement.querySelectorAll("#testForm .question")
   for (let index = 0; index < QuestionDivs.length; index++) {
    var Answers = QuestionDivs[index].querySelectorAll(".input-group input");
    var CorrectAnswer = QuestionDivs[index].querySelector("#RightAnswer")
    var AnswersValue = [];
    for (let index = 0; index < Answers.length; index++) {
      AnswersValue.push(Answers[index].value)
    }
    var Question =
    {
      header : QuestionDivs[index].querySelector("input").value,
      answers : AnswersValue,
      correctAnswer : AnswersValue[CorrectAnswer.value]
    };
    var counter = 0

    NewExamQuestion.push(Question)
   }

   return NewExamQuestion ;
}

function Create(ev)
{
    ev.preventDefault();
    test = GetUpdatedExameInput();
    console.log(test)
    var counter = 0
    for (let index = 0; index < test.length; index++) {
        if(!IsQuestionValid(test[index]))
        {
            counter++;
        }
    }

    console.log(counter)
    if(counter == 0)
    {
        ValidateMassegeElement.classList.add("d-none")
        NewExam = {
            Name:LanguageName,
            Examquestions:test,
            admin_id:admin
          }
          Exams.push(NewExam)
          localStorage.setItem("Exams" ,JSON.stringify(Exams) );
        // window.open("/AdminInterface.html")
        location.replace("AdminInterface.html");
        
    }else
    {
        
        // var newUrl = `testFinal.html?languageName=${LanguageName}&questionNumbers=${LanguageNumber}`
        // window.open(newUrl , "_self");
        ValidateMassegeElement.classList.remove("d-none")
    }
    
    console.log(test);

}

function IsValid(value)
{
   if(value == "")
    {
        return false;
    }else
    {
        return true;
    }
}

function IsQuestionValid(QuestionsTest)
{
  
   if(IsValid(QuestionsTest.header) && IsValid(QuestionsTest.correctAnswer))
   {
      var Counter = CheckAnswersValidation(QuestionsTest.answers);
      if(Counter == 0)
      {
        return true;
      }
      else
      {
        return false;
      }
 
   }else
   {
    return false;
   }
}

function CheckAnswersValidation(AnswersArray)
{
    var Counter = 0;
    for (let index = 0; index < AnswersArray.length; index++) {
        
        if(!IsValid(AnswersArray[index]))
        {
            Counter++;
        }
    }

    return Counter;
}