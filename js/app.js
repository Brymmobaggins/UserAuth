/** @format */
const message = document.querySelector("#message");




function handleForgotPassword() {
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
  if (newPassword.length < 6) {
    return showMessage("Password must be at least 6 characters long", "red");
  }

  user.password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Password reset successful! You can now log in.", "green");

  // Redirect to login page after a delay
  setTimeout(() => {
    window.location.replace("/login/login.html");
  }, 2000);
}


// function to handle error messages
export function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  message.style.fontSize = "0.875rem";
  message.style.lineHeight = "1.25rem";
  message.style.fontWeight = 500;

  setTimeout(() => {
    message.textContent = ""; // Clear the message
    message.style.color = ""; // Reset the color to default
  }, 5000); // Clear the message after 5 seconds
}
