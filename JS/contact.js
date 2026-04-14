function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  var isValid = true;

  document.getElementById("name").classList.remove("error-border");
  document.getElementById("email").classList.remove("error-border");
  document.getElementById("message").classList.remove("error-border");

  document.getElementById("name-error").classList.remove("show");
  document.getElementById("email-error").classList.remove("show");
  document.getElementById("message-error").classList.remove("show");

  var resultBox = document.getElementById("form-result");
  resultBox.className = "form-result";
  resultBox.textContent = "";

  if (name === "") {
    document.getElementById("name").classList.add("error-border");
    document.getElementById("name-error").classList.add("show");
    isValid = false;
  }

  if (email === "" || !email.includes("@")) {
    document.getElementById("email").classList.add("error-border");
    document.getElementById("email-error").classList.add("show");
    isValid = false;
  }

  if (message === "") {
    document.getElementById("message").classList.add("error-border");
    document.getElementById("message-error").classList.add("show");
    isValid = false;
  }

  if (isValid) {
    resultBox.textContent = "Message sent successfully! We will get back to you soon.";
    resultBox.className = "form-result success";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }

  // ERROR
  else {
    resultBox.textContent = "Please fix the errors above and try again.";
    resultBox.className = "form-result error-result";
  }

  setTimeout(() => {
    resultBox.textContent = "";
    resultBox.className = "form-result";
  }, 3000);

  return false; 
}
