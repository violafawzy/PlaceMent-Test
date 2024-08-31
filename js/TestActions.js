var params = new URLSearchParams(window.location.search);
var LanguageName = params.get('languageName');
var LanguageNumbder =params.get('questionNumbers');

var testForm = document.querySelector("#testForm div");
var AnswersElement = document.querySelectorAll("#testForm div.question div.input-group input")
var questionEnputElement;
var tempBox=``;
var tests;
var Exams =[];
var admin=JSON.parse( localStorage.getItem("admin_id"))

if(localStorage.getItem("Exams"))
{
  Exams = JSON.parse(localStorage.getItem("Exams"))
}
console.log(Exams)
function createQuestionInput()
{
  for (let index = 0; index <LanguageNumbder; index++) {
    tempBox+=
    `
    
     <div class="mb-5 question border-bottom border-black border-3 pb-5">
                    <input type="text" class="form-control rounded-0 border-0 border-bottom" name="q1" placeholder="Question Header"/>
                    <div class="input-group my-5">
                        <input type="text" class="form-control me-2" placeholder="Answer 1" id="0">
                        <input type="text" class="form-control me-2" placeholder="Answer 2"  id="1" >
                        <input type="text" class="form-control me-2" placeholder="Answer 3"  id="2">
                        <input type="text" class="form-control me-2" placeholder="Answer 4"  id="3">
                      </div>
                      <label for="RightAnswer" class="ms-1 mb-3">Right Answer</label>
                      <select id="RightAnswer" class="form-select" aria-label="Default select example">
                        <option  value="1" >Answer 1</option>
                        <option value="2">Answer 2</option>
                        <option value="3">Answer 3</option>
                        <option value="4">Answer 4</option>
                      </select>
                </div> 
    
    `
    
  }
  testForm.innerHTML = tempBox;

}

createQuestionInput();

var questionInputElement = document.querySelectorAll("#testForm div .question");
var questions =[]



function CreateTest()
{
  
    for (let index = 0; index < questionInputElement.length; index++) {

      var questionHeader = questionInputElement[index].querySelector(`.question>input`)
      var answers = questionInputElement[index].querySelectorAll(".input-group input")
      var correctAnswer = questionInputElement[index].querySelector("#RightAnswer")
       var answersValue = [];
       var selectElement = questionInputElement[index].querySelectorAll("#RightAnswer option")
       for (let index = 0; index < answers.length; index++) {
        if(IsValid(answers[index].value))
        {
          answersValue.push(answers[index].value) 
        }
        else
        {
          console.log(`answer${index} is not valid`)
        }
        
      }
      for (let index = 0; index < selectElement.length; index++) {
        selectElement[index].value =answers[index].value ;
        
      };
  
    var question = {
      header:questionHeader.value,
      answers:answersValue,
      correctAnswer:correctAnswer.value
  }
    console.log(question);
    questions.push(question);
    }

  Exam = {
    Name:LanguageName,
    Examquestions:questions,
    admin_id:admin
  }

  // if(IsValid(Exam.Name))
  // {
  //    for (let index = 0; index < Exam.Examquestions.length; index++) {
  //       if(IsValid(Exam.Examquestions[index]))
  //       {
  //         console.log("valid")
  //       }
      
  //    }
  // }
  // else
  // {

  // }
  
  Exams.push(Exam)

  localStorage.setItem("Exams" ,JSON.stringify(Exams) );


}

// CreateTest();
document.querySelector("#sub").addEventListener('click' , (event)=>
{
  event.preventDefault()
  CreateTest();
  window.open("/AdminInterface.html")
 
   
})



function IsValid(value)
{
  if(value != "")
  {
    return true;
  }else 
  {
    return false;
  }
}




