/** @format */

import { showMessage } from "./app.js";
import rateLimit from "./RateLimit.js";

const rateLimitInstance = new rateLimit();

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", login);

export function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const checkbox = document.getElementById("remember-me");

  if (!username || !password) {
    return showMessage("Please enter your username and password", "red");
  }

  // Check if the user is locked out
  const lockoutStatus = rateLimitInstance.isLockedOut(username);
  if (lockoutStatus.locked) {
    return showMessage(
      `Too many failed attempts. Try again in ${lockoutStatus.remainingTime} seconds.`,
      "red"
    );
  }

  // Handle "Remember Me" functionality
  if (checkbox.checked) {
    localStorage.setItem("rememberUser", JSON.stringify(username));
  } else {
    localStorage.removeItem("rememberUser");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Reset failed attempts on successful login
    rateLimitInstance.resetAttempts(username);

    document.getElementById("login-form").style.display = "none";
    document.querySelector(".container").style.display = "none";

    // Redirect user to home page
    window.location.replace("/home/home.html");
    showMessage("Login successful", "green");
  } else {
    // Track failed login attempt
    rateLimitInstance.trackFailedAttempt(username);

    const userAttempts = JSON.parse(localStorage.getItem("failedAttempts"))[
      username
    ];
    if (userAttempts && userAttempts.count >= rateLimitInstance.maxAttempts) {
      return showMessage(
        "Too many failed attempts. You are locked out for 5 minutes.",
        "red"
      );
    } else {
      return showMessage("Wrong username or password", "red");
    }
  }

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}
