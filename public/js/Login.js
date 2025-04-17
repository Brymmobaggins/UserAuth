/** @format */

import { messages } from "./config.js";
import { showMessage } from "./utils.js";

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", login);

export function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const checkbox = document.getElementById("remember-me");

  if (!username || !password) {
    console.error();
    return showMessage(messages.error.emptyUsername, "red");
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
    window.location.replace("/home/home.html");
    showMessage("Login successful", "green");
    messages.style.fontSize = "1.2rem";
    messages.style.fontWeight = "bold";

    messages.textContent = "Login successful, redirecting...";
  } else {
    console.log("login failed");
    showMessage("Wrong username or password", "red");
  }

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}
