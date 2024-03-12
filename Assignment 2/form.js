let contact = document.getElementById("contact")
contact.onclick = openwid;

function openwid(){
    window.open("form.html")
}

function validateForm() {
  var email = $("#exampleInputEmail1").val();
  var name = $("#examplename").val();
  var message = $("#examplemessage").val();

  if ($.trim(email) === '' || $.trim(name) === '' || $.trim(message) === '') {
    alert("Please fill in all fields");
    return false;
  }

  return true;
}





