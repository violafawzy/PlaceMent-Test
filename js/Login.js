var log_Email=document.getElementById("inputEmail")
var log_Password=document.getElementById("inputPassword");
var Login=document.getElementById("Login");
var f=0;
var signedUsers=JSON.parse(localStorage.users);
var signedAdmins=JSON.parse(localStorage.admins);

Login.addEventListener("click",function(e){
    e.preventDefault();
    if(log_Email.value=="" ||log_Password.value=="" )
        {
            alert("please fill data")
        }
        else{
            
            for(var i=0;i<signedUsers.length;i++)
            {
                
              if(log_Email.value==signedUsers[i].Email && log_Password.value==signedUsers[i].Password)
               {
                window.location.replace("StudentInterface.html")
                f=1;
            }
        }
       
       for(var i=0;i<signedAdmins.length;i++)
            {
                 if(log_Email.value==signedAdmins[i].Email && log_Password.value==signedAdmins[i].Password)
                {
                  localStorage.setItem('admin_id',JSON.stringify(signedAdmins[i].Email))
                   window.location.replace("AdminInterface.html")
                   f=1;
                }
            }
        
                if(f==0)
                {
                    alert("not found")
                
                }
                
            }
        });