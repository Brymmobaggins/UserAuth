/** @format */

import { config } from "./config.js";

// Function to check password strength
function checkPasswordStrength(password) {
  const strengthIndicator = document.getElementById("password-strength");

  let strength = "weak";
  let color = "red";

  // Updated password strength logic to use `config.passwordMinLength`
  if (
    password.length >= config.passwordMinLength &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = "strong";
    color = "green";
  } else if (password.length >= config.passwordMinLength) {
    strength = "medium";
    color = "orange";
  }

  strengthIndicator.textContent = `Your password strength is ${strength}`;
  strengthIndicator.style.color = color;
}

// Add event listener for password input
document
  .getElementById("signup-password")
  .addEventListener("input", (event) => {
    checkPasswordStrength(event.target.value);
  });
