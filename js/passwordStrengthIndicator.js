/** @format */

// Function to check password strength
function checkPasswordStrength(password) {
  const strengthIndicator = document.getElementById("password-strength");
  let strength = "Wea";
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

  strengthIndicator.textContent = `Password strength: ${strength}`;
  strengthIndicator.style.color = color;
}

// Add event listener for password input
document
  .getElementById("signup-password")
  .addEventListener("input", (event) => {
    checkPasswordStrength(event.target.value);
  });
