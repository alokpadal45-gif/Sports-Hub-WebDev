document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  let nameError = document.getElementById("name-error");
  let emailError = document.getElementById("email-error");
  let messageError = document.getElementById("message-error");
  let resultBox = document.getElementById("form-result");

  let isValid = true;

  [name, email, message].forEach(input => input.classList.remove("error-border"));
  [nameError, emailError, messageError].forEach(err => err.classList.remove("show"));

  resultBox.textContent = "";
  resultBox.className = "form-result";

  if (name.value.trim() === "") {
    name.classList.add("error-border");
    nameError.classList.add("show");
    isValid = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add("error-border");
    emailError.classList.add("show");
    isValid = false;
  }

  if (message.value.trim() === "") {
    message.classList.add("error-border");
    messageError.classList.add("show");
    isValid = false;
  }

  if (isValid) {
    resultBox.textContent = "✅ Message sent successfully!";
    resultBox.classList.add("success");

    name.value = "";
    email.value = "";
    message.value = "";

    setTimeout(() => {
      resultBox.textContent = "";
      resultBox.className = "form-result";
    }, 4000);

  } else {
    resultBox.textContent = "❌ Please fix the errors above.";
    resultBox.classList.add("error-result");
  }
});
