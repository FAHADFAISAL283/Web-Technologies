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

  function validateLoginForm(){
    var email = document.getElementById("exampleInputName").value;
    var password = document.getElementById("exampleInputpass").value;

    if (email.trim() === "" || password.trim() === "") {
        alert("Please enter both email and password");
        return false;
    }
    return true;
  }

function validateSignUpForm(){
    var email = document.getElementById("exampleInputName").value;
    var password = document.getElementById("exampleInputpass").value;
    var confirmPassword = document.getElementById("exampleInputpass1").value;

    if (email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        alert("Please fill out all fields");
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
  var shopBySport = document.getElementById("shop-by-sport");
  var sportsList = document.getElementById("sports-list");

  shopBySport.addEventListener("click", function(event) {
      event.preventDefault(); 
      if (sportsList.style.display === "none") {
          sportsList.style.display = "block";
      } else {
          sportsList.style.display = "none";
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var shopBySportswear = document.getElementById("shop-by-sportswear");
  var sportswearList = document.getElementById("sportswear-list");

  shopBySportswear.addEventListener("click", function(event) {
      event.preventDefault(); 
      if (sportswearList.style.display === "none") {
          sportswearList.style.display = "block";
      } else {
          sportswearList.style.display = "none";
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var shopByAccessories = document.getElementById("shop-by-accessories");
  var accessoriesList = document.getElementById("accessories-list");

  shopByAccessories.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default link behavior
      if (accessoriesList.style.display === "none") {
          accessoriesList.style.display = "block";
      } else {
          accessoriesList.style.display = "none";
      }
  });
});

