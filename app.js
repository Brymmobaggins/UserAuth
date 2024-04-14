
let form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    createAccount()
})

let usernameInput = document.querySelector('#name')
let emailInput = document.querySelector('#name')
let passwordInput = document.querySelector('#name')


// function createAccount(){

// }

function createAccount() {
    let username = usernameInput.value
    let password = passwordInput.value

    if (localStorage.getItem(username)) {
        alert("username is already taken")
    } else {
        // save username and password to local storage
        localStorage.setItem(username, password)

        // Hide form, show success message
        document.getElementById("#signup-form").style.display = "none"
        document.getElementById("#successMessage").style.display = "block"
    }

}


