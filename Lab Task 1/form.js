let contact = document.getElementById("contact")
contact.onclick = openwid;

function openwid(){
    window.open("form.html")
}

function validateForm() {
    var email = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    var message = document.getElementById("examplemessage").value

    if (email.trim() === '' || password.trim() === '' || message.trim() === '') {
      alert("Please fill in all fields");
      return false;
    }

    return true;
  }




