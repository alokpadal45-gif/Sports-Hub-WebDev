function validateForm() {
  var nameField = document.getElementById("name");
  var emailField = document.getElementById("email");
  var messageField = document.getElementById("message");

  var name = nameField.value.trim();
  var email = emailField.value.trim();
  var message = messageField.value.trim();

  var resultBox = document.getElementById("form-result");
  var isValid = true;

  [nameField, emailField, messageField].forEach(function(field) {
    field.classList.remove("error-border");
  });

  ["name-error", "email-error", "message-error"].forEach(function(id) {
    document.getElementById(id).classList.remove("show");
  });

  resultBox.className = "form-result";
  resultBox.textContent = "";

  if (name === "") {
    nameField.classList.add("error-border");
    document.getElementById("name-error").classList.add("show");
    isValid = false;
  }

  if (email === "" || email.indexOf("@") === -1) {
    emailField.classList.add("error-border");
    document.getElementById("email-error").classList.add("show");
    isValid = false;
  }

  if (message === "") {
    messageField.classList.add("error-border");
    document.getElementById("message-error").classList.add("show");
    isValid = false;
  }

  if (isValid) {
    resultBox.textContent = "Message sent successfully! We will get back to you soon.";
    resultBox.className = "form-result success";

    nameField.value = "";
    emailField.value = "";
    messageField.value = "";
  } else {
    resultBox.textContent = "Please fix the errors above and try again.";
    resultBox.className = "form-result error-result";
  }

  return isValid; 
}
