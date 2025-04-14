/** @format */

import { showMessage } from "./app.js";
import { config } from "./config.js";

const signUpButton = document.getElementById("signup-button");

signUpButton.addEventListener("click", handleSignUp);

export function handleSignUp() {
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

  // Updated password validation to use `config.passwordMinLength`
  if (password.length < config.passwordMinLength) {
    return showMessage(
      "Password must be at least " +
        config.passwordMinLength +
        " characters long",
      "red"
    );
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

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Sign up successful", "green");

  // clear the form fields
  username.value = "";
  password.value = "";

  document.getElementById("signup-form").style.display = "none";
  document.getElementById("successMessage").style.display = "block";
  document.getElementById("successMessage").innerHTML = `
          <p>
              Hello ${newUser.username}, your username is <span>${newUser.username}</span>.
              Kindly <a href="/login/login.html">log in</a>.
          </p>`;
}
