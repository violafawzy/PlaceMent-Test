
function onload()
{
   DisplayExams()
    }



    function DisplayExams()
{
   var box=``;
    if(localStorage.getItem("Exams") != null )
        {
            var Exames= JSON.parse(localStorage.getItem("Exams"));
            console.log(Exames)
            for (let index = 0; index < Exames.length; index++) {
            box+=
            `
                 <div class="col-md-3">
                            <div class="card">
                                <div class="card-body text-center">
                                  <input value="${index}" hidden></input>
                                  <h5 class="card-title">${Exames[index].Name} !</h5>
                                  <a href="#" class="btn custom-btn" onclick="openexam(${index})">Take Exam</a>
                                </div>
                              </div>
                        </div> 
        
            `
            }
            document.getElementById("row").innerHTML = box;
        }
}

function openexam(index)
{
    window.location.replace("ExamQuestions.html")
    localStorage.setItem("index",index.toString())
}