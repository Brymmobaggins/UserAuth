/** @format */

// Function to check password strength
function checkPasswordStrength(password) {
  const strengthIndicator = document.getElementById("password-strength");
  let strength = "weak";
  let color = "red";

  if (password.length >= 6 &&/[A-Z]/.test(password) &&/[0-9]/.test(password)) {
    strength = "strong";
    color = "green";
  } else if (password.length >= 6) {
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
