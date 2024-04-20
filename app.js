const form = document.querySelector('form')
form.addEventListener("submit", function (event) {
    event.preventDefault()
    createAccount()

})

// Create account function  
function createAccount() {
    let username = document.getElementById("signUpName").value.trim();
    let password = document.getElementById("signUpPassword").value.trim();

    // Generate a random number
    let randomNumber = Math.floor(Math.random() * 100);
    username = generateUserName(username) + randomNumber;


    /* This is retrieving the 'users' data from localStorage, parsing it from JSON to a JavaScript object, and assigning it to the users variable.

     If there is no 'users' data in localStorage yet, it will default to an empty array [].
     So this is initializing the users array from localStorage if it exists, or creating a new empty array if not.

     This allows the rest of the code to always work with the users array without having to check if it exists yet*/
    let users = JSON.parse(localStorage.getItem("users")) || [];


    if (username.trim() === "" || password.trim() === "") {
        alert("Please enter your username and password")
    } else if (password.length < 6) {
        alert("password must be at least 6 characters long")

    }// Check if username already exists
    else if (users.find((user) => user.username === username)) {
        alert("username already exists")

    } else {
        users.push({
            username: username,
            password: password,
        })

        // Save the whole credentials object to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Clear input fields
        clearInput()

        // Hide form, show success message

        document.getElementById("signup-form").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("successMessage").innerHTML = `
        <p>
            Hello ${username}, your username is <span>${username}</span>
             kindly<a href="/login/login.html"> log in</a>
        </p>
        `
    }
}
// Generate a username from the first two letters of the username
function generateUserName(username) {
    return username.slice(0, 2).toUpperCase() + "_"
}
// Clear input fields
function clearInput() {
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpPassword').value = '';
}

// Login function
function login() {
    let username = document.getElementById("login-username").value.trim()
    let password = document.getElementById("login-password").value.trim()

    // Check if username and password are empty
    if (username === "" || password === "") {
        alert("Please enter your username and password")
        return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check if username and password match
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    if (user) {
        // Hide login form
        document.getElementById("login-form").style.display = "none";
        document.querySelector(".container").style.display = "none";

        // show spinner, 
        showSpinner()

        // show spinner for 3 seconds, go to welcome home page
        setTimeout(function () {
            hideSpinner()
            window.location.replace("/home.html")
        }, 3000)
    } else {
        alert(" wrong username or password")

    }
    // Clear login form
    document.getElementById("login-username").value = ""
    document.getElementById("login-password").value = ""

}
function showSpinner() {
    document.getElementById("spinner").style.display = "block";
    // document.getElementById("login-form").style.display = "none";
}
function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}








