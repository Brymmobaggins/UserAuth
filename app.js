
function login() {
    let username = document.getElementById("login-username").value
    let password = document.getElementById("login-password").value


    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check if username and password match
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    (user) ? alert("success") : alert(" wrong username or password")

    // Clear login form
    document.getElementById("login-username").value = ""
    document.getElementById("login-password").value = ""

}

function createAccount() {
    let username = document.getElementById("signUpName").value;
    let password = document.getElementById("signUpPassword").value;


    let randomNumber = Math.floor(Math.random() * 100);
    username = generateUserName(username) + randomNumber;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.username === username)) {
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
        document.getElementById("successMessage").innerHTML =
            `<p>
            Hello ${username}, your username is <span style="color:green; font-weight: bold">${username}</span>
            , kindly  <a href="/login/login.html"> log in</a>
        </p>
        `;
    }
}
function generateUserName(username) {
    return username.slice(0, 2).toUpperCase() + "_"
}



function clearInput() {
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpPassword').value = '';
}
function generateUsername(username) {
    return username.toUpperCase()
}












