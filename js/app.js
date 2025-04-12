/** @format */
const message = document.querySelector("#message");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Prefill the username field if "Remember Me" was selected, so it runs when page load
document.addEventListener("DOMContentLoaded", () => {
  const rememberedUsername = localStorage.getItem("rememberUser");
  if (rememberedUsername) {
    document.getElementById("login-username").value =
      JSON.parse(rememberedUsername);
    document.getElementById("remember-me").checked = true; // Check the "Remember Me" box
  }
});

function handleSignUp() {
  const username = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const securityQuestion = document
    .getElementById("security-question")
    .value.trim();
  const securityAnswer = document
    .getElementById("security-answer")
    .value.trim();

  if (
    !username ||
    !password ||
    !email ||
    !securityQuestion ||
    !securityAnswer
  ) {
    return showMessage("Please fill in all fields", "red");
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return showMessage("Please enter a valid email address", "red");
  }

  if (!/^[a-zA-Z0-9._%+-]+$/.test(username)) {
    return showMessage(
      "Username can only contain letters, numbers, and underscores",
      "red"
    );
  }

  if (password.length < 6) {
    return showMessage("Password must be at least 6 characters long", "red");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return showMessage("Username already exists", "red");
  }

  const newUser = {
    username: username + Math.floor(Math.random() * 100),
    password,
    email,
    securityQuestion,
    securityAnswer,
  };

  // clear the form fields
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("security-question").value = "";
  document.getElementById("security-answer").value = "";

  document.getElementById("signup-form").style.display = "none";
  document.getElementById("success-message").innerHTML = `
        <h2 style="color:green; text-align:center">
        Sign up successful
        </h1>
        <h4>
            Hello ${newUser.username}, your username is <span>${newUser.username}</span>.
            Kindly <a href="/login/login.html">log in</a>.
        </h4>`;

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const checkbox = document.getElementById("remember-me");

  if (!username || !password) {
    console.log("login failed");
    return showMessage("Please enter your username and password", "red");
  }

  // Handle "Remember Me" functionality
  if (checkbox.checked) {
    localStorage.setItem("rememberUser", JSON.stringify(username));
  } else {
    localStorage.removeItem("rememberUser"); // Fix typo here
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    document.getElementById("login-form").style.display = "none";
    document.querySelector(".container").style.display = "none";

    // Redirect user to home page
    window.location.replace("/home.html");
    showMessage("Login successful", "green");
    message.style.fontSize = "1.2rem";
    message.style.fontWeight = "bold";

    message.textContent = "Login successful, redirecting...";
  } else {
    console.log("login failed");
    showMessage("Wrong username or password", "red");
  }

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}

function logOut(){
  // Clear the "Remember Me" data
  localStorage.removeItem("rememberUser");

  // Redirect to login page
  window.location.replace("/login/login.html");
}

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
