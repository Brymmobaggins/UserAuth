/** @format */
const message = document.querySelector("#message");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});


function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    console.log("login failed");
    return showMessage("Please enter your username and password", "red");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    document.getElementById("login-form").style.display = "none";
    document.querySelector(".container").style.display = "none";

    // redirect user to home page
    window.location.replace("/home.html");
    showMessage("Login successful", "green");
    message.style.fontSize = "1.2rem";
    message.style.fontWeight = "bold";

    message.textContent = "Login successful, redirecting...";

    // showSpinner();

    // setTimeout(() => {
    //     hideSpinner();
    //     window.location.replace("/home.html");
    // }, 3000);
  } else {
    console.log("login failed");
    showMessage("Wrong username or password", "red");
  }

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}

function handleForgotPassword() {}

// function to handle error messages
export function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  message.style.fontSize = "0.85rem";

  setTimeout(() => {
    message.textContent = ""; // Clear the message
    message.style.color = ""; // Reset the color to default
  }, 5000); // Clear the message after 5 seconds
}
