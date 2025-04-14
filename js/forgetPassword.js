/** @format */

import { showMessage } from "./app.js";
import { config } from "./config.js";

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleForgotPassword);

export function handleForgotPassword() {
  const username = document.getElementById("forgot-username").value.trim();
  const securityAnswer = document
    .getElementById("security-answer")
    .value.trim();
  const newPassword = document.getElementById("new-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (!user) {
    return showMessage("User not found", "red");
  }

  const securityQuestionContainer = document.getElementById(
    "security-question-container"
  );
  const newPasswordContainer = document.getElementById(
    "new-password-container"
  );
  const securityQuestionLabel = document.getElementById(
    "security-question-label"
  );

  // Ensure the security question is displayed
  if (!securityQuestionContainer.dataset.displayed) {
    securityQuestionLabel.textContent = user.securityQuestion;
    securityQuestionContainer.style.display = "block"; // Make it visible
    securityQuestionContainer.dataset.displayed = "true"; // Mark as displayed
    return;
  }

  if (
    !newPasswordContainer.style.display ||
    newPasswordContainer.style.display === "none"
  ) {
    // Verify the security answer
    if (securityAnswer !== user.securityAnswer) {
      return showMessage("Incorrect answer to the security question", "red");
    }

    // Show the new password input
    newPasswordContainer.style.display = "block";
    return;
  }

  // Update the password
  if (newPassword.length < config.passwordMinLength) {
    return showMessage(
      "Password must be at least " +
        config.passwordMinLength +
        " characters long",
      "red"
    );
  }

  user.password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Password reset successful! You can now log in.", "green");

  // Redirect to login page after a delay
  setTimeout(() => {
    window.location.replace("/login/login.html");
  }, 2000);
}
