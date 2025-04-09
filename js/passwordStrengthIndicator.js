/** @format */

// Function to check password strength
function checkPasswordStrength(password) {
  const strengthIndicator = document.getElementById("password-strength");
  let strength = "Weak";
  let color = "red";

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = "Strong";
    color = "green";
  } else if (password.length >= 6) {
    strength = "Medium";
    color = "orange";
  }

  strengthIndicator.textContent = `Strength: ${strength}`;
  strengthIndicator.style.color = color;
}

// Add event listener for password input
document
  .getElementById("signup-password")
  .addEventListener("input", (event) => {
    checkPasswordStrength(event.target.value);
  });
