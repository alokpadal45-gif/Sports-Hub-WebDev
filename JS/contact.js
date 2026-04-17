function validateForm() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const resultBox = document.getElementById("form-result");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  nameInput.classList.remove("error-border");
  emailInput.classList.remove("error-border");
  messageInput.classList.remove("error-border");

  nameError.classList.remove("show");
  emailError.classList.remove("show");
  messageError.classList.remove("show");

  resultBox.className = "form-result";
  resultBox.textContent = "";

  if (name === "") {
    nameInput.classList.add("error-border");
    nameError.classList.add("show");
    isValid = false;
  }

  if (email === "" || !emailPattern.test(email)) {
    emailInput.classList.add("error-border");
    emailError.classList.add("show");
    isValid = false;
  }

  if (message === "") {
    messageInput.classList.add("error-border");
    messageError.classList.add("show");
    isValid = false;
  }

  if (isValid) {
    resultBox.textContent =
      "Message sent successfully! We will get back to you soon.";
    resultBox.className = "form-result success";

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  } else {
    resultBox.textContent =
      "Please fix the errors above and try again.";
    resultBox.className = "form-result error-result";
  }
}