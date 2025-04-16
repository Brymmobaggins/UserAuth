/** @format */

import { messages } from "./config.js";
import { showMessage } from "./utils.js";
// import { messages } from "./config.js";

const signForm = document.getElementById("signup-form");

signForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

const signUpButton = document.getElementById("signup-button");
signUpButton.addEventListener("click", handleSignUp);

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
    return showMessage(messages.error.emptyFields, "red");
  }

  if (!messages.validation.emailRegex.test(email)) {
    return showMessage(
      messages.error.invalidEmail.text,
      messages.error.invalidEmail.color
    );
  }

  if (!messages.validation.usernameRegex.test(username)) {
    return showMessage(
      messages.error.invalidUsername.text,
      messages.error.invalidUsername.color
    );
  }

  if (password.length < messages.validation.passwordMinLength) {
    return showMessage(
      messages.error.shortPassword.text,
      messages.error.shortPassword.color
    );
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(
    (user) => user.username === username || user.email === email
  );

  if (userExists) {
    const message =
      userExists.username === username
        ? messages.signup.usernameExists
        : messages.signup.emailExists;
    return showMessage(message.text, message.color);
  }

  const newUser = {
    username,
    email,
    password,
    securityQuestion,
    securityAnswer,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  showMessage(messages.signup.success.text, messages.signup.success.color);

  // Clear the form fields
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("security-question").value = "";
  document.getElementById("security-answer").value = "";

  // Display success message
  const signupForm = document.getElementById("signup-form");

  if (signupForm) signupForm.style.display = "none";
  if (successMessage) {
    successMessage.style.display = "block";
    successMessage.innerHTML = `
      <p>
        Hello ${newUser.username}, your username is <span>${newUser.username}</span>.
        Kindly <a href="/login/login.html">log in</a>.
      </p>`;
  } else {
    console.error("Success message container not found!");
  }
}
