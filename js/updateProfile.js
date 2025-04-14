/** @format */
import { showMessage } from "./app.js";

const profileForm = document.getElementById("profile-form");
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

});

const saveButton = document.querySelector("button");
saveButton.addEventListener("click", updateProfile); // Corrected selector

export function updateProfile() {

  const email = document.getElementById("profile-email").value.trim();
  const password = document.getElementById("profile-password").value.trim();
  const securityQuestion = document
    .getElementById("profile-security-question")
    .value.trim();
  const securityAnswer = document
    .getElementById("profile-security-answer")
    .value.trim();
  const username = document.getElementById("profile-username").value.trim();

  if (!email && !password && !securityQuestion && !securityAnswer) {
    return showMessage("Please provide at least one field to update", "red");
  }

  if (password && password.length < 6) {
    return showMessage("Password must be at least 6 characters long", "red");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    return showMessage("User not found", "red");
  }

  const user = users[userIndex];

  // Update user fields
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = password;
  }
  if (securityQuestion) {
    user.securityQuestion = securityQuestion;
  }
  if (securityAnswer) {
    user.securityAnswer = securityAnswer;
  }

  try {
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Profile updated successfully", "green");
  } catch (error) {
    showMessage("An error occurred while updating the profile", "red");
  }
}
