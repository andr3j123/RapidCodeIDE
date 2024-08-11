document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("passwordRegister");
  const confirmPasswordField = document.getElementById("passwordConfirm");

  function validatePass() {
    if (passwordField.value != confirmPasswordField.value) {
      confirmPasswordField.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPasswordField.setCustomValidity("");
    }
  }

  passwordField.onchange = validatePass;
  confirmPasswordField.onkeyup = validatePass;
});
