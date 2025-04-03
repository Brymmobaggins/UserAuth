/** @format */
const message = document.querySelector("#message");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function createAccount() {
  const usernameInput = document.getElementById("signUpName");

  const passwordInput = document.getElementById("signUpPassword");
  const username = usernameInput.value.trim();
  console.log(username);
  const password = passwordInput.value.trim();

  if (!username || !password) {
    return showMessage("Please fill in all fields", "red");
  }

  if (password.length < 6) {
    return showMessage("Password must be at least 6 characters long", "red");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.username === username)) {
    return showMessage("Username already exists", "red");
  }

  const newUser = {
    username: username + Math.floor(Math.random() * 100),
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  usernameInput.value = "";
  passwordInput.value = "";

  document.getElementById("signup-form").style.display = "none";
  document.getElementById("successMessage").style.display = "block";
  document.getElementById("successMessage").innerHTML = `
        <p>
            Hello ${newUser.username}, your username is <span>${newUser.username}</span>.
            Kindly <a href="/login/login.html">log in</a>.
        </p>`;
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    console.log("login failed");
    setTimeout(() => {
      message.textContent = ""; // Clear the message after 5 seconds
      message.style.color = ""; // Reset the color to default
    }, 5000); // Clear the message after 5 seconds
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
    setTimeout(() => {
      message.textContent = "";
      message.style.color = ""; // Reset the color to default
    }, 5000);
  }

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}

function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  message.style.fontSize = "0.85rem";
    message.style.fontWeight = "bold";
}

// function showSpinner() {
//     document.getElementById("spinner").style.display = "block";
// }

// function hideSpinner() {
//     document.getElementById("spinner").style.display = "none";
// }
