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




