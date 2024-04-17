
const signupForm = document.querySelector("#signup-form")
signupForm.addEventListener("submit", function (event) {
    event.preventDefault()
    createAccount()
})


function createAccount() {
    let username = document.getElementById("signUpName").value;
    let password = document.getElementById("signUpPassword").value;


    let randomNumber = Math.floor(Math.random() * 100);
    username = generateUserName(username) + randomNumber;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (!username.trim()) {
        alert("name cannot be empty")
        clearInput()
    } else if ((!password.trim())) {
        alert("enter your password")
        clearInput()
    } else if (password.length <= 6) {
        alert("Password should more than 6 characters")
        clearInput()

    } else if (users.includes(username)) {
        alert("User name already exist")
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












