let contact = document.getElementById("contact")
contact.onclick = openwid;

function openwid(){
    window.open("form.html")
}

function validateForm() {
    var email = document.getElementById("exampleInputEmail1").value;
    var name = document.getElementById("examplename").value;
    var message = document.getElementById("examplemessage").value

    if (email.trim() === '' || name.trim() === '' || message.trim() === '') {
      alert("Please fill in all fields");
      return false;
    }

    return true;
  }

  const login=document.querySelector("#login");
 

  home=document.querySelector(".home");
  form_container=document.querySelector(".form-container");
 form_close=document.querySelector(".form-close");
  login_link=document.querySelector("#login-link");
  Signup_link=document.querySelector("#signup-link");
  ;
  pwShowHide=document.querySelectorAll(".pw");
 
  login.addEventListener("click",()=>home.classList.add("show"));
  
  
 
  form_close.addEventListener("click",()=>home.classList.remove("show"));
 
  Signup_link.addEventListener("click",(e)=>{
   e.preventDefault();
   form_container.classList.add("active");
  })
  login_link.addEventListener("click",(e)=>{
   e.preventDefault();
   form_container.classList.remove("active");
  })




